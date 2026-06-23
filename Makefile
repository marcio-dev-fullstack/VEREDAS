# MÁRCIO RODRIGUES DE OLIVEIRA, DEV FULSTACK, (62) 99646-6033

# Variaveis
PACKAGES = VEREDAS-Core VEREDAS-Edge VEREDAS-PWA
PACKAGES_REVERSED = VEREDAS-PWA VEREDAS-Edge VEREDAS-Core

.PHONY: all $(PACKAGES)
.PHONY: up-all down-all restart-all status-all logs-all
.PHONY: up-pwa down-pwa status-pwa logs-pwa

up-all:
	@for pkg in $(PACKAGES); do $(MAKE) -C $$pkg up-all; done

down-all:
	@for pkg in $(PACKAGES_REVERSED); do $(MAKE) -C $$pkg down-all; done

restart-all:
	$(MAKE) down-all
	$(MAKE) up-all

status-all:
	@for pkg in $(PACKAGES); do $(MAKE) -C $$pkg status; done

logs-all:
	@for pkg in $(PACKAGES); do $(MAKE) -C $$pkg logs; done

# Comandos especificos para PWA

up-pwa:
	$(MAKE) -C VEREDAS-PWA up-all

down-pwa:
	$(MAKE) -C VEREDAS-PWA down-all
status-pwa:
	$(MAKE) -C VEREDAS-PWA status

logs-pwa:
	$(MAKE) -C VEREDAS-PWA logs

# Atalhos para status de pacotes individuais
core:
	$(MAKE) -C VEREDAS-Core status

edge:
	$(MAKE) -C VEREDAS-Edge status

pwa:
	$(MAKE) -C VEREDAS-PWA status