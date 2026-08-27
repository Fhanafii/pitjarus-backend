![Node](https://img.shields.io/badge/Node.js-22-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Express](https://img.shields.io/badge/Express-5-black)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED)
![Swagger](https://img.shields.io/badge/OpenAPI-3.0-85EA2D)
![License](https://img.shields.io/badge/License-MIT-yellow)

# MerchGo Backend

MerchGo Backend adalah API server Express yang disiapkan untuk aplikasi backend dengan lapisan konfigurasi, middleware, routing, dan modul bisnis terpisah. Dokumentasi ini dirancang untuk membantu pengembang memahami struktur proyek, menjalankan lingkungan lokal, dan menggunakan perintah penting.

Project ini merupakan implementasi backend yang mendukung proses:

- Authentication (JWT)
- Store Management
- Product Management
- Store Product Management
- Attendance Report
- Product Availability Report
- Promo Report
- Swagger API Documentation
- Docker Deployment
- CI/CD Ready

---

# Tech Stack

- Node.js 22
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Zod Validation
- Swagger (OpenAPI 3)
- Docker
- Docker Compose
- GitHub Actions (Coming Soon)

---

# API Documentation

Swagger Documentation dapat diakses melalui:

### Development

```
http://localhost:3000/docs
```

### Production

```
https://dev-api.fhanafii.my.id
```

OpenAPI JSON

```
https://dev-api.fhanafii.my.id/openapi.json
```

---

# Features

## Authentication

- Login
- JWT Authentication
- Password Hashing (bcrypt)

## Store

- Create Store
- List Store
- Detail Store
- Update Store
- Delete Store
- Assign Product to Store
- Remove Product from Store
- Store Product List

## Product

- Create Product
- List Product
- Detail Product
- Update Product
- Delete Product

## Attendance Report

- Check In
- Check Out
- GPS
- Timestamp
- Selfie Photo

## Product Report

- Product Availability

## Promo Report

- Store Promotion
- Update Store Price
- Update Promo Price

---

# Repository Structure

```
pitjarus-backend/

├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│
│   ├── common/
│   │    ├── pagination/
│   │    └── response/
│   │
│   ├── config/
│   │    ├── env.ts
│   │    └── prisma.ts
│   │
│   ├── docs/
│   │    ├── swagger.ts
│   │    └── swaggerOptions.ts
│   │
│   ├── exceptions/
│   │
│   ├── middleware/
│   │
│   ├── modules/
│   │
│   │    ├── auth/
│   │    ├── stores/
│   │    ├── products/
│   │    └── reports/
│   │          ├── attendance/
│   │          ├── product/
│   │          └── promo/
│   │
│   ├── routes/
│   │
│   ├── services/
│   │    ├── jwt.service.ts
│   │    └── password.service.ts
│   │
│   ├── utils/
│   │
│   ├── app.ts
│   └── server.ts
│
├── uploads/
│
├── Dockerfile
├── docker-compose.yml
│
├── package.json
└── README.md
```

---

# Database

Database menggunakan **PostgreSQL** dengan ORM **Prisma**.

Model yang digunakan:

- User
- Store
- Product
- StoreProduct
- AttendanceReport
- ProductReport
- ProductReportItem
- PromoReport
- PromoReportItem

---

# Installation

Clone repository

```bash
git clone https://github.com/Fhanafii/pitjarus-backend.git
```

Masuk ke project

```bash
cd pitjarus-backend
```

Install dependency

```bash
npm install
```

Generate Prisma Client

```bash
npx prisma generate
```

Migration Database

```bash
npx prisma migrate dev
```

Jalankan server

```bash
npm run dev
```

---

# Environment

Contoh file `.env`

```env
PORT=3000

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/pitjarus_db?schema=public"

JWT_SECRET=supersecretkey

JWT_EXPIRES_IN=24h

API_BASE_URL=http://localhost:3000
```

---

# Docker

Build

```bash
docker compose build
```

Run

```bash
docker compose up -d
```

Stop

```bash
docker compose down
```

---

# Available Scripts

| Command | Description |
|----------|-------------|
| npm run dev | Development Mode |
| npm run build | Compile TypeScript |
| npm start | Production Mode |
| npm run typecheck | TypeScript Checking |
| npm run prisma:generate | Generate Prisma Client |
| npm run prisma:migrate | Run Migration |
| npm run prisma:studio | Open Prisma Studio |

---

# API Modules

| Module | Endpoint |
|---------|----------|
| Authentication | `/v1/login` |
| Stores | `/v1/stores` |
| Products | `/v1/products` |
| Store Products | `/v1/stores/:id/products` |
| Attendance | `/v1/report/attendance` |
| Product Report | `/v1/report/product` |
| Promo Report | `/v1/report/promo` |

---

# Security

- JWT Authentication
- Password Hashing (bcrypt)
- Helmet
- CORS
- Compression
- Zod Validation
- Centralized Error Handler

---

# Tips Pengembangan
- Pastikan variabel environment terisi dengan benar sebelum menjalankan server.
- Jalankan `npm run typecheck` untuk memeriksa kesalahan tipe sebelum build.
- Gunakan `prisma studio` untuk melihat dan memverifikasi data database dengan cepat.

# Catatan
- Struktur proyek dipertahankan sesuai implementasi Express Application layer.
- Dokumentasi ini ditujukan agar lebih mudah dibaca di GitHub dan memudahkan developer baru memahami alur.

# Author

**Fahmi Hanafi**

GitHub

https://github.com/Fhanafii

Portfolio

https://fhanafii.my.id

---
