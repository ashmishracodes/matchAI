# MatchAI Backend Tasks

- `[x]` **Phase 1: Project & Database Initialization**
  - `[x]` Create `server` directory and run `npm init -y`.
  - `[x]` Install dependencies (Express, Socket.io, TypeScript, Prisma, Gemini SDK, CORS, dotenv, etc.).
  - `[x]` Set up `tsconfig.json` and basic directory structure.
  - `[x]` Initialize Prisma and configure `schema.prisma` for PostgreSQL (`User` model only).
  - `[x]` Run Prisma migration to sync the database schema.

- `[x]` **Phase 2: Core Express API & Services**
  - `[x]` Setup Express server inside `src/index.ts` with error handling and middlewares.
  - `[x]` Implement `AuthService.ts` (JWT generation, password hashing).
  - `[x]` Implement `auth.routes.ts` and `auth.controller.ts` (Register/Login).
  - `[x]` Implement `UserService.ts` (Interest updating and Gemini API embedding generation).
  - `[x]` Implement `user.routes.ts` and `user.controller.ts`.

- `[ ]` **Phase 3: Real-Time Communication Foundation**
  - `[ ]` Implement `SocketManager.ts` (Singleton to bootstrap and manage `socket.io` instance).
  - `[ ]` Setup base connection and authentication inside socket middleware (extract user from JWT).
  - `[ ]` Implement `QueueManager.ts` (Manage the arrays/queues of users searching for matches).

- `[ ]` **Phase 4: Design Patterns & Matching Strategies**
  - `[ ]` Define `MatchingStrategy` interface.
  - `[ ]` Implement `RandomMatchingStrategy.ts` (Select any two waiting users).
  - `[ ]` Implement `AIMatchingStrategy.ts` (Compute Cosine Similarity between embeddings to pair users).

- `[ ]` **Phase 5: In-Memory Room Management**
  - `[ ]` Implement `RoomManager.ts` (In-memory singleton handling active rooms, users, and their chat arrays).
  - `[ ]` Implement `send-message` event that pushes the message into the memory array before broadcasting.

- `[ ]` **Phase 6: Reconnection & Reload Resilience**
  - `[ ]` Intercept socket connection events to check `User` database record for a `lastRoomId`.
  - `[ ]` Reconnect returning users to their active Room silently if the room still exists in `RoomManager`.
  - `[ ]` Send past message history array from memory upon successful socket reconnection.

- `[ ]` **Phase 7: Graceful Disconnect & Testing**
  - `[ ]` Differentiate between simple disconnection (reload) and intentional `quit-room`.
  - `[ ]` Create `quit-room` handler to delete the room from memory, set `lastRoomId` to null for both users, and notify stranger.
  - `[ ]` Write tests/scripts verifying E2E connections.
