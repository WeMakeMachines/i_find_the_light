import type { Database } from "bun:sqlite";

export function selectBeacons(db: Database) {
  return db.prepare("SELECT * FROM beacons;").all();
}

export function insertBeacon(db: Database, name: string) {
  return db.prepare("INSERT INTO beacons (name) VALUES (?) RETURNING *;").run(name);
}

export function truncateBeacons(db: Database) {
  db.prepare("DELETE FROM beacons;").run();
  db.prepare("DELETE FROM sqlite_sequence WHERE name = 'beacons';").run(); // reset auto-increment

  return;
}
