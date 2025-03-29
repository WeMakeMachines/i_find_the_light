import { FastifyRequest } from "fastify";

import db from "../../services/sqlite";
import { insertReading, selectReadings, selectReadingsByBeaconId } from "../../services/sqlite/queries/readings";
import { Reading, ReadingBody } from "../../types";

export async function getReadings(request: FastifyRequest<{ Querystring: { beacon_id: string } }>) {
  let results = [];

  const id = Number(request.query.beacon_id);

  if (Number.isNaN(id)) {
    results = selectReadings(db);
  } else {
    results = selectReadingsByBeaconId(db, id);
  }

  return results;
}

export async function postReadings(request: FastifyRequest<{ Body: ReadingBody }>): Promise<string> {
  const readings = request.body;
  let addedReadings = 0;

  if (Array.isArray(readings)) {
    readings.forEach((reading) => {
      insertReading(db, reading);
    });
    addedReadings = readings.length;
  } else {
    insertReading(db, readings);
    addedReadings = 1;
  }

  return `Added ${addedReadings} reading(s) to database`;
}
