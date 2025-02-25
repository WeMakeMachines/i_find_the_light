import { FastifyReply, FastifyRequest } from "fastify";

import sqlite from "../services/database";
import { HandshakeBody, HandshakeReply, Reading, ReadingBody } from "../types";

class HandshakeError extends Error {}

export async function postHandshake(
  request: FastifyRequest<{ Body: HandshakeBody }>,
  reply: FastifyReply
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
  request: FastifyRequest<{ Body: ReadingBody }>,
  reply: FastifyReply
): Promise<Reading> {
  const readings = request.body;

  if (Array.isArray(readings)) {
    readings.forEach((reading) => {
      sqlite.insertReading(reading);
    });
  } else {
    sqlite.insertReading(readings);
  }

  const results = sqlite.getReadings();

  console.log(results)

  return results;
}

export async function getReadings(_, reply: FastifyReply) {
  const results = sqlite.getReadings();

  return results;
}