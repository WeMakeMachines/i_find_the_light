import { FastifyReply, FastifyRequest } from "fastify";

import type { CreateBeaconInput, ReplyBodyWithConfig } from "../../../types/types";
import { timestampToS } from "../../../utils/date";
import { beaconService, surveyService } from "../../../fastify-entry";
import { NoActiveSurveyError } from "../../../services/beaconService";
import { StatusCodes } from "http-status-codes";

export const post = {
  bootstrap,
};

//Promise<ReplyBodyWithConfig>

async function bootstrap(request: FastifyRequest<{ Body: CreateBeaconInput }>, reply: FastifyReply) {
  const { beaconName, deviceKey } = request.body;

  try {
    const newBeacon = beaconService.createBeacon({ beaconName, deviceKey });
    const surveyParams = surveyService.getSurvey(newBeacon.surveyId);

    return {
      beaconId: newBeacon.beaconId,
      surveyId: newBeacon.surveyId,
      pollIntervalSeconds: surveyParams.pollIntervalSeconds,
      startTimestamp: surveyParams.startTimestamp,
      endTimestamp: surveyParams.endTimestamp,
      currentDateTime: timestampToS(Date.now()),
    };
  } catch (error) {
    if (error instanceof NoActiveSurveyError) {
      reply.statusCode = StatusCodes.SERVICE_UNAVAILABLE;
      reply.header("Retry-After", process.env.BOOTSTRAP_UNAVAILABLE_RETRY_AFTER_S || 60);
      return "Unable to create beacon at this time, try again";
    }
    console.log(error);
  }
}
