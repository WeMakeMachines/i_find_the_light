import { Database } from "bun:sqlite";
import { mkdir } from "node:fs/promises";

import { createTableBeacons } from "./schema/beacons";
import { createTableReadings } from "./schema/readings";

let singleton: Database | undefined = undefined;

async function db(): Database {
  if (!singleton) {
    const file = process.env.DATABASE_FILENAME || "sqlite.db";
    const folder = "./database";

    await mkdir(folder, { recursive: true });
    singleton = new Database(`${folder}/${file}`);
    createTableBeacons(singleton);
    createTableReadings(singleton);
  }
  return singleton;
}

export default await db();
