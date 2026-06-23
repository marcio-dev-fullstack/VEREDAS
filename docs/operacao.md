<!-- MÁRCIO RODRIGUES DE OLIVEIRA, DEV FULSTACK, (62) 99646-6033 -->

# Operacao Geral do Workspace

## Objetivo

Centralizar a operacao conjunta das stacks Core, Edge e VEREDAS-PWA quando o assunto ultrapassa o contexto de um pacote isolado.

## Comandos da raiz

Use na raiz `c:/VEREDAS`:

- `make up-all`: sobe Core, Edge e VEREDAS-PWA;
- `make down-all`: derruba VEREDAS-PWA, Edge e Core;
- `make status-all`: mostra o estado das tres stacks;
- `make logs-all`: mostra logs consolidados das tres stacks;
- `make up-pwa`: sobe apenas a stack VEREDAS-PWA;
- `make down-pwa`: derruba apenas a stack VEREDAS-PWA;
- `make status-pwa`: mostra o estado da stack VEREDAS-PWA;
- `make logs-pwa`: mostra os logs da stack VEREDAS-PWA.

## Quando operar pela raiz

- validacao integrada entre Core, Edge e PWAs web;
- sincronizacao ponta a ponta;
- revisao de documentacao geral, cenarios e scripts compartilhados.

## Quando operar dentro de cada pacote

- manutencao especifica da API, admin, banco ou integracoes do Core;
- manutencao especifica do `local-api` e operacao offline do Edge.
- manutencao especifica do hub web e dos PWAs independentes em `VEREDAS-PWA`.

## Referencias especificas

- Core: [VEREDAS-Core/README.md](https://github.com/sertaodigitalorg/VEREDAS-Core/blob/main/README.md)
- Edge: [VEREDAS-Edge/README.md](https://github.com/sertaodigitalorg/VEREDAS-Edge/blob/main/README.md)
- VEREDAS-PWA: [VEREDAS-PWA/README.md](../VEREDAS-PWA/README.md)
