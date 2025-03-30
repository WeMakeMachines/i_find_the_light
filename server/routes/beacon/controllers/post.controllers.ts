import { FastifyRequest } from "fastify";

import { insertBeacon } from "../../../../services/sqlite/queries/beacons";
import { insertReading } from "../../../../services/sqlite/queries/readings";
import db from "../../../../services/sqlite";

import { HandshakeBody, HandshakeReply, ReadingBody } from "../../../../types";

class HandshakeError extends Error {}

export const post = {
  handshake,
  readings,
};

async function handshake(request: FastifyRequest<{ Body: HandshakeBody }>): Promise<HandshakeReply> {
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

async function readings(request: FastifyRequest<{ Body: ReadingBody }>): Promise<string> {
  const data = request.body;
  let addedReadings = 0;

  if (Array.isArray(data)) {
    data.forEach((reading) => {
      insertReading(db, reading);
    });
    addedReadings = readings.length;
  } else {
    insertReading(db, data);
    addedReadings = 1;
  }

  return `Added ${addedReadings} reading(s) to database`;
}
