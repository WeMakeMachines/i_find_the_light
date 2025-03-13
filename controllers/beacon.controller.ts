import { FastifyRequest } from "fastify";

import sqlite from "../services/database";
import { HandshakeBody, HandshakeReply, Reading, ReadingBody } from "../types";

class HandshakeError extends Error {}

export async function postHandshake(
  request: FastifyRequest<{ Body: HandshakeBody }>
): Promise<HandshakeReply> {
  const { name } = request.body;

  if (!name) throw new HandshakeError();

  const newBeacon = sqlite.insertBeacon(name);

  return {
    beacon_id: newBeacon.id,
    timestamp: Date.now(),
    poll_interval: Number(process.env.BEACON_POLL_INTERVAL),
    schedule_start: Number(process.env.BEACON_SCHEDULE_START),
    schedule_end: Number(process.env.BEACON_SCHEDULE_END),
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

export async function getReadings(): Promise<Reading[]> {
  const results = sqlite.getReadings();

  return results;
}