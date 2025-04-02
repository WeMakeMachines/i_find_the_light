enum BeaconConfigUnit {
  METRIC = 1,
  IMPERIAL = 2,
}

export type BeaconConfigProps = {
  pollIntervalSeconds: number;
  scheduleStart: number;
  scheduleEnd: number;
  unit: number;
};

export type ValidatedTimestamp = {
  isValid: boolean;
  error?: string;
};

export class InvalidBeaconConfig extends Error {}

class BeaconConfig {
  private _pollIntervalSeconds: number = 10;
  private _scheduleStart: number = 0;
  private _scheduleEnd: number = 0;
  private _unit: number = 1;

  constructor(pollIntervalSeconds: number, scheduleStart: number, scheduleEnd: number, unit: number) {
    this.pollIntervalSeconds = pollIntervalSeconds;
    if (scheduleStart && scheduleEnd) {
      this.schedule = { scheduleStart, scheduleEnd };
    }
    this.unit = unit;
  }

  get pollIntervalSeconds() {
    return this._pollIntervalSeconds;
  }

  get scheduleStart() {
    return this._scheduleStart;
  }

  get scheduleEnd() {
    return this._scheduleEnd;
  }

  get unit() {
    return this._unit;
  }

  set pollIntervalSeconds(seconds: number) {
    if (seconds === undefined) throw new InvalidBeaconConfig("pollIntervalSeconds missing");

    this._pollIntervalSeconds = seconds;
  }

  set schedule({ scheduleStart, scheduleEnd }: { scheduleStart: number; scheduleEnd: number }) {
    const validatedScheduleStart = this.validateAsUnixTimestampInSeconds(scheduleStart);

    if (!validatedScheduleStart.isValid) {
      throw new InvalidBeaconConfig(`Invalid scheduleStart: ${validatedScheduleStart.error}`);
    }

    // can't have one timestamp without the other
    if (scheduleEnd === undefined) {
      throw new Error("Missing scheduleEnd");
    }

    const validatedScheduleEnd = this.validateAsUnixTimestampInSeconds(scheduleEnd);

    if (!validatedScheduleEnd.isValid) {
      throw new InvalidBeaconConfig(`Invalid scheduleEnd: ${validatedScheduleEnd.error}`);
    }

    if (scheduleEnd <= scheduleStart) {
      throw new InvalidBeaconConfig("scheduleEnd can't be before scheduleStart");
    }

    this._scheduleStart = scheduleStart;
    this._scheduleEnd = scheduleEnd;
  }

  set unit(unit: number) {
    if (unit === undefined) throw new InvalidBeaconConfig("Missing Unit");

    if (!Object.values(BeaconConfigUnit).includes(unit)) throw new InvalidBeaconConfig("Invalid Unit");

    this._unit = unit;
  }

  // expects a unix timestamp in seconds
  validateAsUnixTimestampInSeconds(timestamp: number): ValidatedTimestamp {
    // unix timestamp in seconds should be 10 characters long
    const timestampAsString = timestamp.toString();

    if (timestampAsString.length !== 10) {
      return {
        isValid: false,
        error: "Incorrect length for timestamp",
      };
    }

    // Check the timestamp is not in the past
    if (timestamp < Date.now() / 1000) {
      return {
        isValid: false,
        error: "Timestamp can not be in the past",
      };
    }

    return {
      isValid: true,
    };
  }
}

export default new BeaconConfig(
  Number(process.env.BEACON_POLL_INTERVAL_SECONDS),
  Number(process.env.BEACON_SCHEDULE_START),
  Number(process.env.BEACON_SCHEDULE_END),
  Number(process.env.UNIT),
);
