#!/bin/sh

set -e

echo "==================================="
echo "Starting Pitjarus Backend..."
echo "==================================="

echo "Running Prisma Migration..."

npx prisma migrate deploy

echo "Starting Server..."

exec node dist/server.js