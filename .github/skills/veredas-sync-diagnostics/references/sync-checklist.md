# Sync Checklist

## Edge First

- Confirm `local-api` is healthy in `VEREDAS-Edge`.
- Check `GET /health` on the local API.
- Check `GET /api/v1/sync/stats` for queued, failed, and synced counters.
- Check `GET /api/v1/sync/queue` to see the oldest pending items.
- Check `GET /api/v1/telemetry/recent` for delivery failures.

## Force Delivery

- Trigger `POST /api/v1/sync/flush`.
- Re-read `GET /api/v1/sync/stats` and confirm pending counts change.
- If nothing changes, inspect the `local-api` logs and `CORE_SYNC_URL`.

## Core Confirmation

- Confirm `api` is healthy in `VEREDAS-Core`.
- Check `GET /health` on the Core API.
- Run `make sync-events` in `VEREDAS-Core`.
- If events arrive but duplicate, verify `event_id` reuse on the Edge side.
- If nothing arrives, inspect the Core `api` logs and host reachability from the Edge container.

## Decision Points

- Queue grows, flush fails: likely Edge delivery or network path.
- Flush succeeds, `sync_event` empty: likely Core endpoint or persistence issue.
- `sync_event` updates, UI stale: likely admin/API read path, not sync transport.