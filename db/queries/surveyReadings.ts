import { Database } from "bun:sqlite";

import { groupReadingsByBeaconId } from "../transformers/readings";

import type { Reading, ReadingWithBeaconName, ReadingsByBeaconId } from "../../types/sqlite";
import type { CreateReadingInput } from "../../types/types";

export function makeSurveyReadingsQueries(db: Database) {
  return {
    selectCountSurveyReadings(surveyId: number): number {
      const { count } = db
        .prepare(
          `
      SELECT COUNT(*) AS count
      FROM surveyReadings
      WHERE surveyId = ?;
    `,
        )
        .get(surveyId) as { count: number };

      return count;
    },

    selectSurveyBeaconReadings(surveyId: number, beaconId: number): ReadingWithBeaconName[] {
      return db
        .prepare(
          `
      SELECT
        surveyReadings.id,
        surveyReadings.surveyId,
        surveyReadings.beaconId,
        surveyReadings.readingTimestamp,
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
        surveyReadings.readingTimestamp,
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
      const { surveyId, beaconId, readingTimestamp, lux, temperature } = reading;

      const serverTimestamp = Date.now();

      return db
        .prepare(
          "INSERT INTO surveyReadings (surveyId, beaconId, readingTimestamp, serverTimestamp, lux, temperature) VALUES (?, ?, ?, ?, ?, ?) RETURNING *;",
        )
        .get(surveyId, beaconId, readingTimestamp, serverTimestamp, lux, temperature) as Reading;
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
