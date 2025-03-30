import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";

import { RequestBodyWithBeaconConfig } from "../../../../types/types";
import { validateAsUnixTimestampInSeconds } from "../../../validators/beaconConfig.validator";

export const post = {
  modifyBeaconConfig,
};

class InvalidScheduleStartTimestamp extends Error {}
class InvalidScheduleEndTimestamp extends Error {}

async function modifyBeaconConfig(request: FastifyRequest<{ Body: RequestBodyWithBeaconConfig }>, reply: FastifyReply) {
  try {
    if (request.body.scheduleStart !== undefined) {
      const validatedScheduleStart = validateAsUnixTimestampInSeconds(request.body.scheduleStart);

      if (!validatedScheduleStart.isValid) {
        throw new InvalidScheduleStartTimestamp(`Invalid scheduleStart: ${validatedScheduleStart.error}`);
      }

      // can't have one timestamp without the other
      if (request.body.scheduleEnd === undefined) {
        throw new InvalidScheduleEndTimestamp("Missing scheduleEnd");
      }

      const validatedScheduleEnd = validateAsUnixTimestampInSeconds(request.body.scheduleEnd);

      if (!validatedScheduleEnd.isValid) {
        throw new InvalidScheduleEndTimestamp(`Invalid scheduleEnd: ${validatedScheduleEnd.error}`);
      }

      if (request.body.scheduleEnd <= request.body.scheduleStart) {
        throw new InvalidScheduleEndTimestamp("scheduleEnd can't be before scheduleStart");
      }

      request.beaconConfig.scheduleStart = request.body.scheduleStart;
      request.beaconConfig.scheduleEnd = request.body.scheduleEnd;
    }

    if (request.body.pollIntervalSeconds !== undefined) {
      request.beaconConfig.pollIntervalSeconds = request.body.pollIntervalSeconds;
    }

    if (request.body.unit !== undefined) {
      request.beaconConfig.unit = request.body.unit;
    }

    reply.send({
      pollIntervalSeconds: request.beaconConfig.pollIntervalSeconds,
      scheduleStart: request.beaconConfig.scheduleStart,
      scheduleEnd: request.beaconConfig.scheduleEnd,
      unit: request.beaconConfig.unit,
    });
  } catch (error) {
    if (error instanceof InvalidScheduleStartTimestamp || error instanceof InvalidScheduleEndTimestamp) {
      reply.status(StatusCodes.BAD_REQUEST).send({ error: error.message });
      return;
    }

    reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: "Something went wrong" });
  }
}
