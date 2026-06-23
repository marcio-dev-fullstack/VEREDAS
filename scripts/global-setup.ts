/*
 * MÁRCIO RODRIGUES DE OLIVEIRA, DEV FULSTACK, (62) 99646-6033
 */

import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";
import { GenericContainer, StartedTestContainer } from "testcontainers";
import * as fs from "fs";
import * as path from "path";
import * as bcrypt from "bcrypt";
import { DataSource, DataSourceOptions } from "typeorm";

export default async () => {
  console.log("\n[GlobalSetup] Starting shared test containers...");

  const [postgresContainer, redisContainer] = await Promise.all([
    new PostgreSqlContainer().start(),
    new GenericContainer("redis:alpine").withExposedPorts(6379).start(),
  ]);

  // Armazena as instâncias dos containers no escopo global para o teardown
  (global as any).__POSTGRES_CONTAINER__ = postgresContainer;
  (global as any).__REDIS_CONTAINER__ = redisContainer;

  // Cria um arquivo de configuração para os testes lerem
  const config = {
    db: { url: postgresContainer.getConnectionUri() },
    redis: {
      url: `redis://${redisContainer.getHost()}:${redisContainer.getMappedPort(6379)}`,
    },
  };

  // --- SEEDING DO BANCO DE DADOS ---
  console.log("[GlobalSetup] Running migrations and seeding database...");

  // Configura a conexão do TypeORM para rodar as migrações
  const dataSource = new DataSource({
    type: "postgres",
    url: config.db.url,
    // Aponta para a localização das suas migrações
    migrations: [path.join(__dirname, "../src/database/migrations/*.ts")],
    migrationsTableName: "migrations_test",
  } as DataSourceOptions);

  try {
    await dataSource.initialize();
    console.log("[GlobalSetup] Running migrations...");
    await dataSource.runMigrations();
    console.log("[GlobalSetup] Migrations completed.");

    // Cria os usuários de teste após as migrações
    console.log("[GlobalSetup] Seeding users...");
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash("kitten", salt);

    await dataSource.query(
      'INSERT INTO "user" (username, password, roles) VALUES ($1, $2, $3), ($4, $5, $6)',
      [
        "jane_admin",
        hashedPassword,
        "{admin}", // Formato de array para PostgreSQL
        "john_user",
        hashedPassword,
        "{user}",
      ],
    );
    console.log("[GlobalSetup] Database seeded successfully.");
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  }

  fs.writeFileSync(
    path.join(__dirname, "test-config.json"),
    JSON.stringify(config),
  );
  console.log("[GlobalSetup] Shared containers are ready.");
};
