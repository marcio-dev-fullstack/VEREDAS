<!-- MÁRCIO RODRIGUES DE OLIVEIRA, DEV FULSTACK, (62) 99646-6033 -->

# Cenario Integrado de Educacao entre Core e Edge

## Objetivo

Executar um roteiro de teste ponta a ponta da Educacao, saindo de um ambiente zerado, subindo o sistema, trocando os usuarios padrao e validando as principais telas de cadastro e vinculacao escolar ate deixar a jornada pronta para operacao no Edge.

## Escopo

- subida inicial do ambiente;
- login e endurecimento das credenciais demo;
- validacao visual e funcional do hub de Educacao;
- cadastros de escolas, turnos, turmas, alunos, responsaveis e matriculas;
- cadastros de linhas, paradas, vinculos e solicitacoes;
- preparacao da jornada para integracao com Edge.

## Pre-requisitos do zero

1. Workspace completo clonado com submodulos.
2. Docker Desktop e WSL operacionais.
3. Execucao na raiz do workspace `c:/VEREDAS` ou `/mnt/c/VEREDAS`.

## Preparacao do ambiente

### Etapa 1. Subir as stacks

No WSL:

```bash
cd /mnt/c/VEREDAS
make up-all
```

### Etapa 2. Validar disponibilidade

1. Core health: `http://localhost:8000/health`
2. Edge health: `http://localhost:9080/health`
3. Login do Core: `http://localhost:8000/pt_BR/login`

### Etapa 3. Confirmar usuarios demo

1. `jane_admin / kitten`
2. `tom_admin / kitten`
3. `john_user / kitten`

## Massa de teste sugerida

- 1 turno: `Manha` das `07:00` as `11:30`;
- 1 escola: `Escola Municipal Centro`;
- 1 turma: `6A`;
- 1 aluno: `Joao da Silva`;
- 1 responsavel: `Maria da Silva`;
- 1 matricula ativa para `2026`;
- 1 linha escolar: `Linha 12 Centro`;
- 1 parada escolar: `Parada Praca Central`;
- 1 vinculo de transporte regular;
- 1 solicitacao de transporte em analise.

## Cenario 1. Primeiro acesso e troca de senha do admin

### Passos

1. Abrir `http://localhost:8000/pt_BR/login`.
2. Entrar com `jane_admin / kitten`.
3. Abrir `http://localhost:8000/pt_BR/profile/edit` e atualizar nome e email.
4. Abrir `http://localhost:8000/pt_BR/profile/change-password`.
5. Informar senha atual `kitten` e definir nova senha forte.
6. Confirmar logout automatico.
7. Entrar novamente com a nova senha.

### Resultado esperado

- login inicial concluido com sucesso;
- dados do perfil atualizados;
- senha alterada com invalidacao da sessao anterior;
- novo login funcionando com a senha definitiva.

## Cenario 2. Validacao visual do hub de Educacao

### Passos

1. Abrir `http://localhost:8000/pt_BR/admin/education`.
2. Conferir os cards de `Alunos`, `Responsaveis`, `Matriculas`, `Escolas`, `Turmas`, `Turnos`, `Calendario letivo`, `Linhas escolares`, `Paradas escolares`, `Vinculos de transporte` e `Solicitacoes`.
3. Verificar se os cards possuem titulo, descricao e CTA de acesso sem quebra de layout.

### Resultado esperado

- hub carregado sem erro 403 ou 404;
- todos os cards previstos visiveis;
- layout estavel em desktop e sem sobreposicao de conteudo.

## Cenario 3. Cadastros estruturantes de Educacao

### Passos

1. Abrir `Turnos` em `http://localhost:8000/pt_BR/admin/education/turnos`.
2. Incluir o turno `Manha` com hora de entrada e saida.
3. Abrir `Escolas` em `http://localhost:8000/pt_BR/admin/education/escolas`.
4. Incluir `Escola Municipal Centro` com codigo INEP e rede `Municipal`.
5. Abrir `Turmas` em `http://localhost:8000/pt_BR/admin/education/turmas`.
6. Criar a turma `6A`, vinculando escola e turno criados.
7. Abrir `Calendario letivo` em `http://localhost:8000/pt_BR/admin/education/calendario-letivo` e registrar um dia letivo para o ano corrente.

### Resultado esperado

- os formulários apresentam os campos obrigatorios esperados;
- a ordem de dependencias faz sentido funcional;
- listas exibem filtros, ordenacao, paginacao e botoes de acao.

## Cenario 4. Cadastros de alunos e vinculos escolares

### Passos

1. Abrir `Responsaveis` em `http://localhost:8000/pt_BR/admin/education/responsaveis`.
2. Criar `Maria da Silva` com telefone e parentesco.
3. Abrir `Alunos` em `http://localhost:8000/pt_BR/admin/education/alunos`.
4. Criar `Joao da Silva`, vinculando escola, turma e turno.
5. Abrir `Matriculas` em `http://localhost:8000/pt_BR/admin/education/matriculas`.
6. Criar a matricula do aluno para o ano letivo atual, com status `Ativa`.

### Resultado esperado

- aluno criado com relacionamentos coerentes;
- responsavel e matricula disponiveis para consultas futuras;
- listas mostram nome, referencia e contexto corretamente.

## Cenario 5. Cadastros operacionais da rota escolar

### Passos

1. Abrir `Linhas escolares` em `http://localhost:8000/pt_BR/admin/education/linhas-escolares`.
2. Criar `Linha 12 Centro` vinculada a `Escola Municipal Centro`.
3. Abrir `Paradas escolares` em `http://localhost:8000/pt_BR/admin/education/paradas-escolares`.
4. Criar `Parada Praca Central` com endereco e status `Ativa`.
5. Abrir `Vinculos de transporte` em `http://localhost:8000/pt_BR/admin/education/vinculos-transporte`.
6. Vincular `Joao da Silva` a `Maria da Silva`, `Linha 12 Centro` e `Parada Praca Central`.
7. Definir tipo de atendimento `Regular`.

### Resultado esperado

- rota e parada ficam disponiveis no dominio escolar;
- vinculo aluno -> responsavel -> linha -> parada fica persistido;
- o registro pode ser filtrado e ordenado na grade.

## Cenario 6. Solicitacao de transporte escolar

### Passos

1. Abrir `Solicitacoes` em `http://localhost:8000/pt_BR/admin/education/solicitacoes`.
2. Criar uma solicitacao de transporte para `Joao da Silva`.
3. Informar solicitante, tipo da solicitacao e status inicial `Em analise`.
4. Confirmar retorno para a lista.
5. Testar filtro textual pelo protocolo ou nome do aluno.
6. Testar ordenacao por atualizacao.
7. Abrir o registro novamente e editar o status quando necessario.

### Resultado esperado

- o fluxo de solicitacao fecha a jornada administrativa da Educacao;
- filtros e ordenacao ajudam a localizar o caso criado;
- edicao e inativacao permanecem disponiveis no ciclo do cadastro.

## Cenario 7. Checklist visual das telas de Educacao

Validar em todas as telas visitadas:

- `h1` e `h2` legiveis;
- botao principal de inclusao visivel;
- card de filtros sem quebra;
- tabela com cabecalhos alinhados;
- ordenacao clicavel;
- paginacao renderizada;
- formulario com labels e selects coerentes;
- sidebar de contexto sem truncamento.

## Resultado final esperado

Ao final do roteiro:

1. o ambiente foi iniciado do zero com Core e Edge ativos;
2. o usuario admin padrao teve a senha alterada;
3. as telas principais de Educacao foram validadas visual e funcionalmente;
4. a jornada escolar ficou pronta para testes integrados com Edge e operacao de rota.

## Onde aprofundar

1. Core: [VEREDAS-Core/docs/modulos/cenarios-reais-teste.md](https://github.com/sertaodigitalorg/VEREDAS-Core/blob/main/docs/modulos/cenarios-reais-teste.md)
2. Edge: [VEREDAS-Edge/docs/operacao/cenarios-reais-teste.md](https://github.com/sertaodigitalorg/VEREDAS-Edge/blob/main/docs/operacao/cenarios-reais-teste.md)
