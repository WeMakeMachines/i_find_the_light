import { Database } from "bun:sqlite";
import { Reading } from "../types";

class SQLiteDbInsertError extends Error { };

class SQLiteDb {
  private db: Database;

  constructor(name: string = "mydb.sqlite") {
    this.db = new Database(name, { strict: true, create: true });

    const sql = `
        CREATE TABLE IF NOT EXISTS beacons (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS readings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            beacon_id INTEGER NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            lux INTEGER NOT NULL,
            temperature DECIMAL NOT NULL,
            unit INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (beacon_id) REFERENCES beacons (id) ON DELETE CASCADE
        );
      `;

    this.db.exec(sql);
  }

  insertBeacon(name: string) {
    try {
      const newBeacon = this.db
        .query("INSERT INTO beacons (name) VALUES (?) RETURNING *;")
        .get(name);

      return newBeacon;
    } catch (error) {
      throw new SQLiteDbInsertError(error);
    }
  }

  insertReading(reading: Reading) {
    const { beacon_id, lux, temperature, timestamp, unit } = reading;

    try {
      const newReading = this.db
        .query(
          "INSERT INTO readings (beacon_id, lux, temperature, timestamp, unit) VALUES (?, ?, ?, ? ,?) RETURNING *;"
        )
        .get(beacon_id, lux, temperature, timestamp, unit);

      return newReading;
    } catch (error) {
      throw new SQLiteDbInsertError(error);
    }
  }

  getBeacons() {
    const stmt = this.db.query("SELECT * FROM beacons;");
    const result = stmt.all();

    return result;
  }

  getReadings() {
    const stmt = this.db.query("SELECT * FROM readings;");
    const result = stmt.all();

    return result;
  }
}

export default new SQLiteDb();
