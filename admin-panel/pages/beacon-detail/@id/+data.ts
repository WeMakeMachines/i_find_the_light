// https://vike.dev/data
import { selectReadingsByBeaconId } from "../../../../services/sqlite/queries/readings";
import type { PageContextServer } from "vike/types";

import type { ReadingBeaconJoin } from "../../../../services/sqlite/queries/readings";

export type Data = {
  readings: ReadingBeaconJoin[];
  beaconId: number;
};

export default async function data(_pageContext: PageContextServer) {
  const beaconId = Number(_pageContext.routeParams.id);
  const readings = selectReadingsByBeaconId(_pageContext.db, beaconId);

  return { readings, beaconId };
}
