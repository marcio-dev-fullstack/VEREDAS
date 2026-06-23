#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="/mnt/c/VEREDAS"
CORE_DIR="$ROOT_DIR/VEREDAS-Core"
EDGE_DIR="$ROOT_DIR/VEREDAS-Edge"
COMMAND="${1:-up}"

run_stack() {
  local name="$1"
  local dir="$2"

  echo
  echo "==> ${name}"
  cd "$dir"

  case "$COMMAND" in
    up)
      docker compose up -d --build
      ;;
    down)
      docker compose down
      ;;
    restart)
      docker compose down
      docker compose up -d --build
      ;;
    status)
      docker compose ps -a
      ;;
    logs)
      docker compose logs --tail=80
      ;;
    *)
      echo "Comando invalido: $COMMAND"
      echo "Uso: bash /mnt/c/VEREDAS/scripts/wsl-stacks.sh [up|down|restart|status|logs]"
      exit 1
      ;;
  esac
}

run_stack "VEREDAS Core" "$CORE_DIR"
run_stack "VEREDAS Edge" "$EDGE_DIR"