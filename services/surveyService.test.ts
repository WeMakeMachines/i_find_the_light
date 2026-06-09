import { Database } from "bun:sqlite";
import { beforeEach, describe, expect, test } from "bun:test";

import { makeSurveysQueries } from "../db/queries/surveys";
import { createDbSchemas } from "../db";
import { makeSurveyService } from "./surveyService";
import { Survey, SurveyStatus } from "../types/sqlite";

let db: Database;
let surveysQueries: any;
let surveyService: any;

beforeEach(() => {
  db = new Database(":memory:");
  createDbSchemas(db);
  seedData(db);
  surveysQueries = makeSurveysQueries(db);
  surveyService = makeSurveyService(surveysQueries);
});

function seedData(db: Database) {
  // Add survey with "active" status
  db.prepare(
    `
    INSERT INTO surveys (id, startTimestamp, endTimestamp, pollIntervalSeconds, description, status)
    VALUES (?, ?, ?, ?, ?, ?)
    `,
  ).run(1, 1780080443018, 17800804431, 400, "Spring Survey", "active");

  // Add survey with "archived" status
  db.prepare(
    `
    INSERT INTO surveys (id, startTimestamp, endTimestamp, pollIntervalSeconds, description, status)
    VALUES (?, ?, ?, ?, ?, ?)
    `,
  ).run(2, 1780080443018, 17800804431, 400, "Summer Survey", "archived");

  // Add survey with "draft" status
  db.prepare(
    `
    INSERT INTO surveys (id, startTimestamp, endTimestamp, pollIntervalSeconds, description, status)
    VALUES (?, ?, ?, ?, ?, ?)
    `,
  ).run(3, 1780080443018, 17800804431, 400, "Autumn Survey", "draft");
}

describe("surveyService setSurveyActiveState", () => {
  test("setSurveyActiveState should set a draft survey to active and deactivate the current active survey", () => {
    const result = surveyService.setSurveyActiveState(3);
    const result2 = db.prepare("SELECT * FROM surveys WHERE id = 1").get() as Survey;

    expect(result.status).toBe(SurveyStatus.ACTIVE);
    expect(result2.status).toBe(SurveyStatus.DRAFT);
  });

  test("setSurveyActiveState should throw error when survey is already archived", () => {
    expect(() => {
      surveyService.setSurveyActiveState(2);
    }).toThrowError();
  });
});

describe("surveyService setSurveyArchiveState", () => {
  test("setSurveyArchiveState should set an active survey to archive", () => {
    const result = surveyService.setSurveyArchiveState(1);

    expect(result.status).toBe(SurveyStatus.ARCHIVED);
  });

  test("setSurveyArchiveState should set a draft survey to archive", () => {
    const result = surveyService.setSurveyArchiveState(3);

    expect(result.status).toBe(SurveyStatus.ARCHIVED);
  });

  test("setSurveyArchiveState should throw error when survey is already archived", () => {
    expect(() => {
      surveyService.setSurveyArchiveState(2);
    }).toThrowError();
  });
});

describe("surveyService setSurveyDraftState", () => {
  test("setSurveyDraftState should set an active survey to draft", () => {
    const result = surveyService.setSurveyDraftState(1);
    expect(result.status).toBe(SurveyStatus.DRAFT);
  });

  test("setSurveyDraftState should throw error when survey is already archived", () => {
    expect(() => {
      surveyService.setSurveyDraftState(2);
    }).toThrowError();
  });
});
