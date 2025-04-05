// https://vike.dev/data
import { selectReadings } from "../../../services/sqlite/queries/readings";
import type { PageContextServer } from "vike/types";

import { Reading } from "../../../types/types";

export type Data = {
  readings: Reading[];
};

export default async function data(_pageContext: PageContextServer) {
  const readings = selectReadings(_pageContext.db);

  return { readings };
}
