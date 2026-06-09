import { Database } from "bun:sqlite";
import { mkdir } from "node:fs/promises";

import { createTableSurveyBeacons } from "./schemas/surveyBeacons";
import { createTableSurveyReadings } from "./schemas/surveyReadings";
import { createTableSurveys } from "./schemas/surveys";

let singleton: Database | undefined = undefined;

const folder = process.env.DATABASE_FOLDER || "./data";
const filename = process.env.DATABASE_FILENAME || "sqlite.db";

const pathToDatabaseFile = `${folder}/${filename}`;

async function db(): Promise<Database> {
  if (!singleton) {
    await mkdir(folder, { recursive: true });
    singleton = new Database(pathToDatabaseFile);
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
    path: pathToDatabaseFile,
    filename: filename,
  };
}

export default await db();
