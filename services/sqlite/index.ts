import { Database } from "bun:sqlite";
import { mkdir } from "node:fs/promises";

import { createTableBeacons } from "./schema/beacons";
import { createTableReadings } from "./schema/readings";
import { createTableSurveys } from "./schema/surveys";

let singleton: Database | undefined = undefined;

const filename = process.env.DATABASE_FILENAME || "sqlite.db";
const folder = "./database";
const pathToDatabaseFile = `${folder}/${filename}`;

async function db(): Database {
  if (!singleton) {
    await mkdir(folder, { recursive: true });
    singleton = new Database(pathToDatabaseFile);
    createTableBeacons(singleton);
    createTableReadings(singleton);
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
