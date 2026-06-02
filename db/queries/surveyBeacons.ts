import type { Beacon } from "../../shared/sqlite";

import db from "../";

export function selectSurveyBeacons(surveyId: number): Beacon[] {
  return db.prepare("SELECT * FROM beacons WHERE surveyId = ? ORDER BY id ASC;").all(surveyId) as Beacon[];
}

export function insertSurveyBeacon(beaconId: number, beaconName: string, deviceKey: string, surveyId: number): Beacon {
  return db
    .prepare(
      "INSERT INTO surveyBeacons (beaconId, beaconName, deviceKey, surveyId) VALUES ($beaconId, $beaconName, $deviceKey, $surveyId) RETURNING *;",
    )
    .get({ beaconId, beaconName, deviceKey, surveyId }) as Beacon;
}

export function truncateSurveyBeacons(surveyId: number) {
  const result = db.prepare("DELETE FROM surveyBeacons WHERE surveyId = ?").run(surveyId);

  return result.changes;
}

export function truncateAllBeacons() {
  const tx = db.transaction(() => {
    db.prepare("DELETE FROM surveyBeacons").run();
    db.prepare("DELETE FROM sqlite_sequence WHERE name = 'surveyBeacons'").run();
  });

  tx();
}
