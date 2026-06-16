export const createSurveySchema = {
  body: {
    type: "object",
    additionalProperties: false,

    required: ["startTimestamp", "endTimestamp"],

    properties: {
      name: { type: "string" },
      startTimestamp: { type: "integer", minimum: 1000000000000, maximum: 9999999999999 },
      endTimestamp: { type: "integer", minimum: 1000000000000, maximum: 9999999999999 },
      description: { type: "string" },
      pollIntervalSeconds: {
        type: "integer",
        minimum: 1,
      },
    },
  },
};
