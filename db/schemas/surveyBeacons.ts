import type { Database } from "bun:sqlite";

export function createTableSurveyBeacons(db: Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS surveyBeacons (
      surveyId INTEGER NOT NULL,
      beaconId INTEGER NOT NULL,
      beaconName TEXT NOT NULL,
      deviceKey TEXT NOT NULL,

      PRIMARY KEY (surveyId, beaconId),
      FOREIGN KEY (surveyId) REFERENCES surveys(surveyId)
      UNIQUE (surveyId, deviceKey)
    );
`);
}
