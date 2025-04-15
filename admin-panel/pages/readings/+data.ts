// https://vike.dev/data
import { selectReadingsGroupByBeaconId } from "../../../services/sqlite/queries/readings";

import type { PageContextServer } from "vike/types";
import type { ReadingsByBeaconId } from "../../../shared/types";

export type Data = {
  readings: ReadingsByBeaconId;
};

export default async function data(_pageContext: PageContextServer) {
  const readings = selectReadingsGroupByBeaconId(_pageContext.db);

  return { readings };
}
