import type { Database } from "bun:sqlite";

import type { Beacon, Reading } from "../../../shared/types";

export type ReadingBeaconJoin = Beacon & Reading;

export function selectReadings(db: Database): Reading[] {
  return db.prepare("SELECT * FROM readings;").all();
}

export function selectReadingsByBeaconId(db: Database, id: number): ReadingBeaconJoin[] {
  return db
    .prepare(`SELECT * FROM readings JOIN beacons ON readings.beacon_id = beacons.id WHERE beacon_id = ?;`)
    .all(id);
}

export function insertReading(db: Database, reading: Reading): Reading {
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
