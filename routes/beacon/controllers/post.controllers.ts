import { FastifyRequest } from "fastify";

import { insertBeacon } from "../../../services/sqlite/queries/beacons";
import { insertReading } from "../../../services/sqlite/queries/readings";
import beaconConfig from "../../../config/beacon.config";
import db from "../../../services/sqlite";

import { Reading } from "../../../shared/types";
import { RequestBodyWithHandshake, RequestBodyWithReading, ReplyBodyWithHandshake } from "../../../types/types";

class HandshakeError extends Error {}

export const post = {
  handshake,
  readings,
};

function transformTimestampToMs(reading: Reading): Reading {
  return { ...reading, timestamp: reading.timestamp * 1000 };
}

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
      // important to tranform timestamps to ms
      // since all beacons only work with unix timestamps in s
      const newReading = transformTimestampToMs(reading);
      insertReading(db, newReading);
    });
    addedReadings = readings.length;
  } else {
    const newReading = transformTimestampToMs(data);
    insertReading(db, newReading);
    addedReadings = 1;
  }

  return `Added ${addedReadings} reading(s) to database`;
}
