export type ValidatedTimestamp = {
  isValid: boolean;
  error?: string;
};

// expects a unix timestamp in seconds
export function validateAsUnixTimestampInSeconds(timestamp: number): ValidatedTimestamp {
  // unix timestamp in seconds should be 10 characters long
  const timestampAsString = timestamp.toString();

  if (timestampAsString.length !== 10) {
    return {
      isValid: false,
      error: "Incorrect length for timestamp",
    };
  }

  // Check the timestamp is not in the past
  if (timestamp < Date.now()) {
    return {
      isValid: false,
      error: "Timestamp can not be in the past",
    };
  }

  return {
    isValid: true,
  };
}
