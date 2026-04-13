# matchAI 🤝

An Omegle-style AI-powered matching platform built with a modular, scalable Node.js/TypeScript backend.

## Tech Stack

- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL (via Prisma ORM)
- **Auth**: JWT (HTTP-only cookies)
- **Validation**: Zod
- **Real-time**: Socket.io (coming soon)

## Project Structure

```
matchAI/
└── server/
    ├── prisma/             # Prisma schema & migrations
    ├── src/
    │   ├── controllers/    # Route controllers
    │   ├── middleware/     # Auth & validation middleware
    │   ├── models/         # Data models
    │   ├── routes/         # Express route definitions
    │   ├── services/       # Business logic (UserService, AuthService)
    │   ├── utils/          # Helper utilities
    │   ├── validations/    # Zod schemas
    │   └── index.ts        # App entry point
    ├── package.json
    ├── tsconfig.json
    └── prisma.config.ts
```

## Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL database (or a cloud-hosted instance)

### Installation

```bash
cd server
npm install
```

### Environment Variables

Create a `.env` file inside `server/` with the following:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB_NAME"
JWT_SECRET="your_jwt_secret"
PORT=3000
```

### Run in Development

```bash
cd server
npx ts-node src/index.ts
```

### Database Migrations

```bash
cd server
npx prisma migrate dev
```

## Features

- ✅ User registration & login (JWT + HTTP-only cookies)
- ✅ Protected routes with auth middleware
- ✅ Zod-based request validation
- ✅ Prisma ORM with PostgreSQL
- ✅ Modular OOD architecture (Services, Controllers, Routes)
- 🚧 Real-time matching via Socket.io (in progress)
- 🚧 AI-powered match suggestions (planned)

## License

MIT
