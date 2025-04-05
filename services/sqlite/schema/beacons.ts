import type { Database } from "bun:sqlite";

export function createTableBeacons(db: Database) {
  db.exec(`
        CREATE TABLE IF NOT EXISTS beacons (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        );
    `);
}
