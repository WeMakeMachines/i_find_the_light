import { BeaconConfigProps } from "./services/config/config";
import db from "./db";

declare global {
  namespace Vike {
    interface PageContext {
      db: ReturnType<typeof db>;
      beaconConfig: BeaconConfigProps;
    }
  }
}

export {};
