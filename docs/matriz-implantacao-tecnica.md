# Matriz de Implantacao Tecnica e Smoke Test do VEREDAS

## Objetivo

Padronizar a implantacao tecnica do workspace VEREDAS e o smoke test inicial de infraestrutura em formato de planilha Markdown, com foco em subida das stacks, disponibilidade dos servicos, validacao basica do Core e do Edge e handoff para a validacao funcional.

## Como usar

1. Execute os itens na ordem das tabelas.
2. Preencha `Evidencia` com comando executado, print, URL, log, usuario criado ou observacao objetiva.
3. Preencha `Status` com `Pendente`, `Aprovado`, `Aprovado com ressalvas` ou `Falhou`.
4. Se um item falhar, registre a acao corretiva antes de seguir.

## Matriz de implantacao do zero

| ID | Area | Passo | Resultado esperado | Evidencia | Status |
| --- | --- | --- | --- | --- | --- |
| TEC-01 | Pre-requisito | Confirmar Windows com WSL funcional e Docker Desktop integrado ao WSL. | Ambiente base apto para subir Core e Edge. |  | Pendente |
| TEC-02 | Pre-requisito | Confirmar Git instalado e `make` disponivel no WSL. | Ferramentas minimas de operacao disponiveis. |  | Pendente |
| TEC-03 | Portas | Validar disponibilidade das portas `8000`, `9080`, `4300`, `4301` e `4302`. | Nenhum conflito critico de porta para Core e Edge. |  | Pendente |
| TEC-04 | Workspace | Clonar o workspace completo com `git clone --recurse-submodules` ou inicializar os submodulos. | Repositorio principal e submodulos disponiveis localmente. |  | Pendente |
| TEC-05 | Estrutura | Confirmar existencia de `VEREDAS-Core`, `VEREDAS-Edge`, `docs` e `scripts`. | Estrutura minima do workspace presente. |  | Pendente |

## Matriz de subida das stacks

| ID | Area | Passo | Resultado esperado | Evidencia | Status |
| --- | --- | --- | --- | --- | --- |
| TEC-06 | Root Makefile | Executar `make up-all` na raiz `/mnt/c/VEREDAS`. | Stacks Core e Edge iniciadas sem erro fatal de compose. |  | Pendente |
| TEC-07 | Status geral | Executar `make status-all`. | Containers das duas stacks listados com estado coerente. |  | Pendente |
| TEC-08 | Logs gerais | Executar `make logs-all` e revisar erros criticos. | Sem erro bloqueante imediato em Core ou Edge. |  | Pendente |
| TEC-09 | Core | Executar `make -C /mnt/c/VEREDAS/VEREDAS-Core status`. | Servicos principais do Core visiveis na stack `veredas-core`. |  | Pendente |
| TEC-10 | Edge | Executar `make -C /mnt/c/VEREDAS/VEREDAS-Edge status`. | Servicos principais do Edge visiveis na stack `veredas-edge`. |  | Pendente |

## Smoke test de infraestrutura

| ID | Area | Passo | Resultado esperado | Evidencia | Status |
| --- | --- | --- | --- | --- | --- |
| TEC-11 | Core health | Abrir `http://localhost:8000/health`. | Core responde com health positivo. |  | Pendente |
| TEC-12 | Edge health | Abrir `http://localhost:9080/health`. | Local API do Edge responde com health positivo. |  | Pendente |
| TEC-13 | Login Core | Abrir `http://localhost:8000/pt_BR/login`. | Tela de login do Core renderiza sem erro de frontend ou backend. |  | Pendente |
| TEC-14 | Portal Edge | Abrir `http://localhost:4300`, `http://localhost:4301` e `http://localhost:4302`. | PWAs e edge admin carregam sem indisponibilidade imediata. |  | Pendente |
| TEC-15 | Core stack | Confirmar disponibilidade basica de `core-web`, `db`, `redis`, `mqtt` e demais servicos necessarios. | Servicos centrais do Core ativos ou saudaveis. |  | Pendente |
| TEC-16 | Edge stack | Confirmar disponibilidade basica de `local-api`, PWAs e MQTT local. | Servicos centrais do Edge ativos ou acessiveis. |  | Pendente |

## Smoke test tecnico do Core

| ID | Area | Passo | Resultado esperado | Evidencia | Status |
| --- | --- | --- | --- | --- | --- |
| TEC-17 | Usuario demo | Validar login com `jane_admin / kitten`. | Acesso administrativo inicial confirmado. |  | Pendente |
| TEC-18 | Fixtures | Se necessario, executar `make -C /mnt/c/VEREDAS/VEREDAS-Core fixtures-load`. | Dados demo disponiveis para bootstrap funcional. |  | Pendente |
| TEC-19 | Schema | Se necessario, executar `make -C /mnt/c/VEREDAS/VEREDAS-Core schema-update`. | Banco do Core alinhado ao schema atual. |  | Pendente |
| TEC-20 | Cache | Se necessario, executar `make -C /mnt/c/VEREDAS/VEREDAS-Core cache-clear`. | Cache Symfony renovado sem erro. |  | Pendente |
| TEC-21 | Hubs | Abrir `/pt_BR/admin/education`, `/pt_BR/admin/health` e `/pt_BR/admin/base-operacional`. | Hubs administrativos carregam sem erro 403, 404 ou 500. |  | Pendente |

## Gestao tecnica de usuarios

| ID | Area | Passo | Resultado esperado | Evidencia | Status |
| --- | --- | --- | --- | --- | --- |
| TEC-22 | Usuario admin | Criar usuario administrativo definitivo com `app:add-user ... --admin`. | Novo usuario admin criado com sucesso. |  | Pendente |
| TEC-23 | Usuario comum | Criar usuario comum sem `--admin`. | Novo usuario de operacao criado com sucesso. |  | Pendente |
| TEC-24 | Handoff login | Validar login com um usuario definitivo. | Ambiente pronto para entrega ao operador funcional. |  | Pendente |

## Recuperacao inicial em caso de falha

| ID | Area | Passo | Resultado esperado | Evidencia | Status |
| --- | --- | --- | --- | --- | --- |
| TEC-25 | Core indisponivel | Executar `make -C /mnt/c/VEREDAS/VEREDAS-Core logs` e `make -C /mnt/c/VEREDAS/VEREDAS-Core up-core-web`. | Core recuperado ou falha isolada com log documentado. |  | Pendente |
| TEC-26 | Edge indisponivel | Executar `make -C /mnt/c/VEREDAS/VEREDAS-Edge logs` e subir o servico afetado. | Edge recuperado ou falha isolada com log documentado. |  | Pendente |
| TEC-27 | Revalidacao | Repetir os checks de `health` e abertura das URLs principais. | Ambiente volta ao estado minimo aceitavel de implantacao. |  | Pendente |

## Encerramento e entrega

| ID | Area | Passo | Resultado esperado | Evidencia | Status |
| --- | --- | --- | --- | --- | --- |
| TEC-28 | Consolidacao | Revisar todos os itens e preencher status final. | Nenhuma etapa tecnica fica sem registro. |  | Pendente |
| TEC-29 | Evidencias | Consolidar logs, prints, comandos e observacoes de falhas ou ressalvas. | Historico tecnico de implantacao preservado. |  | Pendente |
| TEC-30 | Handoff funcional | Encaminhar o operador para `manual-operador-funcional.md` e `matriz-teste-funcional.md`. | Implantacao tecnica encerrada com transicao clara para QA funcional. |  | Pendente |

## Referencias de apoio

1. Manual de suporte tecnico: [manual-suporte-tecnico.md](manual-suporte-tecnico.md)
2. Manual do operador funcional: [manual-operador-funcional.md](manual-operador-funcional.md)
3. Matriz funcional: [matriz-teste-funcional.md](matriz-teste-funcional.md)
4. Operacao do workspace: [operacao.md](operacao.md)
5. README principal: [../README.md](../README.md)