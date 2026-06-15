export const bootstrapSchema = {
  body: {
    type: "object",
    required: ["beaconName", "deviceKey"],
    properties: {
      beaconName: { type: "string" },
      deviceKey: { type: "string" },
    },
  },

  response: {
    200: {
      type: "object",
      required: ["beaconId", "surveyId", "pollIntervalSeconds", "startTimestamp", "endTimestamp", "currentDateTime"],
      properties: {
        beaconId: { type: "integer" },
        surveyId: { type: "integer" },
        pollIntervalSeconds: { type: "integer" },
        startTimestamp: { type: "integer" },
        endTimestamp: { type: "integer" },
        currentDateTime: { type: "integer" },
      },
    },
  },
};
