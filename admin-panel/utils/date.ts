export function humanReadableDateTime(timestamp: number): string {
  const options: Intl.DateTimeFormatOptions = {
    dateStyle: "short",
    timeStyle: "short",
  };

  return dateToLocaleString(timestamp, options);
}

export function humanReadableTime(timestamp: number): string {
  const options: Intl.DateTimeFormatOptions = {
    timeStyle: "short",
  };

  return dateToLocaleString(timestamp, options);
}

function dateToLocaleString(timestamp: number, options: Intl.DateTimeFormatOptions) {
  const event = new Date(timestamp);

  const locale = import.meta.env.PUBLIC_ENV__LOCALE || "en-GB";

  try {
    return event.toLocaleString(locale, options);
  } catch (err) {
    return event.toLocaleString("en-GB", options);
  }
}
