import { Database } from "bun:sqlite";
import { beforeEach, describe, expect, test } from "bun:test";

import { makeSurveysQueries } from "../db/queries/surveys";
import { createDbSchemas } from "../db";
import { makeSurveyService } from "./survey.service";
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

describe("surveyService updateSurvey()", () => {
  test("should not update an active survey", () => {
    expect(() => {
      surveyService.updateSurvey(1, {});
    }).toThrowError();
  });

  test("should not update an archived survey", () => {
    expect(() => {
      surveyService.updateSurvey(2, {});
    }).toThrowError();
  });

  test("should update a drafted survey", () => {
    const result = surveyService.updateSurvey(3, { startTimestamp: 1780080443019 });

    expect(result.startTimestamp).toBe(1780080443019);
  });
});

describe("surveyService createSurvey", () => {
  test("createSurvey should limit name and description to 30 characters and 300 characters respectively", () => {
    const result = surveyService.createSurvey({
      startTimestamp: 1780997084800,
      endTimestamp: 1780997084800,
      name: "test test test test test test test test test test test test test test test test test test test test test test test test",
      description:
        "test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test",
      pollIntervalSeconds: 900,
    });

    expect(result.name.length).toBe(30);
    expect(result.description.length).toBe(300);
  });
});

describe("surveyService setSurveyActiveState", () => {
  test("setSurveyActiveState should set a draft survey to active and archive the current active survey", () => {
    const result = surveyService.setSurveyActiveState(3);
    const result2 = db.prepare("SELECT * FROM surveys WHERE id = 1").get() as Survey;

    expect(result.status).toBe(SurveyStatus.ACTIVE);
    expect(result2.status).toBe(SurveyStatus.ARCHIVED);
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

  test("setSurveyArchiveState should throw error when survey is in draft state", () => {
    expect(() => {
      surveyService.setSurveyArchiveState(3);
    }).toThrowError();
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

describe("surveyService updateSurvey", () => {
  test("updateSurvey should not update missing fields", () => {
    const result = surveyService.updateSurvey(3, {
      startTimestamp: 1780997084800,
      endTimestamp: 1780997084800,
    });
    expect(result.description).toBe("Autumn Survey");
  });
});
