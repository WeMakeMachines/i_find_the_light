export const createSurveySchema = {
  body: {
    type: "object",
    additionalProperties: false,

    required: ["startTimestamp", "endTimestamp"],

    properties: {
      startTimestamp: { type: "number" },
      endTimestamp: { type: "number" },
      description: { type: "string" },
      pollIntervalSeconds: {
        type: "integer",
        minimum: 1,
      },
    },
  },
};
