import { Database } from "bun:sqlite";
import { beforeEach, describe, expect, test } from "bun:test";

import type { Beacon } from "../../types/sqlite";

import { createDbSchemas } from "../";
import { makeSurveyBeaconsQueries } from "./surveyBeacons";

const mockValidBeacon: Beacon = {
  surveyId: 4,
  beaconId: 1,
  beaconName: "1",
  deviceKey: "111111",
};

let db: Database;
let queries: any;

beforeEach(() => {
  db = new Database(":memory:");
  createDbSchemas(db);
  seedData(db);
  queries = makeSurveyBeaconsQueries(db);
});

function seedData(db: Database) {
  db.prepare(
    `
    INSERT INTO surveyBeacons (surveyId, beaconId, beaconName, deviceKey)
    VALUES (?, ?, ?, ?)
    `,
  ).run(1, 1, "1", "111111");

  db.prepare(
    `
    INSERT INTO surveyBeacons (surveyId, beaconId, beaconName, deviceKey)
    VALUES (?, ?, ?, ?)
    `,
  ).run(1, 2, "2", "222222");

  db.prepare(
    `
    INSERT INTO surveyBeacons (surveyId, beaconId, beaconName, deviceKey)
    VALUES (?, ?, ?, ?)
    `,
  ).run(1, 3, "3", "333333");

  db.prepare(
    `
    INSERT INTO surveyBeacons (surveyId, beaconId, beaconName, deviceKey)
    VALUES (?, ?, ?, ?)
    `,
  ).run(2, 1, "1", "111111");

  db.prepare(
    `
    INSERT INTO surveyBeacons (surveyId, beaconId, beaconName, deviceKey)
    VALUES (?, ?, ?, ?)
    `,
  ).run(2, 2, "2", "222222");
}

describe("SELECT selectCountSurveyBeacons", () => {
  test("should return 3 for surveyId", () => {
    const result = queries.selectCountSurveyBeacons(1);

    expect(result).toBe(3);
  });
});

describe("SELECT selectSurveyBeacon", () => {
  test("should select a beacon based on survey Id and beacon Id (composite key)", () => {
    const result = queries.selectSurveyBeacon(1, 1) as Beacon;

    expect(result.surveyId).toBe(1);
    expect(result.beaconId).toBe(1);
  });
});

describe("SELECT all beacons by surveyId", () => {
  test("selectSurveyBeacons(1) should return the 3 rows", () => {
    const result = queries.selectSurveyBeacons(1) as Beacon[];

    expect(result.length).toBe(3);
  });
});

describe("INSERT new beacon", () => {
  test("insertSurveyBeacon() should create a new beacon", () => {
    const result = queries.insertSurveyBeacon(mockValidBeacon) as Beacon;

    expect(result.surveyId).toBe(4);
    expect(result.beaconId).toBe(1);
    expect(result.beaconName).toBe("1");
    expect(result.deviceKey).toBe("111111");
  });

  test("insertSurveyBeacon() should not allow a same beacon to be inserted twice on a survey", () => {
    queries.insertSurveyBeacon(mockValidBeacon) as Beacon;

    expect(() => queries.insertSurveyBeacon(mockValidBeacon)).toThrowError();
  });
});

describe("DELETE deleteAllBeacons", () => {
  test("should remove all beacons", () => {
    queries.deleteAllBeacons();
    const result = db.prepare("SELECT * FROM surveyBeacons").all() as Beacon[];

    expect(result.length).toBe(0);
  });
});

describe("DELETE deleteAllSurveyBeacons", () => {
  test("should remove all beacons from with a shared surveyId", () => {
    queries.deleteAllSurveyBeacons(2);
    const result = db.prepare("SELECT * FROM surveyBeacons WHERE surveyId = ?").all(2) as Beacon[];

    expect(result.length).toBe(0);
  });
});

describe("DELETE deleteAllBeacons", () => {
  test("should remove all beacons from table", () => {
    queries.deleteAllBeacons();
    const result = db.prepare("SELECT * FROM surveyBeacons").all() as Beacon[];

    expect(result.length).toBe(0);
  });
});

describe("DELETE deleteSurveyBeacon", () => {
  test("should remove an active beacon from the table", () => {
    const beaconId = 1;
    const surveyId = 3;

    queries.deleteSurveyBeacon(beaconId, surveyId);

    const result = db
      .prepare("SELECT * FROM surveyBeacons WHERE beaconId = $beaconId AND surveyId = $surveyId")
      .get(beaconId, surveyId) as Beacon | null;

    expect(result).toBe(null);
  });
});
