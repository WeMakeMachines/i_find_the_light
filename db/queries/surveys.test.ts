import { Database } from "bun:sqlite";
import { beforeEach, describe, expect, test } from "bun:test";

import type { Survey } from "../../types/sqlite";
import { SurveyStatus } from "../../types/sqlite";
import type { CreateSurveyInput } from "../../types/types";

import { createDbSchemas } from "../";
import { makeSurveysQueries } from "./surveys";

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

let db: Database;
let queries: any;

beforeEach(() => {
  db = new Database(":memory:");
  createDbSchemas(db);
  seedData(db);
  queries = makeSurveysQueries(db);
});

function seedData(db: Database) {
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

describe("SELECT selectSurvey", () => {
  test("selectSurvey(1) should return the correct row", () => {
    const result = queries.selectSurvey(1) as Survey;

    expect(result.id).toBe(1);
  });
});

describe("SELECT selectAllSurveys", () => {
  test("should return all rows", () => {
    const result = queries.selectAllSurveys() as Survey[];

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(3);
  });
});

describe("SELECT selectActiveSurvey", () => {
  test("should return a survey with the status 'active'", () => {
    const result = queries.selectActiveSurvey() as Survey;

    expect(result.status).toBe("active");
  });

  test("should return null if no active survey is found", () => {
    db.exec("DELETE from surveys WHERE id = 2");
    const result = queries.selectActiveSurvey();

    expect(result).toBe(null);
  });
});

describe("SELECT checkSurveyIsNotArchived", () => {
  test("checkSurveyIsNotArchived(1) should return true (draft)", () => {
    const result = queries.checkSurveyIsNotArchived(1);

    expect(result).toBe(true);
  });

  test("checkSurveyIsNotArchived(2) should return true (active)", () => {
    const result = queries.checkSurveyIsNotArchived(2);

    expect(result).toBe(true);
  });

  test("checkSurveyIsNotArchived(3) should return false (archived)", () => {
    const result = queries.checkSurveyIsNotArchived(3);

    expect(result).toBe(false);
  });

  test("checkSurveyIsNotArchived(4) should return null (invalid id)", () => {
    const result = queries.checkSurveyIsNotArchived(4);

    expect(result).toBe(null);
  });
});

describe("UPDATE survey status should succeed", () => {
  test("when updateSurveyStatus changes the status of a row from draft to active", () => {
    const result = queries.updateSurveyStatus(1, SurveyStatus.ACTIVE);

    expect(result.status).toBe("active");
  });
});

describe("UPDATE survey status should fail", () => {
  test("when updateSurveyStatus changes the status of a row from archive to any other", () => {
    const result = queries.updateSurveyStatus(3, SurveyStatus.ACTIVE);

    expect(result.status).toBe("archived");
  });
});

describe("INSERT new survey using only required data", () => {
  test("new survey should return inserted data", () => {
    const result = queries.insertSurvey(mockValidSurveyPartial) as Survey;
    expect(result.description).toBe("");
    expect(result.status).toBe("draft");
    expect(result.pollIntervalSeconds).toBe(900);
  });
});

describe("INSERT new survey using all data", () => {
  test("new survey should return inserted data", () => {
    const result = queries.insertSurvey(mockValidSurveyFull) as Survey;
    expect(result.description).toBe("Summer survey");
    expect(result.status).toBe("draft");
    expect(result.pollIntervalSeconds).toBe(200);
  });
});

describe("DELETE deleteSurvey should delete 1 row", () => {
  test("when deleteSurvey is executed against an exisiting id", () => {
    const result = queries.deleteSurvey(3);

    expect(result).toBe(1);
  });
});

describe("DELETE deleteAllSurveys should delete all 3 rows", () => {
  test("when deleteAllSurveys is executed", () => {
    const result = queries.deleteAllSurveys();

    expect(result).toBe(3);
  });
});
