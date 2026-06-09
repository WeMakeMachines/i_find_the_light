import { Database } from "bun:sqlite";
import { beforeEach, describe, expect, test } from "bun:test";

import type { CreateBeaconInput } from "../types/types";

import { makeSurveyBeaconsQueries } from "../db/queries/surveyBeacons";
import { makeSurveysQueries } from "../db/queries/surveys";
import { createDbSchemas } from "../db";
import { makeBeaconService } from "./beaconService";

let db: Database;
let surveyBeaconsQueries: any;
let surveysQueries: any;
let beaconService: any;

beforeEach(() => {
  db = new Database(":memory:");
  createDbSchemas(db);
  seedData(db);
  surveyBeaconsQueries = makeSurveyBeaconsQueries(db);
  surveysQueries = makeSurveysQueries(db);
  beaconService = makeBeaconService(surveysQueries, surveyBeaconsQueries);
});

const mockValidBeacon1: CreateBeaconInput = {
  beaconName: "1",
  deviceKey: "111111",
};

const mockValidBeacon2: CreateBeaconInput = {
  beaconName: "2",
  deviceKey: "222222",
};

function seedData(db: Database) {
  // Add survey with "draft" status
  db.prepare(
    `
    INSERT INTO surveys (id, startTimestamp, endTimestamp, pollIntervalSeconds, description, status)
    VALUES (?, ?, ?, ?, ?, ?)
    `,
  ).run(1, 1780080443018, 17800804431, 400, "Winter Survey", "draft");

  db.prepare(
    `
      INSERT INTO surveyBeacons (surveyId, beaconId, beaconName, deviceKey)
      VALUES (?, ?, ?, ?)
      `,
  ).run(1, 1, "1", "111111");

  // Add survey with "archived" status
  db.prepare(
    `
    INSERT INTO surveys (id, startTimestamp, endTimestamp, pollIntervalSeconds, description, status)
    VALUES (?, ?, ?, ?, ?, ?)
    `,
  ).run(2, 1780080443018, 17800804431, 400, "Winter Survey", "archived");

  db.prepare(
    `
      INSERT INTO surveyBeacons (surveyId, beaconId, beaconName, deviceKey)
      VALUES (?, ?, ?, ?)
      `,
  ).run(2, 1, "1", "111111");
}

describe("beaconService createBeacon", () => {
  test("createBeacon should throw error when no active survey is found", () => {
    expect(() => {
      beaconService.createBeacon(mockValidBeacon1);
    }).toThrowError();
  });

  test("createBeacon should send config data to the beacon when an active survey is found, and should increment the beaconId", () => {
    db.exec(
      "INSERT INTO surveys (id, startTimestamp, endTimestamp, pollIntervalSeconds, status) VALUES (3, 1780080443018, 17800804431, 400, 'active')",
    );

    const result1 = beaconService.createBeacon(mockValidBeacon1);

    expect(result1.surveyId).toBe(3);
    expect(result1.beaconId).toBe(1);
    expect(result1.beaconName).toBe("1");

    const result2 = beaconService.createBeacon(mockValidBeacon2);

    expect(result2.surveyId).toBe(3);
    expect(result2.beaconId).toBe(2);
    expect(result2.beaconName).toBe("2");
  });
});

describe("beaconService deleteBeacon()", () => {
  test("deleteBeacon(1) should delete a beacon successfully", () => {
    const result = beaconService.deleteBeacon(1, 1);

    expect(result).toBe(1);
  });

  test("deleteBeacon(2) should throw an error", () => {
    expect(() => {
      beaconService.deleteBeacon(2, 1);
    }).toThrowError();
  });
});
