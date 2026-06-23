# Roteiro de Teste Dev: Login, Fluxo do Gestor e Gestao de Rota

## Objetivo

Validar a jornada principal do gestor no Core, desde autenticacao ate a criacao e acompanhamento da rota operacional.

## Escopo

- login no backoffice;
- navegacao do dashboard;
- cadastros iniciais essenciais;
- vinculacao de recursos operacionais;
- gestao da rota e verificacao de consistencia.

## Pre-requisitos de ambiente (WSL)

1. Subir a stack Core no WSL:
   - `cd /mnt/c/VEREDAS/VEREDAS-Core`
   - `make up-all`
2. Confirmar disponibilidade do Core:
   - `http://localhost:8000/health`
3. Garantir usuario admin de teste ativo (fixtures):
   - usuario: `jane_admin`
   - senha: `kitten`

## Massa de teste sugerida

- 1 escola: Escola Municipal Centro;
- 1 turma: 6A Manha;
- 1 aluno: Joao da Silva;
- 1 responsavel: Maria da Silva;
- 1 veiculo: placa ABC1D23;
- 1 motorista: Carlos Pereira;
- 1 monitor: Ana Souza;
- 1 linha escolar: Linha 12 Centro.

## Cenario 1: Login e aterrissagem no dashboard

### Passos

1. Acessar `http://localhost:8000/pt_BR/login`.
2. Informar credenciais de admin validas.
3. Enviar formulario de login.

### Resultado esperado

- redirecionamento para dashboard admin;
- menu superior exibindo Dashboard, Modulos, Base, Comunicados e IA;
- sessao autenticada com nome do usuario no canto direito.

## Cenario 2: Validacao de acesso do gestor aos hubs

### Passos

1. No menu Modulos, abrir Educacao.
2. Retornar ao menu Modulos e abrir Saude.
3. Abrir Base.

### Resultado esperado

- telas de hub carregam sem erro 403/404;
- cards de cadastro aparecem em cada hub;
- navegacao entre hubs responde sem quebra de sessao.

## Cenario 3: Cadastros iniciais de Educacao

### Passos

1. Em Modulos > Educacao, abrir cadastro de Escolas.
2. Simular criacao/edicao dos dados da escola.
3. Abrir cadastro de Turmas e registrar 6A Manha.
4. Abrir cadastro de Alunos e registrar Joao da Silva.
5. Abrir cadastro de Responsaveis e vincular Maria da Silva ao aluno.

### Resultado esperado

- campos obrigatorios apresentados de forma coerente;
- tela de cada recurso abre com metadados esperados (titulo, campos, dependencias);
- relacionamento aluno-responsavel fica documentado para uso operacional.

## Cenario 4: Cadastros operacionais de Base

### Passos

1. Em Base, abrir cadastro de Veiculos e registrar ABC1D23.
2. Abrir cadastro de Motoristas e registrar Carlos Pereira.
3. Abrir cadastro de Monitores e registrar Ana Souza.
4. Abrir cadastro de Dispositivos Edge e vincular ao veiculo.

### Resultado esperado

- cadastros de frota e equipe acessiveis;
- dependencias entre veiculo e dispositivo edge visiveis;
- dados prontos para composicao da linha escolar.

## Cenario 5: Gestao da rota escolar

### Passos

1. Em Modulos > Educacao, abrir Linhas escolares.
2. Criar/editar Linha 12 Centro com veiculo, motorista e monitor.
3. Abrir Paradas escolares e incluir pontos de embarque.
4. Abrir Vinculos de transporte e associar Joao da Silva a Linha 12 Centro.
5. Revisar Solicitacoes de transporte para confirmar status do atendimento.

### Resultado esperado

- linha escolar referencia recursos operacionais existentes;
- aluno vinculado a rota com parada definida;
- fluxo operacional fica pronto para execucao no Edge.

## Cenario 6: Verificacao final no dashboard

### Passos

1. Voltar ao Dashboard.
2. Conferir indicadores e eventos recentes.
3. Registrar evidencias (prints e anotacoes de inconsistencias).

### Resultado esperado

- dashboard acessivel apos toda a jornada;
- sem erro de permissao ou rota inexistente;
- trilha funcional pronta para testes integrados Core-Edge.

## Checklist de aprovacao

- login admin funciona em pt_BR;
- menu do admin renderiza com itens atualizados;
- hubs Educacao, Saude e Base abrem sem erro;
- recursos-chave de cadastro abrem com campos esperados;
- vinculo aluno -> linha -> parada e validado;
- fluxo apto para evoluir para teste integrado com Edge.

## Proximo passo recomendado

Depois da aprovacao deste roteiro no Core, executar o cenario integrado de educacao para validar publicacao e reconciliacao de eventos entre Core e Edge.
