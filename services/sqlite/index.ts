import { Database } from "bun:sqlite";

import { createTableBeacons } from "./schema/beacons";
import { createTableReadings } from "./schema/readings";

let singleton: Database | undefined = undefined;

function db(): Database {
  if (!singleton) {
    if (!process.env.DATABASE_FILENAME) {
      throw new Error("Missing DATABASE_FILENAME in .env file");
    }

    singleton = new Database(process.env.DATABASE_FILENAME);
    createTableBeacons(singleton);
    createTableReadings(singleton);
  }
  return singleton;
}

export default db();
