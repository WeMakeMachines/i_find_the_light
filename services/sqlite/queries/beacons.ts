import type { Database } from "better-sqlite3";

export function selectBeacons(db: Database) {
  return db.prepare("SELECT * FROM beacons;").all();
}

export function insertBeacon(db: Database, name: string) {
  return db.prepare("INSERT INTO beacons (name) VALUES (?) RETURNING *;").run(name);
}
