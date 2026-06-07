import type { Database } from "bun:sqlite";

export function createTableSurveyReadings(db: Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS surveyReadings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        surveyId INTEGER NOT NULL,
        beaconId INTEGER NOT NULL,
        beaconTimestamp INTEGER,
        serverTimestamp INTEGER NOT NULL,
        lux INTEGER NOT NULL,
        temperature REAL NOT NULL,
        FOREIGN KEY (surveyId) REFERENCES surveys (id) ON DELETE CASCADE,
        FOREIGN KEY (beaconId) REFERENCES surveyBeacons (id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_surveyReadings_surveyId
      ON surveyReadings (surveyId);

    CREATE INDEX IF NOT EXISTS idx_surveyReadings_beaconId
      ON surveyReadings (beaconId);
`);
}
