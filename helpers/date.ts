export function humanReadableDateTime(timestamp: number): string {
  const event = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    dateStyle: "short",
    timeStyle: "short",
  };
  return event.toLocaleString("en-GB", options);
}

export function humanReadableTime(timestamp: number): string {
  const event = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    timeStyle: "short",
  };
  return event.toLocaleString("en-GB", options);
}
