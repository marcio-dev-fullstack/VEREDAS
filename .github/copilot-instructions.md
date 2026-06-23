# VEREDAS Workspace Guidelines

## Workspace Model

- Treat `VEREDAS-Core`, `VEREDAS-Edge`, and `VEREDAS-PWA` as separate WSL Docker stacks.
- Use each stack's `Makefile` for routine operations before inventing ad-hoc commands.
- Use the root `Makefile` or `scripts/wsl-stacks.ps1` when a task spans multiple stacks.

## Architecture

- `VEREDAS-Core` is the central platform: Symfony API, Angular admin, PostgreSQL, Redis, MQTT, pgAdmin.
- `VEREDAS-Edge` is the embedded stack: Node local API, SQLite with WAL, MQTT.
- `VEREDAS-PWA` is the web PWA hub: independent Angular PWAs for aluno, motorista, monitor e paciente with Edge-first and Core-web fallback.
- Edge-to-Core sync must use the Core HTTP endpoint exposed by the Core stack.

## Build And Validation

- Validate focused slices first: `make status`, targeted service logs, narrow builds, then wider stack checks.
- Prefer WSL-native execution for Docker and `make` commands.
- Keep documentation synchronized whenever stack topology, ports, operational commands, or custom workflows change.

## Conventions

- Core main database is PostgreSQL in Docker.
- Edge embedded database is SQLite in the local API container.
- VEREDAS-PWA is maintained in its own repository (`https://github.com/sertaodigitalorg/VEREDAS-PWA.git`) and linked from the workspace.
- Keep shared operational knowledge in `.github/agents` and `.github/skills` so future work stays consistent.

## Shared Rules Governance

- Any rule, convention, or workflow that should apply to all developers must be added first to `.github/copilot-instructions.md`.
- Custom agents in `.github/agents` and skills in `.github/skills` must keep only their task-specific guidance and inherit common product rules from this shared file.
- When a new common rule is introduced, update the relevant agent or skill only if its description, workflow, or constraints must explicitly reflect that shared rule for discovery or execution.
- Avoid duplicating the same global rule in multiple files unless the repetition is necessary to prevent operational mistakes in a specialized workflow.
