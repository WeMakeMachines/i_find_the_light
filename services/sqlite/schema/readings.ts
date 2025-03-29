import type { Database } from "better-sqlite3";

export function createTableReadings(db: Database) {
  db.exec(`
        CREATE TABLE IF NOT EXISTS readings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            beacon_id INTEGER NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            lux INTEGER NOT NULL,
            temperature DECIMAL NOT NULL,
            unit INTEGER NOT NULL,
            FOREIGN KEY (beacon_id) REFERENCES beacons (id) ON DELETE CASCADE
        );
    `);
}
