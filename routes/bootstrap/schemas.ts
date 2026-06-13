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
        beaconId: { type: "number" },
        surveyId: { type: "number" },
        pollIntervalSeconds: { type: "number" },
        startTimestamp: { type: "number" },
        endTimestamp: { type: "number" },
        currentDateTime: { type: "number" },
      },
    },
  },
};
