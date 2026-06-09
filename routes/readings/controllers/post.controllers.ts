import { FastifyRequest } from "fastify";

import { readingService } from "../../../fastify-entry";

import { RequestBodyWithReading } from "../../../types/types";

export const post = {
  readings,
};

async function readings(
  request: FastifyRequest<{ Body: RequestBodyWithReading; Params: { surveyId: number } }>,
): Promise<string> {
  const data = request.body;
  const { surveyId } = request.params;

  let addedReadings = 0;

  if (Array.isArray(data)) {
    data.forEach((reading) => {
      readingService.createReading({ ...reading, surveyId: Number(surveyId) });
    });
    addedReadings = data.length;
  } else {
    readingService.createReading({ ...data, surveyId: Number(surveyId) });
    addedReadings = 1;
  }

  return `Added ${addedReadings} reading(s) to database`;
}
