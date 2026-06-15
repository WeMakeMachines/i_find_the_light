export function humanReadableDate(timestamp: number): string {
  const options: Intl.DateTimeFormatOptions = {
    dateStyle: "short",
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

export function unixToDateTimeLocal(timestamp: number): string {
  const date = new Date(timestamp);
  const offset = date.getTimezoneOffset();

  return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 16);
}

export function getTodayAsTimestamp() {
  const now = new Date();

  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0).getTime();
}
