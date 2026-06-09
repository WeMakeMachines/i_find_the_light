export const bootstrapSchema = {
  body: {
    type: "object",
    required: ["beaconName", "deviceKey"],
    properties: {
      beaconName: { type: "string" },
      deviceKey: { type: "string" },
    },
  },
};
