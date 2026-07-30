#!/bin/sh

set -e

docker compose \
  --env-file .env.dev \
  -f docker-compose.dev.yml \
  up -d --build

docker compose \
  --env-file .env.dev \
  -f docker-compose.dev.yml \
  exec backend \
  npx prisma migrate deploy

docker compose \
  --env-file .env.dev \
  -f docker-compose.dev.yml \
  exec backend \
  npx prisma db seed
