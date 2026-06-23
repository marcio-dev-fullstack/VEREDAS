/*
 * MÁRCIO RODRIGUES DE OLIVEIRA, DEV FULSTACK, (62) 99646-6033
 */
import Redis from "ioredis";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EscolasService } from "../src/education/escolas/escolas.service";
import { Escola } from "../src/education/escolas/entities/escola.entity";
import { CreateEscolaDto } from "../src/education/escolas/dto/create-escola.dto";
import * as fs from "fs";
import * as path from "path";

// Define um token para injeção do cliente Redis
export const REDIS_CLIENT = "REDIS_CLIENT";

describe("EscolasService (Integration)", () => {
  let escolasService: EscolasService;
  let escolasRepository: Repository<Escola>;
  let module: TestingModule;
  let redisClient: Redis;

  beforeAll(async () => {
    // Lê a configuração dos containers globais
    const configPath = path.join(
      __dirname,
      "../../test-setup/test-config.json",
    );
    const testConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"));

    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: "postgres",
          url: testConfig.db.url,
          entities: [Escola], // Carrega nossa entidade
          synchronize: true, // Cria o schema do banco automaticamente
        }),
        TypeOrmModule.forFeature([Escola]), // Disponibiliza o repositório de Escola
      ],
      providers: [
        EscolasService,
        {
          provide: REDIS_CLIENT,
          useFactory: () => {
            return new Redis(testConfig.redis.url);
          },
        },
      ],
    }).compile();

    escolasService = module.get<EscolasService>(EscolasService);
    escolasRepository = module.get<Repository<Escola>>(
      getRepositoryToken(Escola),
    );
    redisClient = module.get<Redis>(REDIS_CLIENT);
  });

  // Limpa a tabela antes de cada teste para garantir isolamento
  beforeEach(async () => {
    await escolasRepository.clear();
  });

  // Fecha a conexão com o banco de dados após todos os testes
  afterAll(async () => {
    redisClient?.disconnect();
    await module.close(); // Fecha a conexão do TypeORM
  });

  it("should be defined", () => {
    expect(escolasService).toBeDefined();
    expect(escolasRepository).toBeDefined();
  });

  it("deve ter um cliente Redis conectado", async () => {
    expect(redisClient).toBeDefined();
    await redisClient.set("test-key", "test-value");
    const value = await redisClient.get("test-key");
    expect(value).toBe("test-value");
  });

  describe("create", () => {
    it("deve criar e persistir uma nova escola no banco de dados", async () => {
      const createEscolaDto: CreateEscolaDto = {
        nome: "Escola de Teste Integrado",
        redeEnsino: "Municipal",
        codigoINEP: "87654321",
      };

      const result = await escolasService.create(createEscolaDto);

      // Verifica se o serviço retornou a entidade com um ID
      expect(result).toBeInstanceOf(Escola);
      expect(result.id).toBeDefined();
      expect(result.nome).toEqual(createEscolaDto.nome);

      // Verifica diretamente no banco de dados se a entidade foi salva
      const found = await escolasRepository.findOne({
        where: { id: result.id },
      });
      expect(found).not.toBeNull();
      expect(found.nome).toEqual(createEscolaDto.nome);
    });
  });

  describe("findAll", () => {
    it("deve retornar uma lista de escolas do banco de dados", async () => {
      // Prepara o banco com um dado de teste
      await escolasRepository.save({
        nome: "Escola para Listagem",
        redeEnsino: "Estadual",
        codigoINEP: "11223344",
      });

      const result = await escolasService.findAll();

      expect(result).toHaveLength(1);
      expect(result[0].nome).toEqual("Escola para Listagem");
    });
  });

  describe("remove", () => {
    it("deve remover uma escola do banco de dados", async () => {
      // Prepara o banco com um dado de teste
      const escola = await escolasRepository.save({
        nome: "Escola a ser Removida",
        redeEnsino: "Privada",
        codigoINEP: "99887766",
      });

      await escolasService.remove(escola.id);

      // Verifica se a escola foi realmente removida
      const found = await escolasRepository.findOne({
        where: { id: escola.id },
      });
      expect(found).toBeNull();
    });
  });
});
