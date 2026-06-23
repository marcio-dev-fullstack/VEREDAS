# Manual de Suporte Tecnico do VEREDAS

## Objetivo

Orientar implantacao, subida, validacao tecnica, criacao de usuarios, diagnostico inicial e sustentacao operacional do workspace VEREDAS em ambiente local com WSL e Docker.

## Perfil indicado

- suporte tecnico;
- implantador;
- responsavel por infraestrutura local;
- analista de sustentacao.

## O que este manual cobre

- instalacao do zero;
- subida das stacks Core e Edge;
- validacao tecnica do ambiente;
- recuperacao inicial em caso de falha;
- criacao e manutencao de usuarios;
- handoff para operadores funcionais.

Para registrar a execucao tecnica de forma padronizada, use [matriz-implantacao-tecnica.md](matriz-implantacao-tecnica.md).

## Pre-requisitos tecnicos

Antes da instalacao, confirme:

1. Windows com WSL habilitado.
2. Docker Desktop com integracao WSL ativa.
3. Git instalado.
4. `make` funcional no WSL.
5. Portas `8000`, `9080`, `4300`, `4301` e `4302` livres.

## Instalacao do zero

### Clonar o workspace completo

```bash
git clone --recurse-submodules https://github.com/sertaodigitalorg/VEREDAS.git
cd VEREDAS
```

Se necessario inicializar os submodulos depois:

```bash
git submodule update --init --recursive
```

## Subida padrao das stacks

No WSL, a partir de `/mnt/c/VEREDAS`:

```bash
make up-all
```

Para revisar o estado atual:

```bash
make status-all
```

Para ver logs consolidados:

```bash
make logs-all
```

Para derrubar tudo:

```bash
make down-all
```

## Validacao tecnica inicial

Depois da subida, validar:

1. Core health em `http://localhost:8000/health`
2. Login Core em `http://localhost:8000/pt_BR/login`
3. Edge local API em `http://localhost:9080/health`
4. PWA motorista em `http://localhost:4300`
5. PWA monitor em `http://localhost:4301`
6. Edge admin em `http://localhost:4302`

## Operacao por stack

### Core

Dentro de `VEREDAS-Core`:

- `make up-all`
- `make down-all`
- `make status`
- `make logs`
- `make up-core-web`
- `make schema-update`
- `make fixtures-load`
- `make cache-clear`

### Edge

Dentro de `VEREDAS-Edge`:

- `make up-all`
- `make down-all`
- `make status`
- `make logs`
- `make up-local-api`
- `make up-pwa-motorista`
- `make up-pwa-monitor`
- `make up-edge-admin`

## Usuarios iniciais e transicao para producao funcional

### Credenciais demo

O Core sobe com:

- `jane_admin / kitten`
- `tom_admin / kitten`
- `john_user / kitten`

### Criar usuarios definitivos

No Core, criar um novo administrador:

```bash
cd /mnt/c/VEREDAS/VEREDAS-Core
docker compose exec core-web php bin/console app:add-user operador_core SenhaSegura123 operador@prefeitura.gov.br "Operador Core" --admin
```

Criar usuario comum:

```bash
cd /mnt/c/VEREDAS/VEREDAS-Core
docker compose exec core-web php bin/console app:add-user usuario_base SenhaSegura123 usuario@prefeitura.gov.br "Usuario Base"
```

### Handoff para o operador funcional

Antes de entregar o ambiente ao operador:

1. confirmar login com o usuario definitivo;
2. orientar troca de senha no primeiro acesso;
3. confirmar abertura dos hubs de Educacao, Saude e Base Operacional.

## Troubleshooting inicial

### Core nao responde

1. Executar `make -C /mnt/c/VEREDAS/VEREDAS-Core status`
2. Executar `make -C /mnt/c/VEREDAS/VEREDAS-Core logs`
3. Recriar o `core-web` com `make -C /mnt/c/VEREDAS/VEREDAS-Core up-core-web`

### Edge nao responde

1. Executar `make -C /mnt/c/VEREDAS/VEREDAS-Edge status`
2. Executar `make -C /mnt/c/VEREDAS/VEREDAS-Edge logs`
3. Subir o servico afetado com o alvo especifico do Makefile.

### Falta de dados demo no Core

No Core:

```bash
cd /mnt/c/VEREDAS/VEREDAS-Core
make fixtures-load
```

### Alteracao de entidade ou schema desatualizado

No Core:

```bash
cd /mnt/c/VEREDAS/VEREDAS-Core
make schema-update
```

### Cache Symfony desatualizado

No Core:

```bash
cd /mnt/c/VEREDAS/VEREDAS-Core
make cache-clear
```

## Sequencia recomendada de implantacao

1. Clonar o workspace.
2. Inicializar submodulos.
3. Subir Core e Edge.
4. Validar os endpoints de health.
5. Confirmar login com usuario demo.
6. Criar usuarios definitivos quando necessario.
7. Entregar o ambiente ao operador funcional.
8. Solicitar execucao dos roteiros de Educacao e Saude.
9. Recolher evidencias e tratar falhas apontadas.

## Entrega para validacao funcional

Quando o ambiente estiver pronto, encaminhar o operador para:

1. [manual-operador-funcional.md](manual-operador-funcional.md)
2. [cenarios-teste/educacao-core-edge.md](cenarios-teste/educacao-core-edge.md)
3. [cenarios-teste/saude-e-modulos.md](cenarios-teste/saude-e-modulos.md)
4. [matriz-teste-funcional.md](matriz-teste-funcional.md)

## Referencias

1. Indice geral: [manual-usuario.md](manual-usuario.md)
2. Operacao do workspace: [operacao.md](operacao.md)
3. README principal: [../README.md](../README.md)
4. Core: [VEREDAS-Core/README.md](https://github.com/sertaodigitalorg/VEREDAS-Core/blob/main/README.md)
5. Edge: [VEREDAS-Edge/README.md](https://github.com/sertaodigitalorg/VEREDAS-Edge/blob/main/README.md)
6. Matriz tecnica: [matriz-implantacao-tecnica.md](matriz-implantacao-tecnica.md)