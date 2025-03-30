export const beaconConfigSchema = {
  body: {
    type: "object",
    properties: {
      pollIntervalSeconds: { type: "integer" },
      scheduleStart: { type: "integer" },
      scheduleEnd: { type: "integer" },
      unit: { type: "integer", enum: [1, 2] },
    },
  },
};
