#!/bin/bash
# MÁRCIO RODRIGUES DE OLIVEIRA, DEV FULSTACK, (62) 99646-6033

# Script unificado para adicionar um cabeçalho padrão em arquivos do projeto.

# --- CONFIGURACAO ---
AUTHOR_LINE="MÁRCIO RODRIGUES DE OLIVEIRA" # Usado para verificar se o cabeçalho já existe
IGNORE_DIRS=("node_modules" ".git" "dist" "build" ".next") # Adicione aqui os diretórios a serem ignorados

# Verifica se o argumento foi passado
if [ -z "$1" ]; then
  echo "Erro: Nenhum tipo de arquivo especificado."
  echo "Uso: $0 [ts|md|css]"
  echo "  ts: para arquivos TypeScript (.ts, .tsx)"
  echo "  md: para arquivos Markdown (.md)"
  echo "  css: para arquivos CSS (.css)"
  exit 1
fi

FILE_TYPE=$1
HEADER_CONTENT=""
FIND_COMMAND=""

# --- Constrói a cláusula de exclusão para o comando find ---
PRUNE_PATHS=""
for dir in "${IGNORE_DIRS[@]}"; do
  if [ -z "$PRUNE_PATHS" ]; then
    PRUNE_PATHS="-name $dir"
  else
    PRUNE_PATHS="$PRUNE_PATHS -o -name $dir"
  fi
done
PRUNE_CLAUSE="-type d \( $PRUNE_PATHS \) -prune -o"

# Define o cabeçalho e o comando de busca com base no tipo de arquivo
case "$FILE_TYPE" in
  "ts")
    HEADER_CONTENT=$(printf "/*\n * MÁRCIO RODRIGUES DE OLIVEIRA, DEV FULSTACK, (62) 99646-6033\n */\n")
    # Procura nos pacotes específicos por arquivos .ts e .tsx
    FIND_COMMAND="find VEREDAS-Core VEREDAS-Edge VEREDAS-PWA $PRUNE_CLAUSE -type f \( -name '*.ts' -o -name '*.tsx' \) -print0"
    ;;
  "md")
    HEADER_CONTENT="<!-- MÁRCIO RODRIGUES DE OLIVEIRA, DEV FULSTACK, (62) 99646-6033 -->"
    # Procura em todo o projeto por arquivos .md
    FIND_COMMAND="find . $PRUNE_CLAUSE -type f -name '*.md' -print0"
    ;;
  "css")
    HEADER_CONTENT=$(printf "/*\n * MÁRCIO RODRIGUES DE OLIVEIRA, DEV FULSTACK, (62) 99646-6033\n */\n")
    # Procura nos pacotes específicos por arquivos .css
    FIND_COMMAND="find VEREDAS-Core VEREDAS-Edge VEREDAS-PWA $PRUNE_CLAUSE -type f -name '*.css' -print0"
    ;;
  *)
    echo "Erro: Tipo de arquivo inválido '$FILE_TYPE'."
    echo "Use 'ts', 'md' ou 'css'."
    exit 1
    ;;
esac

# Executa a busca e adiciona o cabeçalho
eval "$FIND_COMMAND" | while IFS= read -r -d $'\0' file; do
  if ! grep -qF "$AUTHOR_LINE" "$file"; then
    echo "Adicionando cabeçalho em: $file"
    (echo "$HEADER_CONTENT"; cat "$file") > "$file.tmp" && mv "$file.tmp" "$file"
  else
    echo "Cabeçalho já existe em: $file"
  fi
done

echo "Processo concluído."