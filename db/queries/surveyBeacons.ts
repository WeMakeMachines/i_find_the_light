import { Database } from "bun:sqlite";

import type { Beacon } from "../../types/sqlite";

export function makeSurveyBeaconsQueries(db: Database) {
  return {
    selectCountSurveyBeacons(surveyId: number): number {
      const { count } = db
        .prepare(
          `
      SELECT COUNT(*) AS count
      FROM surveyBeacons
      WHERE surveyId = ?;
          `,
        )
        .get(surveyId) as { count: number };

      return count;
    },

    selectSurveyBeacon(surveyId: number, beaconId: number): Beacon {
      const result = db
        .prepare(
          `
      SELECT *
      FROM surveyBeacons
      WHERE surveyId = $surveyId AND beaconId = $beaconId
      LIMIT 1
          `,
        )
        .get({ $surveyId: surveyId, $beaconId: beaconId }) as Beacon;

      return result;
    },

    selectSurveyBeacons(surveyId: number): Beacon[] {
      return db
        .prepare("SELECT * FROM surveyBeacons WHERE surveyId = ? ORDER BY beaconId ASC;")
        .all(surveyId) as Beacon[];
    },

    insertSurveyBeacon(beacon: Beacon): Beacon {
      const { beaconId, beaconName, deviceKey, surveyId } = beacon;

      return db
        .prepare(
          "INSERT INTO surveyBeacons (surveyId, beaconId, beaconName, deviceKey) VALUES ( $surveyId, $beaconId, $beaconName, $deviceKey) RETURNING *;",
        )
        .get({ $surveyId: surveyId, $beaconId: beaconId, $beaconName: beaconName, $deviceKey: deviceKey }) as Beacon;
    },

    deleteAllBeacons() {
      const tx = db.transaction(() => {
        db.prepare("DELETE FROM surveyBeacons").run();
        db.prepare("DELETE FROM sqlite_sequence WHERE name = 'surveyBeacons'").run();
      });

      tx();
    },

    deleteAllSurveyBeacons(surveyId: number) {
      const result = db.prepare("DELETE FROM surveyBeacons WHERE surveyId = ?").run(surveyId);

      return result.changes;
    },

    deleteSurveyBeacon(surveyId: number, beaconId: number) {
      const result = db
        .prepare("DELETE FROM surveyBeacons WHERE beaconId = $beaconId AND surveyId = $surveyId")
        .run({ $beaconId: beaconId, $surveyId: surveyId });

      return result.changes;
    },
  };
}
