Criar migration: Rodar por dentro do docker

TS_NODE=true NODE_OPTIONS="-r ts-node/register" npx typeorm migration:generate src/database/migrations/CreateVehicleTable --pretty -d src/database/data-source.ts
