import { truncateBeacons } from "../../../services/sqlite/queries/beacons";
import { truncateReadings } from "../../../services/sqlite/queries/readings";
import db from "../../../services/sqlite";

export const del = {
  beacons,
  readings,
};

async function beacons() {
  truncateBeacons(db);

  return;
}

async function readings() {
  truncateReadings(db);

  return;
}
