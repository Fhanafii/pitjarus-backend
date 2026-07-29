# Pitjarus Backend

## Overview
Pitjarus Backend adalah API server Express yang disiapkan untuk aplikasi backend dengan lapisan konfigurasi, middleware, routing, dan modul bisnis terpisah. Dokumentasi ini dirancang untuk membantu pengembang memahami struktur proyek, menjalankan lingkungan lokal, dan menggunakan perintah penting.

## Repository Structure
```
pitjarus-backend/

├── prisma/
│
├── src/
│   ├── config/
│   ├── middleware/
│   ├── modules/
│   │    ├── auth/
│   │    ├── attendance/
│   │    ├── stores/
│   │    ├── products/
│   │    └── users/
│   │
│   ├── routes/
│   ├── services/
│   │    ├── password.service.ts
│   │    └── jwt.service.ts
│   ├── types/
│   ├── utils/
│   ├── app.ts
│   └── server.ts
│
├── uploads/
│
├── docker/
│
├── docs/
│
├── package.json
│
└── README.md
```

## Express Application Layer
```
src/
│
├── app.ts
├── server.ts
│
├── config/
│     prisma.ts
│     env.ts
│
├── middleware/
│     error.middleware.ts
│     notFound.middleware.ts
│
├── routes/
│     index.ts
│
├── modules/
│
│     auth/
│
│     attendance/
│
│     stores/
│
│     products/
│
│     reports/
│
├── utils/
│
└── types/
```

## Prerequisites
- Node.js 20+ atau versi terbaru yang kompatibel dengan dependensi
- npm
- Database yang mendukung konfigurasi Prisma (lihat `prisma/schema.prisma` untuk detail provider)

## Instalasi
1. Clone repository:
   ```bash
   git clone https://github.com/Fhanafii/pitjarus-backend.git
   cd pitjarus-backend
   ```
2. Install dependensi:
   ```bash
   npm install
   ```
3. Siapkan file lingkungan (`.env`) berdasarkan nilai di `src/config/env.ts`.

## Menjalankan Aplikasi
- Jalankan mode development:
  ```bash
  npm run dev
  ```
- Build aplikasi:
  ```bash
  npm run build
  ```
- Jalankan hasil build:
  ```bash
  npm start
  ```

## Skrip npm
| Skrip | Deskripsi |
|---|---|
| `npm run dev` | Menjalankan server dengan `tsx watch` pada `src/server.ts` |
| `npm run build` | Mengompilasi TypeScript ke folder `dist` |
| `npm start` | Menjalankan `dist/server.js` setelah build |
| `npm run typecheck` | Menjalankan pemeriksaan tipe TypeScript |
| `npm run prisma:generate` | Menghasilkan Prisma Client |
| `npm run prisma:migrate` | Menjalankan migrasi Prisma di environment development |
| `npm run prisma:studio` | Menjalankan Prisma Studio |

## Prisma
Folder `prisma/` berisi skema database dan migrasi.

- `schema.prisma` — definisi model dan provider database
- `migrations/` — riwayat migrasi database

### Perintah Prisma penting
```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:studio
```

## Arsitektur Utama
- `src/app.ts` — inisialisasi aplikasi Express, middleware, dan route
- `src/server.ts` — entry point yang memulai server
- `src/config/env.ts` — konfigurasi environment
- `src/config/prisma.ts` — konfigurasi dan client Prisma
- `src/middleware/` — middleware global seperti error handler dan not found handler
- `src/routes/index.ts` — titik penggabungan route utama
- `src/modules/` — modul fungsional untuk fitur seperti auth, users, stores, products, reports
- `src/utils/` — utilitas umum untuk aplikasi
- `src/types/` — tipe custom dan definisi TypeScript

## Tips Pengembangan
- Pastikan variabel environment terisi dengan benar sebelum menjalankan server.
- Jalankan `npm run typecheck` untuk memeriksa kesalahan tipe sebelum build.
- Gunakan `prisma studio` untuk melihat dan memverifikasi data database dengan cepat.

## Catatan
- Struktur proyek dipertahankan sesuai implementasi Express Application layer.
- Dokumentasi ini ditujukan agar lebih mudah dibaca di GitHub dan memudahkan developer baru memahami alur.
