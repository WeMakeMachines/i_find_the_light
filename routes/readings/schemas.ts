export const readingSchema = {
  body: {
    anyOf: [
      {
        type: "object",
        properties: {
          surveyId: { type: "integer" },
          beaconId: { type: "integer" },
          readingTimestamp: { type: "integer" },
          lux: { type: "number" },
          temperature: { type: "number" },
        },
        required: ["surveyId", "beaconId", "readingTimestamp", "lux", "temperature"],
      },
      {
        type: "array",
        items: {
          type: "object",
          properties: {
            surveyId: { type: "integer" },
            beaconId: { type: "integer" },
            readingTimestamp: { type: "integer" },
            lux: { type: "number" },
            temperature: { type: "number" },
          },
          required: ["surveyId", "beaconId", "readingTimestamp", "lux", "temperature"],
        },
      },
    ],
  },
};
