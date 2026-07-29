# ==============================
# Base Image
# ==============================
FROM node:22-alpine AS base

WORKDIR /app

RUN apk add --no-cache openssl

# ==============================
# Install Dependencies
# ==============================
FROM base AS deps

COPY package*.json ./

RUN npm ci

# ==============================
# Build
# ==============================
FROM deps AS builder

COPY . .

RUN npx prisma generate

RUN npm run build

# ==============================
# Production Dependencies
# ==============================
FROM base AS production-deps

COPY package*.json ./

RUN npm ci --omit=dev

COPY prisma ./prisma

RUN npx prisma generate

# ==============================
# Runner
# ==============================
FROM base AS runner

ENV NODE_ENV=production

WORKDIR /app

COPY --from=production-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["node", "dist/server.js"]