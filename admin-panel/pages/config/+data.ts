// https://vike.dev/data
import type { PageContextServer } from "vike/types";

import { BeaconConfigProps } from "../../../config/beacon.config";

export type Data = {
  beaconConfig: BeaconConfigProps;
};

export default async function data(_pageContext: PageContextServer) {
  const beaconConfig = {
    pollIntervalSeconds: _pageContext.beaconConfig.pollIntervalSeconds,
    scheduleStart: _pageContext.beaconConfig.scheduleStart,
    scheduleEnd: _pageContext.beaconConfig.scheduleEnd,
    unit: _pageContext.beaconConfig.unit,
  };

  return { beaconConfig };
}
