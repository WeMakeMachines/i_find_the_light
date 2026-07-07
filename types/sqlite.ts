import type { CreateBeaconInput, CreateReadingInput, CreateSurveyInput } from "./types";

export type Beacon = CreateBeaconInput & {
  beaconId: number;
  surveyId: number;
};

export type Reading = CreateReadingInput & {
  id: number;
  serverTimestamp: number;
};

export type Survey = CreateSurveyInput & {
  id: number;
  status: string;
  mapPath: string;
};

export type SurveyWithBeaconReadingCounts = Survey & {
  beaconCount: number;
  readingCount: number;
};

export type ReadingWithBeaconName = Reading & {
  name: string;
};

export type ReadingsByBeaconId = {
  [id: number]: ReadingWithBeaconName[];
};

export enum SurveyStatus {
  DRAFT = "draft",
  ACTIVE = "active",
  ARCHIVED = "archived",
}
