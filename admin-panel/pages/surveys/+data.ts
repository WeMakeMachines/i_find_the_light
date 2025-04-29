// https://vike.dev/data
import { selectSurveys } from "../../../services/sqlite/queries/surveys";

import type { PageContextServer } from "vike/types";
import type { Survey } from "../../../shared/sqlite";

export type Data = {
  surveys: Survey[];
};

export default async function data(_pageContext: PageContextServer) {
  const surveys = selectSurveys(_pageContext.db);

  return { surveys };
}
