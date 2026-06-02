import type { CreateSurveyInput } from "../../shared/types";

import db from "../";

class SQLiteSurveyQueryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SQLiteSurveyQueryError";
  }
}

export function selectActiveSurvey() {
  try {
    return db.prepare("SELECT * FROM surveys WHERE active = TRUE;").get();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error trying to SELECT a survey";
    throw new SQLiteSurveyQueryError(message);
  }
}

export function selectSurveys() {
  try {
    return db.prepare("SELECT * FROM surveys ORDER BY id ASC;").all();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error trying to SELECT surveys";
    throw new SQLiteSurveyQueryError(message);
  }
}

export function selectSurveyBySurveyId(id: number) {
  try {
    return db.prepare("SELECT * FROM surveys WHERE id = ?;").all(id);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error trying to SELECT surveys";
    throw new SQLiteSurveyQueryError(message);
  }
}

export function updateSurveyMakeActive(id: number) {
  try {
    const deactivateAll = db.prepare("UPDATE surveys SET active = FALSE;");
    const activateOne = db.prepare("UPDATE surveys SET active = TRUE WHERE id = ?;");

    const activateSurveyById = db.transaction((id: number) => {
      deactivateAll.run();
      activateOne.run(id);
    });

    activateSurveyById(id);

    return;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error trying to UPDATE survey table";
    throw new SQLiteSurveyQueryError(message);
  }
}

export function insertSurvey(survey: CreateSurveyInput) {
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
}

export function deleteSurvey(id: number): number {
  try {
    const result = db.prepare("DELETE FROM surveys WHERE id = ?;").run(id);

    return result.changes;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error trying to DELETE survey record";
    throw new SQLiteSurveyQueryError(message);
  }
}

export function truncateSurveys() {
  try {
    db.prepare("DELETE FROM surveys;").run();
    db.prepare("DELETE FROM sqlite_sequence WHERE name = 'surveys';").run(); // reset auto-increment

    return;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error trying to DELETE survey table";
    throw new SQLiteSurveyQueryError(message);
  }
}
