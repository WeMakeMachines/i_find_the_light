import db from "../";

import type { ServerMode } from "../../shared/types";

export function selectServerMode() {
  return db.prepare("SELECT value FROM server_mode WHERE key = 'mode'").all();
}

export function setConfig(mode: ServerMode) {
  return db.prepare(`
    INSERT INTO app_config (key, value)
      VALUES ('mode', ${mode})
      ON CONFLICT(key)
      DO UPDATE SET value = excluded.value;
    `);
}
