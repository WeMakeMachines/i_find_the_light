import { Database } from "bun:sqlite";
import { beforeEach, describe, expect, test } from "bun:test";

import type { Reading } from "../../types/sqlite";
import type { CreateReadingInput } from "../../types/types";

import { createDbSchemas } from "../";
import { makeSurveyReadingsQueries } from "./surveyReadings";

const mockValidReading: CreateReadingInput = {
  surveyId: 3,
  beaconId: 1,
  readingTimestamp: 17800804431,
  lux: 2001,
  temperature: 23,
};

let db: Database;
let queries: any;

beforeEach(() => {
  db = new Database(":memory:");
  createDbSchemas(db);
  seedData(db);
  queries = makeSurveyReadingsQueries(db);
});

function seedData(db: Database) {
  db.prepare(
    `
    INSERT INTO surveyReadings (surveyId, beaconId, readingTimestamp, serverTimestamp, lux, temperature)
    VALUES (?, ?, ?, ?, ?, ?)
    `,
  ).run(1, 1, 17808328152, 17808328152, 200, 23);

  db.prepare(
    `
    INSERT INTO surveyReadings (surveyId, beaconId, readingTimestamp, serverTimestamp, lux, temperature)
    VALUES (?, ?, ?, ?, ?, ?)
    `,
  ).run(1, 1, 17808328252, 17808328252, 200, 23);

  db.prepare(
    `
    INSERT INTO surveyReadings (surveyId, beaconId, readingTimestamp, serverTimestamp, lux, temperature)
    VALUES (?, ?, ?, ?, ?, ?)
    `,
  ).run(1, 1, 17808328352, 17808328352, 210, 24);

  db.prepare(
    `
    INSERT INTO surveyReadings (surveyId, beaconId, readingTimestamp, serverTimestamp, lux, temperature)
    VALUES (?, ?, ?, ?, ?, ?)
    `,
  ).run(1, 2, 17808328152, 17808328152, 220, 24);

  db.prepare(
    `
    INSERT INTO surveyReadings (surveyId, beaconId, readingTimestamp, serverTimestamp, lux, temperature)
    VALUES (?, ?, ?, ?, ?, ?)
    `,
  ).run(1, 2, 17808328252, 17808328252, 230, 25);

  db.prepare(
    `
    INSERT INTO surveyReadings (surveyId, beaconId, readingTimestamp, serverTimestamp, lux, temperature)
    VALUES (?, ?, ?, ?, ?, ?)
    `,
  ).run(2, 1, 17808328252, 17808328252, 230, 25);
}

describe("SELECT selectCountSurveyReadings", () => {
  test("should return 5 for surveyId 1", () => {
    const result = queries.selectCountSurveyReadings(1);

    expect(result).toBe(5);
  });
});

describe("SELECT selectSurveyBeaconReadings", () => {
  test("should return 3 rows for the surveyId 1 and beaconId 1", () => {
    const result = queries.selectSurveyBeaconReadings(1, 1) as Reading[];

    expect(result.length).toBe(3);
  });

  test("should return 2 rows for the surveyId 1 and beaconId 2", () => {
    const result = queries.selectSurveyBeaconReadings(1, 2) as Reading[];

    expect(result.length).toBe(2);
  });
});

describe("SELECT selectSurveyReadings", () => {
  test("should return 5 rows for the surveyId 1", () => {
    const result = queries.selectSurveyReadings(1) as Reading[];

    expect(result.length).toBe(5);
  });
});

describe("INSERT selectSurveyReadings", () => {
  test("should correctly insert a new reading", () => {
    const result = queries.insertReading(mockValidReading) as Reading;

    expect(result.surveyId).toBe(3);
    expect(result.beaconId).toBe(1);
    expect(result.readingTimestamp).toBe(17800804431);
    expect(result.lux).toBe(2001);
    expect(result.temperature).toBe(23);
  });
});

describe("DELETE deleteAllReadings", () => {
  test("should delete 6 rows", () => {
    const result = queries.deleteAllReadings();

    expect(result).toBe(6);
  });
});

describe("DELETE deleteSurveyReadings", () => {
  test("should delete 5 rows for surveyId 1", () => {
    const result = queries.deleteSurveyReadings(1);

    expect(result).toBe(5);
  });

  test("should delete 1 row for surveyId 2", () => {
    const result = queries.deleteSurveyReadings(2);

    expect(result).toBe(1);
  });
});
