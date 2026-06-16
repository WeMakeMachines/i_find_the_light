import type { Database } from "bun:sqlite";

export function createTableSurveys(db: Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS surveys (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL DEFAULT 'Survey',
        startTimestamp INTEGER NOT NULL,
        endTimestamp INTEGER NOT NULL,
        description TEXT NOT NULL DEFAULT '',
        pollIntervalSeconds INTEGER NOT NULL DEFAULT 900
          CHECK (pollIntervalSeconds > 0),
        status TEXT NOT NULL DEFAULT 'draft'
          CHECK (status IN ('draft', 'active', 'archived'))
    );
  `);
}
