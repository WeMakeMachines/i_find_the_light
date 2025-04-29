import type { Database } from "bun:sqlite";

import type { SurveyParameters } from "../../../shared/types";

class SQLiteSurveyQueryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SQLiteSurveyQueryError";
  }
}

export function selectSurveys(db: Database) {
  try {
    return db.prepare("SELECT * FROM surveys ORDER BY id ASC;").all();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error trying to SELECT surveys";
    throw new SQLiteSurveyQueryError(message);
  }
}

export function selectSurveyBySurveyId(db: Database, id: number) {
  try {
    return db.prepare("SELECT * FROM surveys WHERE id = ?;").all(id);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error trying to SELECT surveys";
    throw new SQLiteSurveyQueryError(message);
  }
}

export function updateSurveyMakeActive(db: Database, id: number) {
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

export function insertSurvey(db: Database, params: SurveyParameters) {
  const { description, poll_interval_seconds, expected_beacons, unit } = params;

  console.log(params);

  return db
    .prepare(
      "INSERT INTO surveys (description, poll_interval_seconds, expected_beacons, unit) VALUES (?, ?, ?, ?) RETURNING *;",
    )
    .run(description, poll_interval_seconds, expected_beacons, unit);
}

export function deleteSurvey(db: Database, id: number): number {
  try {
    const result = db.prepare("DELETE FROM surveys WHERE id = ?;").run(id);

    return result.changes;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error trying to DELETE survey record";
    throw new SQLiteSurveyQueryError(message);
  }
}

export function truncateSurveys(db: Database) {
  try {
    db.prepare("DELETE FROM surveys;").run();
    db.prepare("DELETE FROM sqlite_sequence WHERE name = 'surveys';").run(); // reset auto-increment

    return;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error trying to DELETE survey table";
    throw new SQLiteSurveyQueryError(message);
  }
}
