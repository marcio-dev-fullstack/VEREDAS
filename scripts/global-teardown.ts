/*
 * MÁRCIO RODRIGUES DE OLIVEIRA, DEV FULSTACK, (62) 99646-6033
 */
import * as fs from "fs";
import * as path from "path";
import { DataSource, DataSourceOptions } from "typeorm";

export default async () => {
  // Verifica se o script deve parar os containers (útil para CI)
  // Para parar os containers, rode: STOP_CONTAINERS=true pnpm test
  if (process.env.STOP_CONTAINERS) {
    console.log("\n[GlobalTeardown] Stopping shared test containers...");
    const {
      StartedPostgreSqlContainer,
    } = require("@testcontainers/postgresql");
    const { StartedTestContainer } = require("testcontainers");
    const postgresContainer: typeof StartedPostgreSqlContainer = (global as any)
      .__POSTGRES_CONTAINER__;
    const redisContainer: typeof StartedTestContainer = (global as any)
      .__REDIS_CONTAINER__;
    await Promise.all([postgresContainer?.stop(), redisContainer?.stop()]);
    console.log("[GlobalTeardown] Shared containers stopped.");
    return;
  }

  console.log("\n[GlobalTeardown] Cleaning database for next run...");
  const configPath = path.join(__dirname, "test-config.json");
  if (!fs.existsSync(configPath)) return;

  const testConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  const dataSource = new DataSource({
    type: "postgres",
    url: testConfig.db.url,
  } as DataSourceOptions);

  try {
    await dataSource.initialize();
    await dataSource.query('TRUNCATE TABLE "user" RESTART IDENTITY CASCADE;');
    // Adicione aqui outras tabelas que precisam ser limpas
    console.log("[GlobalTeardown] Database cleaned.");
  } finally {
    if (dataSource.isInitialized) await dataSource.destroy();
  }
};
