// https://vike.dev/data
import { selectBeacons } from "../../../services/sqlite/queries/beacons";
import type { PageContextServer } from "vike/types";

import { Beacon } from "../../../types/types";

export type Data = {
  beacons: Beacon[];
};

export default async function data(_pageContext: PageContextServer) {
  const beacons = selectBeacons(_pageContext.db);

  return { beacons };
}
