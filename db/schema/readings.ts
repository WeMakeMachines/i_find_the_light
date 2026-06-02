import type { Database } from "bun:sqlite";

export function createTableReadings(db: Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS readings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        surveyId INTEGER NOT NULL,
        beaconId INTEGER NOT NULL,
        beaconTimestamp INTEGER,
        serverTimestamp INTEGER NOT NULL,
        lux INTEGER NOT NULL,
        temperature REAL NOT NULL,
        FOREIGN KEY (surveyId) REFERENCES surveys (id) ON DELETE CASCADE,
        FOREIGN KEY (beaconId) REFERENCES beacons (id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_readings_surveyId
      ON readings (surveyId);

    CREATE INDEX IF NOT EXISTS idx_readings_beaconId
      ON readings (beaconId);
`);
}
