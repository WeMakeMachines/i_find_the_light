import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";
import path from "path";
import fs from "fs";

import { getPathToDatabaseFile } from "../../../services/sqlite";

export const get = {
  getDatabaseFile,
};

async function getDatabaseFile(request: FastifyRequest, reply: FastifyReply) {
  const databaseFilePath = getPathToDatabaseFile();
  const dbPath = path.resolve(databaseFilePath.path);

  if (!fs.existsSync(dbPath)) {
    reply.code(StatusCodes.NOT_FOUND).send("Could not find database file");
    return;
  }

  return reply
    .header("Content-Disposition", `attachment; filename="${databaseFilePath.filename}"`)
    .send(fs.createReadStream(dbPath));
}
