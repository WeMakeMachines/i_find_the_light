import type { Database } from "better-sqlite3";
import { Reading } from "../../../types/types";

export function selectReadings(db: Database) {
  return db.prepare("SELECT * FROM readings;").all();
}

export function selectReadingsByBeaconId(db: Database, id: number) {
  return db.prepare(`SELECT * FROM readings WHERE beacon_id = ?;`).all(id);
}

export function insertReading(db: Database, reading: Reading) {
  const { beacon_id, lux, temperature, timestamp, unit } = reading;

  return db
    .prepare("INSERT INTO readings (beacon_id, lux, temperature, timestamp, unit) VALUES (?, ?, ?, ? ,?) RETURNING *;")
    .run(beacon_id, lux, temperature, timestamp, unit);
}

export function truncateReadings(db: Database) {
  db.prepare("DELETE FROM readings;").run();
  db.prepare("DELETE FROM sqlite_sequence WHERE name = 'readings';").run(); // reset auto-increment

  return;
}
