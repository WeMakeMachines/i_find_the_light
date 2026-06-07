import { Database } from "bun:sqlite";
import { mkdir } from "node:fs/promises";

import { createTableSurveyBeacons } from "./schema/surveyBeacons";
import { createTableSurveyReadings } from "./schema/surveyReadings";
import { createTableSurveys } from "./schema/surveys";

let singleton: Database | undefined = undefined;

const filename = process.env.DATABASE_FILENAME || "sqlite.db";
const folder = "./data";
const pathToDatabaseFile = `${folder}/${filename}`;

async function db(): Promise<Database> {
  if (!singleton) {
    await mkdir(folder, { recursive: true });
    singleton = new Database(pathToDatabaseFile);
    createTableSurveyBeacons(singleton);
    createTableSurveyReadings(singleton);
    createTableSurveys(singleton);
  }
  return singleton;
}

export function getPathToDatabaseFile() {
  return {
    path: pathToDatabaseFile,
    filename: filename,
  };
}

export default await db();
