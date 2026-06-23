#!/bin/bash
# MÁRCIO RODRIGUES DE OLIVEIRA, DEV FULSTACK, (62) 99646-6033

# Script para adicionar um cabeçalho padrão em todos os arquivos .md do projeto.

# Define o cabeçalho a ser inserido no formato de comentário Markdown.
HEADER_CONTENT="<!-- MÁRCIO RODRIGUES DE OLIVEIRA, DEV FULSTACK, (62) 99646-6033 -->"

# Encontra todos os arquivos .md a partir do diretório atual, ignorando pastas como node_modules e .git.
# O script deve ser executado da raiz do projeto.
find . -type d \( -name "node_modules" -o -name ".git" \) -prune -o -type f -name "*.md" -print0 | while IFS= read -r -d $'\0' file; do
  # Verifica se o cabeçalho já existe no arquivo para evitar duplicatas
  if ! grep -q "MÁRCIO RODRIGUES DE OLIVEIRA" "$file"; then
    echo "Adicionando cabeçalho em: $file"
    # Cria um arquivo temporário com o cabeçalho e o conteúdo original
    (echo "$HEADER_CONTENT"; echo; cat "$file") > "$file.tmp" && mv "$file.tmp" "$file"
  else
    echo "Cabeçalho já existe em: $file"
  fi
done

echo "Processo concluído."