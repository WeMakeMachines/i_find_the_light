import type { Database } from "bun:sqlite";

import { groupReadingsByBeaconId } from "../transformers/readings";

import type { Beacon, Reading, ReadingsByBeaconId } from "../../../shared/types";

export type ReadingBeaconJoin = Beacon & Reading;

export function selectReadingsByBeaconId(db: Database, id: number): Reading[] {
  return db
    .prepare(
      "SELECT * FROM readings JOIN beacons ON readings.beacon_id = beacons.id WHERE beacon_id = ? ORDER BY id ASC;",
    )
    .all(id);
}

export function selectReadingsGroupByBeaconId(db: Database): ReadingsByBeaconId | null {
  const results = db.prepare("SELECT * FROM readings ORDER BY id ASC;").all();

  if (!results.length) return null;

  return groupReadingsByBeaconId(results);
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

export function migrateTimestamps(db: Database) {
  return db
    .prepare(
      `UPDATE readings
      SET timestamp = timestamp * 1000`,
    )
    .run();
}
