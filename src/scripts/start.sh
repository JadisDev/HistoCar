#!/bin/sh
set -e

# echo "📌 Revertendo migrations para evitar inconsistências..."
# npm run migration:revert || echo "Nenhuma migration para reverter."

# echo "📌 Rodando migrations..."
# npm run migration:run

# echo "📌 Rodando seed..."
# npm run seed

echo "📌 Iniciando aplicação..."
exec npm run start
