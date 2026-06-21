import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";

import type { CreateBeaconInput } from "../../../types/types";
import { beaconService, surveyService } from "../../../services";
import { NoActiveSurveyError } from "../../../services/beacon.service";

export const post = {
  bootstrap,
};

async function bootstrap(request: FastifyRequest<{ Body: CreateBeaconInput }>, reply: FastifyReply) {
  const { beaconName, deviceKey } = request.body;

  try {
    const newBeacon = beaconService.createBeacon({ beaconName, deviceKey });
    const surveyParams = surveyService.getSurvey(newBeacon.surveyId);

    reply.statusCode = StatusCodes.OK;

    return {
      beaconId: newBeacon.beaconId,
      surveyId: newBeacon.surveyId,
      pollIntervalSeconds: surveyParams.pollIntervalSeconds,
      startTimestamp: surveyParams.startTimestamp,
      endTimestamp: surveyParams.endTimestamp,
      currentDateTime: Date.now(),
    };
  } catch (error) {
    if (error instanceof NoActiveSurveyError) {
      reply.statusCode = StatusCodes.SERVICE_UNAVAILABLE;
      reply.header("Retry-After", process.env.BOOTSTRAP_UNAVAILABLE_RETRY_AFTER_S || 60);
      return "Unable to create beacon at this time, try again";
    }
    reply.statusCode = StatusCodes.BAD_REQUEST;
    return;
  }
}
