# Manual do Operador Funcional do VEREDAS

## Objetivo

Orientar gestores e operadores funcionais no primeiro uso do VEREDAS, cobrindo acesso inicial, troca de senha, navegacao pelos hubs e execucao dos fluxos principais de Educacao e Saude.

## Perfil indicado

- gestor municipal;
- operador da central;
- administrador funcional do Core.

## O que este manual cobre

- primeiro acesso ao Core;
- troca das credenciais demo;
- navegacao inicial pelos modulos;
- sequencia recomendada de uso das telas;
- ponteiros para os roteiros detalhados de Educacao e Saude.

## Antes de comecar

Peça ao suporte tecnico para confirmar:

1. Core disponivel em `http://localhost:8000`.
2. Edge disponivel em `http://localhost:9080` quando o teste envolver integracao.
3. Usuarios demo ou usuarios definitivos ativos.
4. Ambiente sem erro nos endpoints de health.

## Credenciais demo iniciais

Enquanto o ambiente ainda estiver em fase de implantacao, o Core pode subir com estes usuarios:

- `jane_admin / kitten`
- `tom_admin / kitten`
- `john_user / kitten`

Essas credenciais devem ser trocadas no primeiro acesso.

## Primeiro login

1. Abrir `http://localhost:8000/pt_BR/login`.
2. Entrar com `jane_admin / kitten`.
3. Confirmar o redirecionamento para a area autenticada.
4. Verificar se o menu administrativo esta visivel.

## Atualizacao do proprio usuario

### Atualizar perfil

1. Abrir `http://localhost:8000/pt_BR/profile/edit`.
2. Atualizar nome completo e email institucional.
3. Salvar e confirmar a mensagem de sucesso.

### Trocar a senha padrao

1. Abrir `http://localhost:8000/pt_BR/profile/change-password`.
2. Informar a senha atual `kitten`.
3. Definir nova senha forte.
4. Confirmar a nova senha.
5. Ao salvar, entrar novamente com a nova senha.

## Sequencia recomendada de validacao funcional

Depois do primeiro login, siga esta ordem:

1. Validar o hub de Educacao.
2. Validar o hub de Saude.
3. Validar a Base Operacional.
4. Executar o roteiro completo de Educacao.
5. Executar o roteiro completo de Saude.

## Hubs principais do Core

### Educacao

Abrir `http://localhost:8000/pt_BR/admin/education` e confirmar os cards:

- `Alunos`
- `Responsaveis`
- `Matriculas`
- `Escolas`
- `Turmas`
- `Turnos`
- `Calendario letivo`
- `Linhas escolares`
- `Paradas escolares`
- `Vinculos de transporte`
- `Solicitacoes`

### Saude

Abrir `http://localhost:8000/pt_BR/admin/health` e confirmar os cards:

- `Pacientes`
- `Profissionais de saude`
- `Unidades de saude`
- `Agendamentos`
- `Transporte sanitario`

### Base Operacional

Abrir `http://localhost:8000/pt_BR/admin/base-operacional` e validar os cadastros compartilhados de apoio operacional.

## Como testar cada tela

Em qualquer tela de cadastro, sempre validar:

1. titulo da pagina;
2. botao de novo registro;
3. filtro textual;
4. ordenacao da grade;
5. paginacao;
6. abertura do formulario de inclusao;
7. salvamento do registro;
8. edicao do registro;
9. inativacao quando aplicavel.

## Roteiro funcional de Educacao

Use [cenarios-teste/educacao-core-edge.md](cenarios-teste/educacao-core-edge.md) para executar:

1. cadastro de turnos, escolas, turmas e calendario;
2. cadastro de responsaveis, alunos e matriculas;
3. linhas, paradas, vinculos e solicitacoes;
4. validacao visual e funcional ponta a ponta.

## Roteiro funcional de Saude

Use [cenarios-teste/saude-e-modulos.md](cenarios-teste/saude-e-modulos.md) para executar:

1. cadastro de unidades;
2. cadastro de profissionais;
3. cadastro de pacientes;
4. agendamentos;
5. transporte sanitario;
6. validacao visual e funcional ponta a ponta.

## Registro de evidencias

Ao final de cada execucao, registrar:

1. data e hora do teste;
2. usuario utilizado;
3. telas visitadas;
4. resultado esperado e resultado obtido;
5. prints ou observacoes em caso de falha.

Para padronizar esse registro, use a planilha Markdown em [matriz-teste-funcional.md](matriz-teste-funcional.md).

## Quando acionar o suporte tecnico

Acione o suporte quando houver:

1. falha de login sem troca recente de senha;
2. pagina em branco ou erro 500;
3. tela com lista vazia por falta de dependencia estrutural;
4. erro ao salvar ou editar registro;
5. ambiente indisponivel em `health`.

## Referencias

1. Indice geral: [manual-usuario.md](manual-usuario.md)
2. Cenario de Educacao: [cenarios-teste/educacao-core-edge.md](cenarios-teste/educacao-core-edge.md)
3. Cenario de Saude: [cenarios-teste/saude-e-modulos.md](cenarios-teste/saude-e-modulos.md)
4. Login e fluxo do gestor: [cenarios-teste/gestor-login-cadastros-rota.md](cenarios-teste/gestor-login-cadastros-rota.md)
5. Matriz de execucao: [matriz-teste-funcional.md](matriz-teste-funcional.md)