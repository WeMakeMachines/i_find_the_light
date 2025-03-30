// https://vike.dev/data
import * as sqliteQueries from "../../../services/sqlite/queries/beacons";
import type { PageContextServer } from "vike/types";

export type Data = {
  todo: { text: string }[];
};

export default async function data(_pageContext: PageContextServer) {
  const todo = sqliteQueries.selectBeacons(_pageContext.db);

  return { todo };
}
