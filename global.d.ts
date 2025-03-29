import { db as sqliteDb } from "./services/sqlite";

declare global {
  namespace Vike {
    interface PageContext {
      db: ReturnType<typeof sqliteDb>;
    }
  }
}

export {};
