<template>
  <div>
    <h2>Polling Interval</h2>
    <form id="poll-interval-form">
      <input
        v-model="pollIntervalSeconds"
        :disabled="!pollIntervalFormEditState"
        type="number"
        id="poll-interval"
        name="poll-interval"
      />
      <button @click="handlePollIntervalForm">{{ pollIntervalFormEditState ? "Set" : "Change" }}</button>
    </form>
  </div>
  <div>
    <h2>Unit</h2>
    <form id="unit-form">
      <select v-model="unit" @change="handleUnitForm">
        <option value="1">Metric</option>
        <option value="2">Imperial</option>
      </select>
    </form>
  </div>
  <div>
    <h2>Scheduling</h2>
    <form id="scheduling-form">
      <div>
        <label for="schedule-start-datetime">Start</label>
        <input
          v-model="scheduleStartDatetime"
          :disabled="!schedulingFormEditState"
          type="number"
          id="schedule-start-datetime"
          name="schedule-start-datetime"
        />
        <span>{{ scheduleStartHumanReadable }}</span>
      </div>
      <div>
        <label>End</label>
        <input
          v-model="scheduleEndDatetime"
          :disabled="!schedulingFormEditState"
          type="number"
          id="schedule-end-datetime"
          name="schedule-end-datetime"
        />
        <span>{{ scheduleEndHumanReadable }}</span>
      </div>
      <button @click="handleSchedulingForm">{{ schedulingFormEditState ? "Set" : "Change" }}</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { BeaconConfigProps } from "../../../config/beacon.config";

const props = defineProps<{ config: BeaconConfigProps }>();

const pollIntervalFormEditState = ref(false);
const pollIntervalSeconds = ref(props.config.pollIntervalSeconds);
const unit = ref(props.config.unit);
const schedulingFormEditState = ref(false);
const scheduleStartDatetime = ref(props.config.scheduleStart);
const scheduleEndDatetime = ref(props.config.scheduleEnd);

const scheduleStartHumanReadable = ref(
  props.config.scheduleStart ? new Date(props.config.scheduleStart * 1000) : "Not set",
);
const scheduleEndHumanReadable = ref(props.config.scheduleEnd ? new Date(props.config.scheduleEnd * 1000) : "Not set");

const handlePollIntervalForm = async (event: Event) => {
  event.preventDefault();
  pollIntervalFormEditState.value = !pollIntervalFormEditState.value;

  if (pollIntervalFormEditState) {
    try {
      const response = await fetch("/admin/config", {
        method: "POST",
        body: JSON.stringify({ pollIntervalSeconds: pollIntervalSeconds.value }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      await response.blob();
      props.config.pollIntervalSeconds = pollIntervalSeconds.value;
    } catch (e) {
      console.error(e);
    }
  }
};

const handleUnitForm = async (event: Event) => {
  event.preventDefault();
  try {
    const response = await fetch("/admin/config", {
      method: "POST",
      body: JSON.stringify({ unit: unit.value }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await response.blob();
    props.config.unit = unit.value;
  } catch (e) {
    console.error(e);
  }
};

const handleSchedulingForm = async (event: Event) => {
  event.preventDefault();
  schedulingFormEditState.value = !schedulingFormEditState.value;
  try {
    const response = await fetch("/admin/config", {
      method: "POST",
      body: JSON.stringify({ scheduleStart: scheduleStartDatetime.value, scheduleEnd: scheduleEndDatetime.value }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await response.blob();
    props.config.scheduleStart = scheduleStartDatetime.value;
    props.config.scheduleEnd = scheduleEndDatetime.value;
    scheduleStartHumanReadable.value = new Date(scheduleStartDatetime.value * 1000);
    scheduleEndHumanReadable.value = new Date(scheduleEndDatetime.value * 1000);
  } catch (e) {
    console.error(e);
  }
};
</script>

<style></style>
