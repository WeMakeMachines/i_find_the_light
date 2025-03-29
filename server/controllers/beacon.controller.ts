import { FastifyRequest } from "fastify";

import db from "../../services/sqlite";
import { insertBeacon, selectBeacons } from "../../services/sqlite/queries/beacons";
import { Beacon, HandshakeBody, HandshakeReply, Reading, ReadingBody } from "../../types";

class HandshakeError extends Error {}

export async function postHandshake(request: FastifyRequest<{ Body: HandshakeBody }>): Promise<HandshakeReply> {
  const { name } = request.body;

  try {
    if (!name) throw new HandshakeError("Missing name");

    const newBeacon = insertBeacon(db, name);

    return {
      beacon_id: newBeacon.lastInsertRowid,
      rtc_calibration: Date.now() / 1000, // convert to seconds
      poll_interval_seconds: Number(process.env.BEACON_POLL_INTERVAL_SECONDS),
      schedule_start: Number(process.env.BEACON_SCHEDULE_START),
      schedule_end: Number(process.env.BEACON_SCHEDULE_END),
      unit: Number(process.env.UNIT),
    };
  } catch (error) {
    if (error instanceof HandshakeError) {
      console.log(error);
    }
  }
}

export async function getBeacons() {
  const beacons = selectBeacons(db);

  return beacons;
}
