import { Database } from "bun:sqlite";
import { mkdir } from "node:fs/promises";
import path from "node:path";

import { createTableSurveyBeacons } from "./schemas/surveyBeacons";
import { createTableSurveyReadings } from "./schemas/surveyReadings";
import { createTableSurveys } from "./schemas/surveys";

let singleton: Database | undefined = undefined;

const folder = process.env.DATABASE_FOLDER || "data";
const filename = process.env.DATABASE_FILENAME || "sqlite.db";
const databasePath = path.join(process.cwd(), folder);

async function db(): Promise<Database> {
  if (!singleton) {
    await mkdir(databasePath, { recursive: true });
    singleton = new Database(path.join(databasePath, filename));
    createDbSchemas(singleton);
  }
  return singleton;
}

export function createDbSchemas(db: Database) {
  createTableSurveyBeacons(db);
  createTableSurveyReadings(db);
  createTableSurveys(db);
}

export function getPathToDatabaseFile() {
  return {
    path: databasePath,
    filename: filename,
  };
}

export default await db();
