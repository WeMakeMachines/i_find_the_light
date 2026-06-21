import db from "../db";

import { makeSurveyBeaconsQueries } from "../db/queries/surveyBeacons";
import { makeSurveyReadingsQueries } from "../db/queries/surveyReadings";
import { makeSurveysQueries } from "../db/queries/surveys";

import { makeBeaconService } from "./beacon.service";
import { makeReadingService } from "./reading.service";
import { makeSurveyService } from "./survey.service";

export const surveyBeaconsQueries = makeSurveyBeaconsQueries(db);
export const surveyReadingsQueries = makeSurveyReadingsQueries(db);
export const surveysQueries = makeSurveysQueries(db);
export const beaconService = makeBeaconService(surveysQueries, surveyBeaconsQueries);
export const readingService = makeReadingService(surveyReadingsQueries, surveysQueries);
export const surveyService = makeSurveyService(surveysQueries);
