import { Reading } from "../shared/types";

export function transformTimestampToMs(reading: Reading): Reading {
  return { ...reading, timestamp: reading.timestamp * 1000 };
}
