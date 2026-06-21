export function findGlobalMaximum(
  dataset: Record<string, unknown>[],
  key: string,
): { value: number | undefined; index: number | undefined } {
  const globalMaximum: { value: number | undefined; index: number | undefined } = {
    value: undefined,
    index: undefined,
  };

  dataset.forEach((record, index) => {
    const value = record[key];

    if (typeof value === "number") {
      if (globalMaximum.value === undefined || value > globalMaximum.value) {
        globalMaximum.value = value;
        globalMaximum.index = index;
      }
    }
  });

  return globalMaximum;
}
