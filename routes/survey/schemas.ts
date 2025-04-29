export const surveyParametersSchema = {
  body: {
    type: "object",
    additionalProperties: false,
    properties: {
      description: { type: "string" },
      poll_interval_seconds: { type: "integer", minimum: 1 },
      expected_beacons: { type: "integer", minimum: 1 },
      unit: { type: "integer", enum: [1, 2] },
    },
  },
};
