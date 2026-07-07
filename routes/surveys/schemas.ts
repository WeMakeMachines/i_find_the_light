export const surveyIdSchema = {
  schema: {
    params: {
      type: "object",
      properties: {
        surveyId: {
          type: "string",
          pattern: "^[0-9]+$",
        },
      },
      required: ["surveyId"],
    },
  },
};

export const surveyInputSchema = {
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
