/*
 * MÁRCIO RODRIGUES DE OLIVEIRA, DEV FULSTACK, (62) 99646-6033
 */

import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EscolasService } from "./escolas.service";
import { Escola } from "./entities/escola.entity";
import { CreateEscolaDto } from "./dto/create-escola.dto";

// Mock da entidade Escola para os testes
const escolaEntityMock: Escola = {
  id: 1,
  nome: "Escola Municipal Centro",
  redeEnsino: "Municipal",
  codigoINEP: "12345678",
  // Adicione outras propriedades da entidade que sejam necessárias
};

// Mock do DTO para criação
const createEscolaDto: CreateEscolaDto = {
  nome: "Escola Municipal Centro",
  redeEnsino: "Municipal",
  codigoINEP: "12345678",
};

describe("EscolasService", () => {
  let escolasService: EscolasService;
  let escolasRepository: Repository<Escola>;

  beforeEach(async () => {
    // Cria um módulo de teste em memória
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EscolasService,
        {
          // Fornece um mock para o repositório de Escola
          provide: getRepositoryToken(Escola),
          useValue: {
            create: jest.fn().mockResolvedValue(escolaEntityMock),
            save: jest.fn().mockResolvedValue(escolaEntityMock),
            find: jest.fn().mockResolvedValue([escolaEntityMock]),
            findOne: jest.fn().mockResolvedValue(escolaEntityMock),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile();

    // Obtém as instâncias do serviço e do repositório mockado
    escolasService = module.get<EscolasService>(EscolasService);
    escolasRepository = module.get<Repository<Escola>>(
      getRepositoryToken(Escola),
    );
  });

  // Garante que as instâncias foram criadas corretamente
  it("should be defined", () => {
    expect(escolasService).toBeDefined();
    expect(escolasRepository).toBeDefined();
  });

  // Teste para o método `create`
  describe("create", () => {
    it("deve criar e salvar uma nova escola com sucesso", async () => {
      // Chama o método do serviço
      const result = await escolasService.create(createEscolaDto);

      // Verifica se o resultado é o esperado
      expect(result).toEqual(escolaEntityMock);

      // Verifica se os métodos do repositório foram chamados corretamente
      expect(escolasRepository.create).toHaveBeenCalledWith(createEscolaDto);
      expect(escolasRepository.save).toHaveBeenCalledWith(escolaEntityMock);
    });
  });

  // Teste para o método `findAll`
  describe("findAll", () => {
    it("deve retornar uma lista de escolas", async () => {
      // Chama o método do serviço
      const result = await escolasService.findAll();

      // Verifica se o resultado é o esperado
      expect(result).toEqual([escolaEntityMock]);
      expect(escolasRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  // Teste para o método `remove`
  describe("remove", () => {
    it("deve remover uma escola com sucesso", async () => {
      const result = await escolasService.remove(1);

      expect(result).toBeUndefined();
      expect(escolasRepository.delete).toHaveBeenCalledWith({ id: 1 });
      expect(escolasRepository.delete).toHaveBeenCalledTimes(1);
    });
  });
});
