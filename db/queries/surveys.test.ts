import { beforeEach, describe, expect, test } from "bun:test";

import type { Survey } from "../../shared/sqlite";
import { SurveyStatus } from "../../shared/sqlite";
import type { CreateSurveyInput } from "../../shared/types";

import db from "../";

import {
  selectAllSurveys,
  selectSurvey,
  selectActiveSurvey,
  updateSurveyStatus,
  insertSurvey,
  deleteSurvey,
  deleteAllSurveys,
} from "./surveys";

const mockValidSurveyPartial: CreateSurveyInput = {
  startTimestamp: 1780080443018,
  endTimestamp: 17800804431,
};

const mockValidSurveyFull: CreateSurveyInput = {
  startTimestamp: 1780080443018,
  endTimestamp: 17800804431,
  pollIntervalSeconds: 200,
  description: "Summer survey",
};

beforeEach(() => {
  db.exec(`
    DELETE FROM surveys;
  `);
  seedData();
});

function seedData() {
  db.prepare(
    `
    INSERT INTO surveys (id, startTimestamp, endTimestamp, pollIntervalSeconds, description, status)
    VALUES (?, ?, ?, ?, ?, ?)
    `,
  ).run(1, 1780080443018, 17800804431, 400, "Winter Survey", "draft");

  db.prepare(
    `
    INSERT INTO surveys (id, startTimestamp, endTimestamp, pollIntervalSeconds, description, status)
    VALUES (?, ?, ?, ?, ?, ?)
    `,
  ).run(2, 1780080443018, 17800804431, 400, "Winter Survey 2", "active");

  db.prepare(
    `
    INSERT INTO surveys (id, startTimestamp, endTimestamp, pollIntervalSeconds, description, status)
    VALUES (?, ?, ?, ?, ?, ?)
    `,
  ).run(3, 1780080443018, 17800804431, 400, "Winter Survey 3", "archived");
}

describe("SELECT survey by id", () => {
  test("selectSurvey(1) should return the correct row", () => {
    const result = selectSurvey(1) as Survey;

    expect(result.id).toBe(1);
  });
});

describe("SELECT all surveys", () => {
  test("selectSurvey(1) should return the correct row", () => {
    const result = selectAllSurveys() as Survey[];

    expect(Array.isArray(result)).toBe(true);
  });
});

describe("SELECT active survey", () => {
  test("selectActiveSurvey should return the correct row", () => {
    const result = selectActiveSurvey() as Survey;

    expect(result.status).toBe("active");
  });
});

describe("UPDATE survey status should succeed", () => {
  test("when updateSurveyStatus changes the status of a row from draft to active", () => {
    const result = updateSurveyStatus(1, SurveyStatus.ACTIVE);

    expect(result.status).toBe("active");
  });
});

describe("UPDATE survey status should fail", () => {
  test("when updateSurveyStatus changes the status of a row from archive to any other", () => {
    const result = updateSurveyStatus(3, SurveyStatus.ACTIVE);

    expect(result.status).toBe("archived");
  });
});

describe("INSERT new survey using only required data", () => {
  const result = insertSurvey(mockValidSurveyPartial) as Survey;

  test("new survey should have an empty description", () => {
    expect(result.description).toBe("");
  });

  test("new survey should be set to draft", () => {
    expect(result.status).toBe("draft");
  });

  test("new survey should have pollIntervalSeconds set to 900", () => {
    expect(result.pollIntervalSeconds).toBe(900);
  });
});

describe("INSERT new survey using all data", () => {
  const result = insertSurvey(mockValidSurveyFull) as Survey;

  test("new survey should have the correct description", () => {
    expect(result.description).toBe("Summer survey");
  });

  test("new survey should be set to draft", () => {
    expect(result.status).toBe("draft");
  });

  test("new survey should have pollIntervalSeconds set to 200", () => {
    expect(result.pollIntervalSeconds).toBe(200);
  });
});

describe("DELETE deleteSurvey should delete 1 row", () => {
  test("when deleteSurvey is executed against an exisiting id", () => {
    const result = deleteSurvey(3);

    expect(result).toBe(1);
  });
});

describe("DELETE deleteAllSurveys should delete all 3 rows", () => {
  test("when deleteAllSurveys is executed", () => {
    const result = deleteAllSurveys();

    expect(result).toBe(3);
  });
});
