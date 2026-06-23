# VEREDAS Workspace

Workspace operacional do VEREDAS com tres stacks Docker independentes rodando no WSL:

- `VEREDAS-Core`: Core central com Symfony, Angular admin, PostgreSQL, Redis, MQTT e pgAdmin;
- `VEREDAS-Edge`: Edge embarcado com `local-api`, MQTT e SQLite embarcado;
- `VEREDAS-PWA`: repositorio Angular dedicado ao hub e PWAs independentes (aluno, motorista, monitor, paciente) com resolucao `edge-first` e fallback no Core web.

## Modelo de repositorios

O workspace passa a trabalhar com quatro repositorios relacionados:

- `VEREDAS`: repositorio principal de desenvolvimento integrado, documentacao compartilhada, scripts e ponteiros para os submodulos;
- `VEREDAS-Core`: repositorio independente do Core, clonavel sozinho para servidor, API e administracao central;
- `VEREDAS-Edge`: repositorio independente do Edge, clonavel sozinho para dispositivo embarcado e testes offline;
- `VEREDAS-PWA`: repositorio independente do frontend Angular/PWA, em `https://github.com/sertaodigitalorg/VEREDAS-PWA.git`.

O vinculo recomendado entre eles e por `git submodule`, nao por fork.

### Quando usar cada repositorio

- desenvolvimento integrado: clonar `VEREDAS` com seus submodulos;
- deploy ou teste apenas do Core: clonar somente `VEREDAS-Core`;
- deploy ou teste apenas do Edge: clonar somente `VEREDAS-Edge`;
- deploy ou teste apenas de frontend/PWA: clonar somente `VEREDAS-PWA`.

### Clonagem recomendada

- workspace completo: `git clone --recurse-submodules https://github.com/sertaodigitalorg/VEREDAS.git`
- baixar submodulos depois: `git submodule update --init --recursive`
- somente Core: `git clone https://github.com/sertaodigitalorg/VEREDAS-Core.git`
- somente Edge: `git clone https://github.com/sertaodigitalorg/VEREDAS-Edge.git`
- somente PWA: `git clone https://github.com/sertaodigitalorg/VEREDAS-PWA.git`

### Fluxo de manutencao

- evolucoes proprias do Core devem ser commitadas e publicadas em `VEREDAS-Core`;
- evolucoes proprias do Edge devem ser commitadas e publicadas em `VEREDAS-Edge`;
- evolucoes proprias do PWA devem ser commitadas e publicadas em `VEREDAS-PWA`;
- o repositorio `VEREDAS` versiona o ponteiro exato de cada submodulo, alem de scripts e documentacao compartilhada.

## Documentacao

- a documentacao compartilhada do workspace fica centralizada diretamente em `docs/`, sem indices intermediarios
- arquitetura integrada do workspace: [docs/arquitetura-geral.md](docs/arquitetura-geral.md)
- operacao integrada das stacks: [docs/operacao.md](docs/operacao.md)
- manual do usuario geral: [docs/manual-usuario.md](docs/manual-usuario.md)
- manual do operador funcional: [docs/manual-operador-funcional.md](docs/manual-operador-funcional.md)
- manual de suporte tecnico: [docs/manual-suporte-tecnico.md](docs/manual-suporte-tecnico.md)
- matriz de implantacao tecnica: [docs/matriz-implantacao-tecnica.md](docs/matriz-implantacao-tecnica.md)
- projeto VEREDAS-PWA: [VEREDAS-PWA/README.md](VEREDAS-PWA/README.md)
- cenarios de teste integrados: [docs/cenarios-teste.md](docs/cenarios-teste.md)
- Core: [VEREDAS-Core/docs/README.md](https://github.com/sertaodigitalorg/VEREDAS-Core/blob/main/docs/README.md)
- Edge: [VEREDAS-Edge/docs/README.md](https://github.com/sertaodigitalorg/VEREDAS-Edge/blob/main/docs/README.md)

Esta documentacao compartilhada cobre o que vale para o ecossistema como um todo: arquitetura integrada, operacao das duas stacks, manual do usuario em nivel de plataforma e cenarios de teste que atravessam Core e Edge.

## Operacao padronizada

O fluxo padrao passa sempre pelo WSL com Docker. Os `docker compose` das tres stacks sao independentes e cada stack possui seu proprio `Makefile`.

### Makefiles

- raiz: `c:/VEREDAS/Makefile`
- Core: `c:/VEREDAS/VEREDAS-Core/Makefile`
- Edge: `c:/VEREDAS/VEREDAS-Edge/Makefile`
- PWA: `c:/VEREDAS/VEREDAS-PWA/Makefile`

### Alvos principais

- `make up-all`: sobe todos os servicos da stack atual;
- `make down-all`: derruba todos os servicos da stack atual;
- `make status`: mostra o estado dos containers da stack atual;
- `make logs`: mostra os logs recentes da stack atual.

Na raiz do workspace:

- `make up-all`: sobe Core, Edge e VEREDAS-PWA;
- `make down-all`: derruba VEREDAS-PWA, Edge e Core;
- `make status-all`: mostra o estado das tres stacks;
- `make logs-all`: mostra logs das tres stacks;
- `make up-pwa`: sobe apenas a stack VEREDAS-PWA;
- `make down-pwa`: derruba apenas a stack VEREDAS-PWA.

## Scripts WSL

Tambem existem wrappers para operacao direta no WSL:

- `c:/VEREDAS/scripts/wsl-stacks.ps1`
- `/mnt/c/VEREDAS/scripts/wsl-stacks.sh`

## Customizacoes de agente

As padronizacoes compartilhadas do time ficam em `.github/`:

- `.github/copilot-instructions.md`
- `.github/agents/veredas-stack-operator.agent.md`
- `.github/skills/veredas-stack-ops/SKILL.md`
- `.github/skills/veredas-sync-diagnostics/SKILL.md`
