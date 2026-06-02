import { groupReadingsByBeaconId } from "../transformers/readings";
import { timestampToS } from "../../utils/date";

import type { Reading, ReadingWithBeaconName } from "../../shared/sqlite";
import type { CreateReadingInput } from "../../shared/types";
import type { ReadingsByBeaconId } from "../../shared/sqlite";

import db from "../";

export function selectSurveyReadingsByBeaconId(surveyId: number, beaconId: number): ReadingWithBeaconName[] {
  return db
    .prepare(
      `
      SELECT
        readings.id,
        readings.surveyId,
        readings.beaconId,
        readings.beaconTimestamp,
        readings.serverTimestamp,
        readings.lux,
        readings.temperature,
        beacons.name AS beaconName
      FROM readings
      JOIN beacons ON readings.beaconId = beacons.id
      WHERE readings.beaconId = $beaconId
        AND readings.surveyId = $surveyId
      ORDER BY readings.id ASC;
    `,
    )
    .all({ beaconId, surveyId }) as ReadingWithBeaconName[];
}

export function selectSurveyReadings(surveyId: number): ReadingWithBeaconName[] {
  return db
    .prepare(
      `
      SELECT
        readings.id,
        readings.surveyId,
        readings.beaconId,
        readings.beaconTimestamp,
        readings.serverTimestamp,
        readings.lux,
        readings.temperature,
        beacons.name AS beaconName
      FROM readings
      JOIN beacons ON readings.beaconId = beacons.id
      WHERE readings.surveyId = ?
      ORDER BY readings.id ASC;
    `,
    )
    .all(surveyId) as ReadingWithBeaconName[];
}

export function selectSurveyReadingsGroupByBeacon(surveyId: number): ReadingsByBeaconId | null {
  const results = selectSurveyReadings(surveyId);

  if (!results.length) return null;

  return groupReadingsByBeaconId(results);
}

export function insertReading(reading: CreateReadingInput): Reading {
  const { surveyId, beaconId, beaconTimestamp, lux, temperature } = reading;

  const serverTimestamp = timestampToS(Date.now());

  return db
    .prepare(
      "INSERT INTO readings (surveyId, beaconId, beaconTimestamp, serverTimestamp, lux, temperature) VALUES (?, ?, ?, ?, ?, ?) RETURNING *;",
    )
    .get(surveyId, beaconId, beaconTimestamp, serverTimestamp, lux, temperature) as Reading;
}

export function truncateSurveyReadings(surveyId: number) {
  const result = db.prepare("DELETE FROM readings WHERE surveyId = ?").run(surveyId);

  return result.changes;
}

export function truncateAllReadings() {
  const tx = db.transaction(() => {
    db.prepare("DELETE FROM readings").run();
    db.prepare("DELETE FROM sqlite_sequence WHERE name = 'readings'").run();
  });

  tx();
}
