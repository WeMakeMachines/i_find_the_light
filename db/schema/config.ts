import type { Database } from "bun:sqlite";

export function createTableConfig(db: Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS config (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      serverMode TEXT NOT NULL
        CHECK (serverMode IN ('setup', 'read')),
      unit TEXT NOT NULL DEFAULT 'metric'
        CHECK (unit IN ('metric', 'imperial')
    );
  `);
}
