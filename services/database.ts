import { Database } from "bun:sqlite";
import { Reading } from "../types";

class SQLiteDbInsertError extends Error {};

class SQLiteDb {
  private db: Database;

  constructor(name: string = "mydb.sqlite") {
    this.db = new Database(name, { strict: true, create: true });

    const sql = `
        CREATE TABLE IF NOT EXISTS nodes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS readings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            node_id INTEGER NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            lux INTEGER NOT NULL,
            temperature DECIMAL NOT NULL,
            FOREIGN KEY (node_id) REFERENCES nodes (id) ON DELETE CASCADE
        );
      `;

    this.db.exec(sql);
  }

  insertNode(name: string) {
    try {
      const newNode = this.db
        .query("INSERT INTO nodes (name) VALUES (?) RETURNING *;")
        .get(name);

      return newNode;
    } catch (error) {
      throw new SQLiteDbInsertError(error);
    }
  }

  insertReading(reading: Reading) {
    const { node_id, lux, temperature } = reading;

    try {
      const newReading = this.db
        .query(
          "INSERT INTO readings (node_id, lux, temperature) VALUES (?, ? ,?) RETURNING *;"
        )
        .get(node_id, lux, temperature);

      return newReading;
    } catch (error) {
      throw new SQLiteDbInsertError(error);
    }
  }

  getNodes() {
    const stmt = this.db.query("SELECT * FROM nodes;");
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
