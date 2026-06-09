import { admin } from "./admin/routes";
import { beaconsRoutes } from "./beacons/routes";
import { bootstrapRoutes } from "./bootstrap/routes";
import { readingsRoutes } from "./readings/routes";
import { surveysRoutes } from "./surveys/routes";

export const routes = {
  admin,
  beaconsRoutes,
  bootstrapRoutes,
  readingsRoutes,
  surveysRoutes,
};
