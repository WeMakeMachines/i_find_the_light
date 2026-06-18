import { FastifyRequest } from "fastify";

import { readingService } from "../../../services";

import { RequestBodyWithReading } from "../../../types/types";

export const post = {
  readings,
};

async function readings(request: FastifyRequest<{ Body: RequestBodyWithReading }>): Promise<string> {
  const data = request.body;

  let addedReadings = 0;

  if (Array.isArray(data)) {
    data.forEach((reading) => {
      readingService.createReading({ ...reading, surveyId: Number(reading.surveyId) });
    });
    addedReadings = data.length;
  } else {
    readingService.createReading({ ...data, surveyId: Number(data.surveyId) });
    addedReadings = 1;
  }

  return `Added ${addedReadings} reading(s) to database`;
}
