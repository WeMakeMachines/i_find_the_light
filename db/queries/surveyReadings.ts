import { Database } from "bun:sqlite";

import { groupReadingsByBeaconId } from "../transformers/readings";
import { timestampToS } from "../../utils/date";

import type { Reading, ReadingWithBeaconName, ReadingsByBeaconId } from "../../shared/sqlite";
import type { CreateReadingInput } from "../../shared/types";

export function makeSurveyReadingsQueries(db: Database) {
  return {
    selectSurveyReadingsByBeaconId(surveyId: number, beaconId: number): ReadingWithBeaconName[] {
      return db
        .prepare(
          `
      SELECT
        surveyReadings.id,
        surveyReadings.surveyId,
        surveyReadings.beaconId,
        surveyReadings.beaconTimestamp,
        surveyReadings.serverTimestamp,
        surveyReadings.lux,
        surveyReadings.temperature
      FROM surveyReadings
      WHERE surveyReadings.surveyId = $surveyId
        AND surveyReadings.beaconId = $beaconId
      ORDER BY surveyReadings.id ASC;
      `,
        )
        .all({ $surveyId: surveyId, $beaconId: beaconId }) as ReadingWithBeaconName[];
    },

    selectSurveyReadings(surveyId: number): ReadingWithBeaconName[] {
      return db
        .prepare(
          `
      SELECT
        surveyReadings.id,
        surveyReadings.surveyId,
        surveyReadings.beaconId,
        surveyReadings.beaconTimestamp,
        surveyReadings.serverTimestamp,
        surveyReadings.lux,
        surveyReadings.temperature,
        surveyBeacons.beaconName AS beaconName
      FROM surveyReadings
      LEFT JOIN surveyBeacons
        ON surveyReadings.surveyId = surveyBeacons.surveyId
       AND surveyReadings.beaconId = surveyBeacons.beaconId
      WHERE surveyReadings.surveyId = ?
      ORDER BY surveyReadings.id ASC;
    `,
        )
        .all(surveyId) as ReadingWithBeaconName[];
    },

    selectSurveyReadingsGroupByBeacon(surveyId: number): ReadingsByBeaconId | null {
      const results = this.selectSurveyReadings(surveyId);

      if (!results.length) return null;

      return groupReadingsByBeaconId(results);
    },

    insertReading(reading: CreateReadingInput): Reading {
      const { surveyId, beaconId, beaconTimestamp, lux, temperature } = reading;

      const serverTimestamp = timestampToS(Date.now());

      return db
        .prepare(
          "INSERT INTO surveyReadings (surveyId, beaconId, beaconTimestamp, serverTimestamp, lux, temperature) VALUES (?, ?, ?, ?, ?, ?) RETURNING *;",
        )
        .get(surveyId, beaconId, beaconTimestamp, serverTimestamp, lux, temperature) as Reading;
    },

    deleteAllReadings(): number {
      const tx = db.transaction(() => {
        const changes = db.prepare("DELETE FROM surveyReadings").run();
        db.prepare("DELETE FROM sqlite_sequence WHERE name = 'readings'").run();

        return changes;
      });

      return tx().changes;
    },

    deleteSurveyReadings(surveyId: number): number {
      const result = db.prepare("DELETE FROM surveyReadings WHERE surveyId = ?").run(surveyId);

      return result.changes;
    },
  };
}
