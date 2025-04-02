import { BeaconConfigProps } from "./config/beacon.config";
import db from "./services/sqlite";

declare global {
  namespace Vike {
    interface PageContext {
      db: ReturnType<typeof db>;
      beaconConfig: BeaconConfigProps;
    }
  }
}

export {};
