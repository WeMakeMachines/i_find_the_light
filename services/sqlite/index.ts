import sqlite, { type Database } from "better-sqlite3";

import { createTableBeacons } from "./schema/beacons";
import { createTableReadings } from "./schema/readings";

let singleton: Database | undefined = undefined;

function db(): Database {
  if (!singleton) {
    if (!process.env.DATABASE_FILENAME) {
      throw new Error("Missing DATABASE_FILENAME in .env file");
    }

    singleton = sqlite(process.env.DATABASE_FILENAME);
    createTableBeacons(singleton);
    createTableReadings(singleton);
  }
  return singleton;
}

export default db();
