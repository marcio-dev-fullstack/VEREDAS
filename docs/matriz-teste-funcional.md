<!-- MÁRCIO RODRIGUES DE OLIVEIRA, DEV FULSTACK, (62) 99646-6033 -->

# Matriz de Teste Funcional do VEREDAS

## Objetivo

Padronizar a execucao dos testes funcionais do workspace em formato de planilha Markdown, com colunas fixas para passo, resultado esperado, evidencia e status.

## Como usar

1. Execute os testes na ordem das tabelas.
2. Preencha a coluna `Evidencia` com print, URL, protocolo, usuario ou observacao objetiva.
3. Preencha a coluna `Status` com `Pendente`, `Aprovado`, `Aprovado com ressalvas` ou `Falhou`.
4. Use os roteiros detalhados de Educacao e Saude como apoio quando um passo exigir mais contexto.

## Preparacao comum do ambiente

| ID     | Area         | Passo                                                                                                        | Resultado esperado                                                 | Evidencia | Status   |
| ------ | ------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ | --------- | -------- |
| GER-01 | Workspace    | Clonar o workspace com submodulos ou executar `git submodule update --init --recursive`.                     | Workspace completo disponivel com `VEREDAS-Core` e `VEREDAS-Edge`. |           | Pendente |
| GER-02 | Subida       | Executar `make up-all` na raiz `/mnt/c/VEREDAS`.                                                             | Core e Edge sobem sem erro fatal.                                  |           | Pendente |
| GER-03 | Health       | Validar `http://localhost:8000/health` e `http://localhost:9080/health`.                                     | Ambos os endpoints respondem corretamente.                         |           | Pendente |
| GER-04 | Login        | Abrir `http://localhost:8000/pt_BR/login`.                                                                   | Tela de login renderizada sem quebra visual.                       |           | Pendente |
| GER-05 | Usuario demo | Entrar com `jane_admin / kitten`.                                                                            | Login concluido com sessao autenticada no Core.                    |           | Pendente |
| GER-06 | Perfil       | Abrir `/pt_BR/profile/edit` e atualizar nome e email.                                                        | Perfil salvo com mensagem de sucesso.                              |           | Pendente |
| GER-07 | Senha        | Abrir `/pt_BR/profile/change-password` e trocar a senha padrao.                                              | Sessao encerrada apos salvar e novo login aceito com a nova senha. |           | Pendente |
| GER-08 | Navegacao    | Validar abertura dos hubs `/pt_BR/admin/education`, `/pt_BR/admin/health` e `/pt_BR/admin/base-operacional`. | Os tres hubs abrem sem erro 403, 404 ou 500.                       |           | Pendente |

## Matriz de Educacao

| ID     | Area                   | Passo                                                                                             | Resultado esperado                                                     | Evidencia | Status   |
| ------ | ---------------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | --------- | -------- |
| EDU-01 | Hub Educacao           | Abrir `/pt_BR/admin/education` e conferir os cards do modulo.                                     | Todos os cards previstos aparecem com titulo, descricao e CTA.         |           | Pendente |
| EDU-02 | Turnos                 | Abrir `/pt_BR/admin/education/turnos` e criar o turno `Manha`.                                    | Turno salvo e visivel na grade com filtros e ordenacao funcionando.    |           | Pendente |
| EDU-03 | Escolas                | Abrir `/pt_BR/admin/education/escolas` e criar `Escola Municipal Centro`.                         | Escola persistida com codigo INEP e rede exibidos corretamente.        |           | Pendente |
| EDU-04 | Turmas                 | Abrir `/pt_BR/admin/education/turmas` e criar a turma `6A` vinculada a escola e turno.            | Turma salva com dependencias preenchidas corretamente.                 |           | Pendente |
| EDU-05 | Calendario             | Abrir `/pt_BR/admin/education/calendario-letivo` e registrar um dia letivo.                       | Calendario salvo com ano letivo e tipo do dia corretos.                |           | Pendente |
| EDU-06 | Responsaveis           | Abrir `/pt_BR/admin/education/responsaveis` e criar `Maria da Silva`.                             | Responsavel salvo com telefone e parentesco disponiveis na grade.      |           | Pendente |
| EDU-07 | Alunos                 | Abrir `/pt_BR/admin/education/alunos` e criar `Joao da Silva`.                                    | Aluno salvo com escola, turma e turno vinculados.                      |           | Pendente |
| EDU-08 | Matriculas             | Abrir `/pt_BR/admin/education/matriculas` e criar uma matricula ativa para o ano atual.           | Matricula criada e listada com aluno, escola e status corretos.        |           | Pendente |
| EDU-09 | Linhas escolares       | Abrir `/pt_BR/admin/education/linhas-escolares` e criar `Linha 12 Centro`.                        | Linha escolar salva e disponivel para vinculos posteriores.            |           | Pendente |
| EDU-10 | Paradas escolares      | Abrir `/pt_BR/admin/education/paradas-escolares` e criar `Parada Praca Central`.                  | Parada salva com endereco e status `Ativa`.                            |           | Pendente |
| EDU-11 | Vinculos de transporte | Abrir `/pt_BR/admin/education/vinculos-transporte` e vincular aluno, responsavel, linha e parada. | Vinculo persistido com contexto completo da rota.                      |           | Pendente |
| EDU-12 | Solicitacoes           | Abrir `/pt_BR/admin/education/solicitacoes` e criar uma solicitacao `Em analise`.                 | Solicitacao criada, pesquisavel e editavel na grade.                   |           | Pendente |
| EDU-13 | Grade e filtros        | Em uma tela de Educacao, testar busca, ordenacao, paginacao e retorno para lista apos salvar.     | Grid permanece consistente durante navegacao e manutencao do cadastro. |           | Pendente |
| EDU-14 | Validacao visual       | Conferir `h1`, `h2`, filtros, tabela, sidebar e botao principal nas telas visitadas.              | Interface sem truncamento, quebra de layout ou acoes invisiveis.       |           | Pendente |

## Matriz de Saude

| ID     | Area                 | Passo                                                                                        | Resultado esperado                                                       | Evidencia | Status   |
| ------ | -------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | --------- | -------- |
| SAU-01 | Hub Saude            | Abrir `/pt_BR/admin/health` e conferir os cards do modulo.                                   | Todos os cards previstos aparecem com titulo, descricao e CTA.           |           | Pendente |
| SAU-02 | Unidades de saude    | Abrir `/pt_BR/admin/health/unidades-saude` e criar `UBS Centro`.                             | Unidade salva com CNES, tipo e gestor visiveis na grade.                 |           | Pendente |
| SAU-03 | Profissionais        | Abrir `/pt_BR/admin/health/profissionais-saude` e criar `Dra. Marina Nogueira`.              | Profissional salvo com especialidade e unidade vinculada.                |           | Pendente |
| SAU-04 | Pacientes            | Abrir `/pt_BR/admin/health/pacientes` e criar `Jose Pereira`.                                | Paciente salvo com documento, unidade de referencia e contato principal. |           | Pendente |
| SAU-05 | Agendamentos         | Abrir `/pt_BR/admin/health/agendamentos` e criar uma consulta para o paciente.               | Agendamento salvo com paciente, profissional, data e status corretos.    |           | Pendente |
| SAU-06 | Transporte sanitario | Abrir `/pt_BR/admin/health/transporte-sanitario` e criar o transporte de ida para a unidade. | Transporte salvo com origem, destino, prioridade e paciente vinculados.  |           | Pendente |
| SAU-07 | Grade e filtros      | Em uma tela de Saude, testar busca, ordenacao, paginacao e edicao.                           | Grid responde corretamente sem perda de contexto ou erro de manutencao.  |           | Pendente |
| SAU-08 | Validacao visual     | Conferir `h1`, `h2`, filtros, tabela, badges, sidebar e formulario nas telas visitadas.      | Interface sem quebra visual, badges legiveis e dependencias preenchidas. |           | Pendente |

## Encerramento da execucao

| ID     | Area          | Passo                                                                                     | Resultado esperado                                           | Evidencia | Status   |
| ------ | ------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------ | --------- | -------- |
| FIN-01 | Consolidacao  | Revisar todos os itens com status preenchido.                                             | Nenhuma linha fica sem resultado registrado.                 |           | Pendente |
| FIN-02 | Evidencias    | Anexar prints, URLs testadas e observacoes objetivas para falhas ou ressalvas.            | Execucao rastreavel e reaproveitavel para nova rodada de QA. |           | Pendente |
| FIN-03 | Proximo passo | Encaminhar os itens falhos para ajuste ou prosseguir para os testes integrados Core-Edge. | Handoff claro entre teste funcional e correcao tecnica.      |           | Pendente |

## Referencias de apoio

1. Educacao ponta a ponta: [cenarios-teste/educacao-core-edge.md](cenarios-teste/educacao-core-edge.md)
2. Saude ponta a ponta: [cenarios-teste/saude-e-modulos.md](cenarios-teste/saude-e-modulos.md)
3. Manual do operador funcional: [manual-operador-funcional.md](manual-operador-funcional.md)
4. Manual de suporte tecnico: [manual-suporte-tecnico.md](manual-suporte-tecnico.md)
