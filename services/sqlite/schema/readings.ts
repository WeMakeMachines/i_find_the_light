import type { Database } from "bun:sqlite";

export function createTableReadings(db: Database) {
  db.exec(`
        CREATE TABLE IF NOT EXISTS readings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            survey_id INTEGER NOT NULL,
            beacon_id INTEGER NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            lux INTEGER NOT NULL,
            temperature DECIMAL NOT NULL,
            unit INTEGER NOT NULL,
            FOREIGN KEY (survey_id) REFERENCES surveys (id) ON DELETE CASCADE,
            FOREIGN KEY (beacon_id) REFERENCES beacons (id) ON DELETE CASCADE
        );
    `);
}
