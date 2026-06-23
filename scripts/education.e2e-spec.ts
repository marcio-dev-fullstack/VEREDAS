/*
 * MÁRCIO RODRIGUES DE OLIVEIRA, DEV FULSTACK, (62) 99646-6033
 */
import * as bcrypt from "bcrypt";

import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";
import { DataSource } from "typeorm";
import { User } from "../src/users/entities/user.entity";
import { CreateEscolaDto } from "../src/education/escolas/dto/create-escola.dto";

describe("Education End-to-End Test", () => {
  let app: INestApplication;
  let container: StartedPostgreSqlContainer;
  let dataSource: DataSource;
  let adminAuthToken: string;
  let userAuthToken: string;

  beforeAll(async () => {
    // 1. Inicia o container do banco de dados
    container = await new PostgreSqlContainer().start();

    // 2. Cria o módulo de teste, importando o AppModule principal
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      // Sobrescreve a configuração do TypeORM para usar o banco de teste
      .overrideProvider("TYPEORM_MODULE_OPTIONS")
      .useValue({
        type: "postgres",
        host: container.getHost(),
        port: container.getPort(),
        database: container.getDatabase(),
        username: container.getUsername(),
        password: container.getPassword(),
        autoLoadEntities: true,
        synchronize: true, // Essencial para criar as tabelas no DB de teste
      })
      .compile();

    // 3. Inicia a aplicação NestJS
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe()); // Garante que as validações de DTO rodem
    await app.init();

    // Obtém a fonte de dados para fazer verificações diretas no banco
    dataSource = app.get(DataSource);

    // 4. Realiza o login com os usuários (já criados no globalSetup)
    const [adminLoginResponse, userLoginResponse] = await Promise.all([
      request(app.getHttpServer())
        .post("/auth/login")
        .send({ username: "jane_admin", password: "kitten" }),
      request(app.getHttpServer())
        .post("/auth/login")
        .send({ username: "john_user", password: "kitten" }),
    ]);

    adminAuthToken = adminLoginResponse.body.access_token;
    userAuthToken = userLoginResponse.body.access_token;

    expect(adminAuthToken).toBeDefined();
    expect(userAuthToken).toBeDefined();
  }, 30000); // Aumenta o timeout para dar tempo do container iniciar

  // Limpa as tabelas antes de cada teste
  beforeEach(async () => {
    await dataSource.synchronize(true);
  });

  afterAll(async () => {
    await app.close();
    await container.stop();
  });

  describe("/escolas (POST)", () => {
    it("deve retornar 403 Forbidden para um usuário comum", () => {
      const createEscolaDto: CreateEscolaDto = {
        nome: "Escola E2E Test",
        redeEnsino: "Federal",
        codigoINEP: "99999999",
      };

      return request(app.getHttpServer())
        .post("/escolas")
        .set("Authorization", `Bearer ${userAuthToken}`) // Usa o token do usuário comum
        .send(createEscolaDto)
        .expect(403); // Espera um erro de "Proibido"
    });

    it("deve permitir que um admin crie uma nova escola (201 Created)", async () => {
      const createEscolaDto: CreateEscolaDto = {
        nome: "Escola E2E Test",
        redeEnsino: "Federal",
        codigoINEP: "99999999",
      };

      // Faz a requisição HTTP para a aplicação
      const response = await request(app.getHttpServer())
        .post("/escolas") // Assumindo que o endpoint é /escolas
        .set("Authorization", `Bearer ${adminAuthToken}`) // Usa o token do admin
        .send(createEscolaDto)
        .expect(201); // Verifica o status code

      // Verifica o corpo da resposta
      expect(response.body).toEqual({
        id: expect.any(Number),
        ...createEscolaDto,
      });
    });
  });
});
