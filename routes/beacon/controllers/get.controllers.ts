import { FastifyRequest } from "fastify";

import { selectBeacons } from "../../../services/sqlite/queries/beacons";
import { selectReadings, selectReadingsByBeaconId } from "../../../services/sqlite/queries/readings";
import db from "../../../services/sqlite";

export const get = {
  beacons,
  readings,
};

async function beacons() {
  const beacons = selectBeacons(db);

  return beacons;
}

async function readings(request: FastifyRequest<{ Querystring: { beacon_id: string } }>) {
  let results = [];

  const id = Number(request.query.beacon_id);

  if (Number.isNaN(id)) {
    results = selectReadings(db);
  } else {
    results = selectReadingsByBeaconId(db, id);
  }

  return results;
}
