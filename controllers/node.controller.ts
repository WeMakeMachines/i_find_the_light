import { FastifyRequest } from "fastify";

import sqlite from "../services/database";
import { HandshakeBody, HandshakeReply, Reading, ReadingBody } from "../types";

class HandshakeError extends Error {}

export async function postHandshake(
  request: FastifyRequest<{ Body: HandshakeBody }>
): Promise<HandshakeReply> {
  const { name } = request.body;

  if (!name) throw new HandshakeError();

  const newNode = sqlite.insertNode(name);

  return {
    node_id: newNode.id,
    timestamp: Date.now(),
    poll_interval: Number(process.env.NODE_POLL_INTERVAL),
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

  return `Added ${addedReadings} to database`;
}

export async function getReadings(): Promise<Reading[]> {
  const results = sqlite.getReadings();

  return results;
}