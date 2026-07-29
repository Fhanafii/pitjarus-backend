# pitjarus-backend

## Stuktur Project
pitjarus-backend/

├── prisma/
│
├── src/
│   ├── config/
│   ├── middleware/
│   ├── modules/
│   │    ├── auth/
│   │    ├── users/
│   │    ├── stores/
│   │    ├── products/
│   │    └── reports/
│   │
│   ├── routes/
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

## Express Application layer struktur
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