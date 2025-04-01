import db from "./services/sqlite";

declare global {
  namespace Vike {
    interface PageContext {
      db: ReturnType<typeof db>;
    }
  }
}

export {};
