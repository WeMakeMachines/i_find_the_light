export const surveySchema = {
  body: {
    type: "object",
    additionalProperties: false,

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
