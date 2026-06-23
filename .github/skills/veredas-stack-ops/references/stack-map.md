# Stack Map

## VEREDAS Core

- path: `c:/VEREDAS/VEREDAS-Core`
- makefile: `c:/VEREDAS/VEREDAS-Core/Makefile`
- services: `api`, `admin`, `db`, `redis`, `mqtt`, `pgadmin`
- main ports: `8000`, `4200`, `55432`, `6379`, `1883`, `5050`

## VEREDAS Edge

- path: `c:/VEREDAS/VEREDAS-Edge`
- makefile: `c:/VEREDAS/VEREDAS-Edge/Makefile`
- services: `local-api`, `pwa-motorista`, `pwa-monitor`, `edge-admin`, `mqtt`
- main ports: `9080`, `4300`, `4301`, `4302`, `1884`

## Root Workspace

- path: `c:/VEREDAS`
- makefile: `c:/VEREDAS/Makefile`
- scripts: `c:/VEREDAS/scripts/wsl-stacks.ps1`, `/mnt/c/VEREDAS/scripts/wsl-stacks.sh`