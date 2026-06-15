import db from "../db";

import { makeSurveyBeaconsQueries } from "../db/queries/surveyBeacons";
import { makeSurveyReadingsQueries } from "../db/queries/surveyReadings";
import { makeSurveysQueries } from "../db/queries/surveys";

import { makeBeaconService } from "./beaconService";
import { makeReadingService } from "./readingService";
import { makeSurveyService } from "./surveyService";

export const surveyBeaconsQueries = makeSurveyBeaconsQueries(db);
export const surveyReadingsQueries = makeSurveyReadingsQueries(db);
export const surveysQueries = makeSurveysQueries(db);
export const beaconService = makeBeaconService(surveysQueries, surveyBeaconsQueries);
export const readingService = makeReadingService(surveyReadingsQueries);
export const surveyService = makeSurveyService(surveysQueries);
