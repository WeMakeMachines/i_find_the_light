export function timestampToMs(timestamp: number): number {
  return timestamp * 1000;
}

export function timestampToS(timestamp: number): number {
  return Math.round(timestamp / 1000);
}
