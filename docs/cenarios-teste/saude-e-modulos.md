# Cenarios Integrados de Saude e Demais Modulos

## Objetivo

Executar um roteiro de teste ponta a ponta das telas de Saude, partindo de um ambiente zerado, subindo o sistema, alterando os usuarios padrao e validando os fluxos administrativos de unidades, profissionais, pacientes, agendamentos e transporte sanitario.

## Escopo

- subida inicial do workspace;
- login e troca das credenciais demo;
- validacao visual e funcional do hub de Saude;
- cadastros principais do modulo;
- validacao de filtros, ordenacao, paginacao, edicao e inativacao;
- preparacao do fluxo para operacao assistencial e articulacao com o Edge.

## Preparacao do ambiente

### Etapa 1. Subir o ambiente do zero

No WSL:

```bash
cd /mnt/c/VEREDAS
make up-all
```

### Etapa 2. Validar os endpoints principais

1. Core health: `http://localhost:8000/health`
2. Login do Core: `http://localhost:8000/pt_BR/login`
3. Edge health: `http://localhost:9080/health`

### Etapa 3. Endurecer os usuarios padrao

1. Entrar com `jane_admin / kitten`.
2. Atualizar perfil em `http://localhost:8000/pt_BR/profile/edit`.
3. Trocar senha em `http://localhost:8000/pt_BR/profile/change-password`.
4. Confirmar novo login.

## Massa de teste sugerida

- 1 unidade de saude: `UBS Centro`;
- 1 profissional: `Dra. Marina Nogueira`, especialidade `Clinica geral`;
- 1 paciente: `Jose Pereira`;
- 1 agendamento: consulta para a data do teste;
- 1 transporte sanitario: ida da residencia para a unidade.

## Cenario 1. Validacao visual do hub de Saude

### Passos

1. Abrir `http://localhost:8000/pt_BR/admin/health`.
2. Verificar os cards de `Pacientes`, `Profissionais de saude`, `Unidades de saude`, `Agendamentos` e `Transporte sanitario`.
3. Confirmar ausencia de quebra visual, truncamento ou CTA invisivel.

### Resultado esperado

- hub carregado corretamente;
- cards completos e navegaveis;
- descricao e titulo legiveis.

## Cenario 2. Cadastro de unidades de saude

### Passos

1. Abrir `http://localhost:8000/pt_BR/admin/health/unidades-saude`.
2. Criar `UBS Centro` com CNES, endereco, gestor e tipo `UBS`.
3. Validar retorno para a lista.
4. Testar filtro pelo nome da unidade.
5. Testar ordenacao por nome e ultima atualizacao.
6. Abrir a unidade em edicao e alterar algum campo nao critico.

### Resultado esperado

- unidade persistida com sucesso;
- listagem com grade, filtros e ordenacao funcionando;
- edicao retornando para a lista sem erro.

## Cenario 3. Cadastro de profissionais de saude

### Passos

1. Abrir `http://localhost:8000/pt_BR/admin/health/profissionais-saude`.
2. Criar `Dra. Marina Nogueira` com registro profissional, especialidade e vinculo com `UBS Centro`.
3. Informar escala de atendimento.
4. Salvar e retornar a lista.
5. Filtrar pelo nome do profissional ou especialidade.

### Resultado esperado

- profissional criado com unidade vinculada;
- a unidade aparece como dependencia valida no formulario;
- listagem permite localizar o profissional por busca textual.

## Cenario 4. Cadastro de pacientes

### Passos

1. Abrir `http://localhost:8000/pt_BR/admin/health/pacientes`.
2. Criar `Jose Pereira` com documento, data de nascimento, unidade de referencia e contato principal.
3. Confirmar retorno para a lista.
4. Revisar badge de status e colunas de contexto.
5. Testar paginacao e ordenacao quando houver mais de um registro.

### Resultado esperado

- paciente salvo corretamente;
- unidade de referencia exibida na grade;
- tela se comporta bem em pesquisa, ordenacao e navegacao paginada.

## Cenario 5. Agendamento assistencial

### Passos

1. Abrir `http://localhost:8000/pt_BR/admin/health/agendamentos`.
2. Criar um novo agendamento para `Jose Pereira` com `Dra. Marina Nogueira`.
3. Informar especialidade, data e hora, tipo `Consulta` e status `Agendado`.
4. Salvar e retornar para a lista.
5. Confirmar se paciente, profissional e status aparecem de forma coerente na grade.
6. Abrir o registro e editar o status para validar o ciclo de manutencao.

### Resultado esperado

- agendamento associado corretamente a paciente e profissional;
- grade exibe contexto clinico suficiente;
- edicao funciona sem perda do relacionamento.

## Cenario 6. Transporte sanitario

### Passos

1. Abrir `http://localhost:8000/pt_BR/admin/health/transporte-sanitario`.
2. Criar um transporte para `Jose Pereira` com origem residencial e destino `UBS Centro`.
3. Informar data, veiculo e prioridade.
4. Salvar e retornar para a listagem.
5. Testar filtro por paciente ou destino.
6. Validar se o registro pode ser aberto para edicao e, se necessario, inativado.

### Resultado esperado

- transporte salvo com vinculo ao paciente;
- listagem mostra origem, destino e prioridade;
- acoes de manutencao seguem disponiveis no ciclo do cadastro.

## Cenario 7. Checklist visual das telas de Saude

Validar em cada tela de Saude:

- `h1` e `h2` visiveis;
- CTA principal destacado;
- card de filtros alinhado;
- tabela com cabecalhos legiveis;
- badges de status com contraste suficiente;
- formulários sem campos quebrados;
- selects de dependencias preenchidos;
- sidebar sem corte de conteudo.

## Registro sugerido por tela

- aprovado: sem divergencia visual ou funcional relevante;
- aprovado com ressalvas: inconsistencias pequenas sem bloquear o fluxo;
- falhou: erro de layout, ausencia de elemento critico, regressao de formulario ou problema de persistencia.

## Saude integrada com execucao operacional

Depois da validacao administrativa das telas:

1. a central registra solicitacao recorrente ou eventual no Core;
2. o Core prioriza, agrupa e publica a viagem para o Edge;
3. o Edge executa coleta, chegada assistencial, espera e retorno;
4. o Core consolida horarios reais, no-show, reprogramacao e encerramento.

## Administracao, assistencia social, defesa civil e obras

1. A demanda nasce e e aprovada no Core.
2. O roteiro operacional segue para o Edge quando a execucao depende do no embarcado.
3. O Edge registra inicio, marcos operacionais, ocorrencias e encerramento.
4. O Core fecha a trilha auditavel e a evidencia territorial ou institucional.

## Onde aprofundar

1. Core: [VEREDAS-Core/docs/modulos/cenarios-reais-teste.md](https://github.com/sertaodigitalorg/VEREDAS-Core/blob/main/docs/modulos/cenarios-reais-teste.md)
2. Edge: [VEREDAS-Edge/docs/operacao/cenarios-reais-teste.md](https://github.com/sertaodigitalorg/VEREDAS-Edge/blob/main/docs/operacao/cenarios-reais-teste.md)
