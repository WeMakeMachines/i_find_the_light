export const handshakeSchema = {
  body: {
    type: "object",
    required: ["name"],
    properties: {
      name: { type: "string" },
    },
  },
};

export const readingSchema = {
  body: {
    anyOf: [
      {
        type: "object",
        properties: {
          beacon_id: { type: "integer" },
          timestamp: { type: "integer" },
          lux: { type: "number" },
          temperature: { type: "number" },
          unit: { type: "integer", enum: [1, 2] },
        },
        required: ["beacon_id", "timestamp", "lux", "temperature", "unit"],
      },
      {
        type: "array",
        items: {
          type: "object",
          properties: {
            beacon_id: { type: "integer" },
            timestamp: { type: "integer" },
            lux: { type: "number" },
            temperature: { type: "number" },
            unit: { type: "integer", enum: [1, 2] },
          },
          required: ["beacon_id", "timestamp", "lux", "temperature", "unit"],
        },
      },
    ],
  },
};
