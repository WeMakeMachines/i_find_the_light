import { FastifyRequest } from "fastify";

import sqlite from "../services/database";
import {
  Beacon,
  HandshakeBody,
  HandshakeReply,
  Reading,
  ReadingBody,
} from "../types";

class HandshakeError extends Error {}

export async function postHandshake(
  request: FastifyRequest<{ Body: HandshakeBody }>
): Promise<HandshakeReply> {
  const { name } = request.body;

  if (!name) throw new HandshakeError();

  const newBeacon = sqlite.insertBeacon(name);

  return {
    beacon_id: newBeacon.id,
    rtc_calibration: Date.now() / 1000, // convert to seconds
    poll_interval_seconds: Number(process.env.BEACON_POLL_INTERVAL_SECONDS),
    schedule_start: Number(process.env.BEACON_SCHEDULE_START),
    schedule_end: Number(process.env.BEACON_SCHEDULE_END),
    unit: Number(process.env.UNIT),
  };
}

export async function postReadings(
  request: FastifyRequest<{ Body: ReadingBody }>
): Promise<string> {
  const readings = request.body;
  let addedReadings = 0;

  if (Array.isArray(readings)) {
    readings.forEach((reading) => {
      sqlite.insertReading(reading);
    });
    addedReadings = readings.length;
  } else {
    sqlite.insertReading(readings);
    addedReadings = 1;
  }

  return `Added ${addedReadings} reading(s) to database`;
}

export async function getBeacons(): Promise<Beacon[]> {
  const beacons = sqlite.getBeacons();

  return beacons;
}

export async function getReadings(
  request: FastifyRequest<{ Querystring: { beacon_id: string } }>
): Promise<Reading[]> {
  let results = [];

  const id = Number(request.query.beacon_id);

  if (Number.isNaN(id)) {
    results = sqlite.getReadings();
  } else {
    results = sqlite.getReadingsByBeaconId(id);
  }

  return results;
}
