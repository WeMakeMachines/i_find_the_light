import type { Database } from "bun:sqlite";

export function createTableSurveys(db: Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS surveys (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT,
        poll_interval_seconds INTEGER NOT NULL DEFAULT 300,
        unit INTEGER NOT NULL DEFAULT 1,
        expected_beacons INTEGER,
        active BOOLEAN DEFAULT false CHECK (active IN (0, 1))
        );
    `);
  db.exec(`
    CREATE UNIQUE INDEX IF NOT EXISTS only_one_active_survey
    ON surveys (active)
    WHERE active = TRUE;
    `);
}
