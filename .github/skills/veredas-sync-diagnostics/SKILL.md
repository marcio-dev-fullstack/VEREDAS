---
name: veredas-sync-diagnostics
description: 'Diagnose VEREDAS Edge-Core synchronization issues. Use for outbox backlog, sync_event validation, local-api flush checks, Core endpoint checks, and operational troubleshooting in WSL Docker.'
user-invocable: true
argument-hint: 'Describe the symptom, for example: fila presa no edge, sync_event vazio no core, flush falhando, core nao recebe eventos'
---

# VEREDAS Sync Diagnostics

This skill inherits the common workspace standards from `.github/copilot-instructions.md` and adds only sync-diagnostics guidance.

## When To Use

- The Edge outbox is growing and events are not reaching the Core.
- Manual flush returns errors or incomplete responses.
- The Core sync endpoint is healthy but `sync_event` does not change.
- You need a repeatable checklist for cross-stack sync validation in WSL Docker.

## Standard Checks

1. Confirm both stacks are up with the existing Makefiles.
2. Check Edge health and queue metrics first.
3. Check Core health and recent `sync_event` persistence next.
4. Only then inspect logs for `local-api` and `api`.

## Procedure

1. In `VEREDAS-Edge`, run `make status` and inspect `local-api` health.
2. Query Edge endpoints `/api/v1/sync/stats`, `/api/v1/sync/queue`, and `/api/v1/telemetry/recent`.
3. Trigger a manual flush with `POST /api/v1/sync/flush` if the queue is pending.
4. In `VEREDAS-Core`, run `make sync-events` and confirm recent rows in `sync_event`.
5. If persistence still fails, compare Edge `CORE_SYNC_URL`, Core `/health`, and both stack logs.
6. Use the focused checklist in [sync checklist](./references/sync-checklist.md).

## Expected Outcome

- You identify whether the failure is in Edge queueing, Edge delivery, Core reachability, or Core persistence.
- You use the same triage path every time instead of jumping directly to broad logs.
