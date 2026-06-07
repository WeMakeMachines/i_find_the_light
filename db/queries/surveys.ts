import type { CreateSurveyInput } from "../../shared/types";
import type { Survey, SurveyStatus } from "../../shared/sqlite";

import db from "../";

class DbSurveyQueryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DbSurveyQueryError";
  }
}

class DbSurveyNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DbSurveyNotFoundError";
  }
}

export function selectSurvey(surveyId: number): Survey {
  try {
    return db.prepare("SELECT * FROM surveys WHERE id = ?;").get(surveyId) as Survey;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error trying to SELECT surveys";
    throw new DbSurveyQueryError(message);
  }
}

export function selectAllSurveys(): Survey[] {
  try {
    return db.prepare("SELECT * FROM surveys ORDER BY id ASC;").all() as Survey[];
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error trying to SELECT surveys";
    throw new DbSurveyQueryError(message);
  }
}

export function selectActiveSurvey() {
  try {
    return db.prepare("SELECT * FROM surveys WHERE status = 'active';").get();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error trying to SELECT a survey";
    throw new DbSurveyQueryError(message);
  }
}

export function updateSurveyStatus(surveyId: number, status: SurveyStatus): Survey {
  try {
    db.prepare(
      `
        UPDATE surveys
        SET status = ?
        WHERE id = ?
          AND status != 'archived';
      `,
    ).run(status, surveyId);

    const updatedSurvey = db.prepare("SELECT * FROM surveys WHERE id = ?;").get(surveyId);

    if (!updatedSurvey) {
      throw new DbSurveyNotFoundError(String(surveyId));
    }

    return updatedSurvey as Survey;
  } catch (error) {
    console.log(error);
    const message = error instanceof Error ? error.message : "Unknown error trying to UPDATE survey table";

    throw new DbSurveyQueryError(message);
  }
}

export function insertSurvey(survey: CreateSurveyInput) {
  try {
    const input: CreateSurveyInput = {
      ...survey,
    };

    if (typeof input.description !== "string") {
      delete input.description;
    }

    if (typeof input.pollIntervalSeconds !== "number") {
      delete input.pollIntervalSeconds;
    }

    const columns = Object.keys(input);
    const values = Object.values(input);

    const sql = `
    INSERT INTO surveys (${columns.join(", ")})
    VALUES (${values.map(() => "?").join(", ")})
    RETURNING *;
  `;

    return db.query(sql).get(...values);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error trying to UPDATE survey table";
    throw new DbSurveyQueryError(message);
  }
}

export function deleteAllSurveys(): number {
  try {
    const result = db.prepare("DELETE FROM surveys;").run();
    db.prepare("DELETE FROM sqlite_sequence WHERE name = 'surveys';").run(); // reset auto-increment

    return result.changes;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error trying to DELETE survey table";
    throw new DbSurveyQueryError(message);
  }
}

export function deleteSurvey(surveyId: number): number {
  try {
    const result = db.prepare("DELETE FROM surveys WHERE id = ?;").run(surveyId);

    return result.changes;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error trying to DELETE survey record";
    throw new DbSurveyQueryError(message);
  }
}
