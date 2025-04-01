import { FastifyRequest } from "fastify";

import { insertBeacon } from "../../../services/sqlite/queries/beacons";
import { insertReading } from "../../../services/sqlite/queries/readings";
import beaconConfig from "../../../config/beacon.config";
import db from "../../../services/sqlite";

import { RequestBodyWithHandshake, RequestBodyWithReading, ReplyBodyWithHandshake } from "../../../types/types";

class HandshakeError extends Error {}

export const post = {
  handshake,
  readings,
};

async function handshake(request: FastifyRequest<{ Body: RequestBodyWithHandshake }>): Promise<ReplyBodyWithHandshake> {
  const { name } = request.body;

  try {
    if (!name) throw new HandshakeError("Missing name");

    const newBeacon = insertBeacon(db, name);

    return {
      beacon_id: newBeacon.lastInsertRowid,
      rtc_calibration: Date.now() / 1000, // convert to seconds
      poll_interval_seconds: beaconConfig.pollIntervalSeconds,
      schedule_start: beaconConfig.scheduleStart,
      schedule_end: beaconConfig.scheduleEnd,
      unit: beaconConfig.unit,
    };
  } catch (error) {
    if (error instanceof HandshakeError) {
      console.log(error);
    }
  }
}

async function readings(request: FastifyRequest<{ Body: RequestBodyWithReading }>): Promise<string> {
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
