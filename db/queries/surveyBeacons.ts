import type { Beacon } from "../../shared/sqlite";

import db from "../";

export function selectSurveyBeacons(surveyId: number): Beacon[] {
  return db.prepare("SELECT * FROM surveyBeacons WHERE surveyId = ? ORDER BY beaconId ASC;").all(surveyId) as Beacon[];
}

export function insertSurveyBeacon(beacon: Beacon): Beacon {
  const { beaconId, beaconName, deviceKey, surveyId } = beacon;

  return db
    .prepare(
      "INSERT INTO surveyBeacons (surveyId, beaconId, beaconName, deviceKey) VALUES ( $surveyId, $beaconId, $beaconName, $deviceKey) RETURNING *;",
    )
    .get({ $surveyId: surveyId, $beaconId: beaconId, $beaconName: beaconName, $deviceKey: deviceKey }) as Beacon;
}

export function deleteAllBeacons() {
  const tx = db.transaction(() => {
    db.prepare("DELETE FROM surveyBeacons").run();
    db.prepare("DELETE FROM sqlite_sequence WHERE name = 'surveyBeacons'").run();
  });

  tx();
}

export function deleteAllSurveyBeacons(surveyId: number) {
  const result = db.prepare("DELETE FROM surveyBeacons WHERE surveyId = ?").run(surveyId);

  return result.changes;
}

export function deleteSurveyBeacon(beaconId: number, surveyId: number) {
  const result = db
    .prepare("DELETE FROM surveyBeacons WHERE beaconId = $beaconId AND surveyId = $surveyId")
    .run({ beaconId, surveyId });

  return result.changes;
}
