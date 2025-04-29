import { FastifyRequest } from "fastify";

import { selectSurveys, selectSurveyBySurveyId } from "../../../services/sqlite/queries/surveys";
import db from "../../../services/sqlite";

export const get = {
  surveys,
};

async function surveys(request: FastifyRequest<{ Querystring: { survey_id: string } }>) {
  const surveyId = Number(request.query.survey_id);

  if (!request.query.survey_id || isNaN(surveyId)) return selectSurveys(db);

  const survey = selectSurveyBySurveyId(db, surveyId);

  return survey;
}
