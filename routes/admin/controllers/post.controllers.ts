import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";

import beaconConfig, { InvalidBeaconConfig } from "../../../config/beacon.config";
import { RequestBodyWithBeaconConfig } from "../../../types/types";

export const post = {
  modifyBeaconConfig,
};

async function modifyBeaconConfig(request: FastifyRequest<{ Body: RequestBodyWithBeaconConfig }>, reply: FastifyReply) {
  try {
    if (typeof request.body.pollIntervalSeconds === "number") {
      beaconConfig.pollIntervalSeconds = request.body.pollIntervalSeconds;
    }

    if (typeof request.body.scheduleStart === "number" && typeof request.body.scheduleEnd === "number") {
      beaconConfig.schedule = { scheduleStart: request.body.scheduleStart, scheduleEnd: request.body.scheduleEnd };
    }

    if (typeof request.body.unit === "number") {
      beaconConfig.unit = request.body.unit;
    }

    reply.send({
      pollIntervalSeconds: beaconConfig.pollIntervalSeconds,
      scheduleStart: beaconConfig.scheduleStart,
      scheduleEnd: beaconConfig.scheduleEnd,
      unit: beaconConfig.unit,
    });
  } catch (error) {
    if (error instanceof InvalidBeaconConfig) {
      reply.status(StatusCodes.BAD_REQUEST).send({ error: error.message });
      return;
    }

    reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: "Something went wrong" });
  }
}
