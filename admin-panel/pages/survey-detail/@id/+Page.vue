<template>
  <div class="flex">
    <h2 class="mb-10">
      Survey (ID: {{ survey.id }}) <span>"{{ survey.name }}"</span>
      <span
        :class="
          survey.status === SurveyStatus.ACTIVE
            ? 'status-active'
            : survey.status === SurveyStatus.ARCHIVED
              ? 'status-archived'
              : 'status-draft'
        "
        class="ml-10 rounded-lg font-medium px-4 py-2.5 text-center leading-5"
      >
        {{ survey.status }}
      </span>
    </h2>
  </div>

  <Panel class="mb-10">
    <template #header>
      <h3 class="text-white text-lg font-semibold">Details</h3>
    </template>

    <div class="flex justify-between pb-15">
      <div>
        <div class="flex">
          <p>
            Name: <span class="font-bold">{{ survey.name }}</span>
          </p>
        </div>
        <div class="flex">
          <p>
            Polling every
            <span class="font-bold"
              >{{ survey.pollIntervalSeconds }} second(s) / {{ survey.pollIntervalSeconds / 60 }} minute(s)</span
            >
          </p>
        </div>
        <div v-if="survey.status === SurveyStatus.ACTIVE || survey.status === SurveyStatus.ARCHIVED" class="flex">
          <p>
            Received:
            <span class="font-bold">{{ readingsCount }} readings</span> from
            <span class="font-bold">{{ beaconsCount }} beacons</span>
          </p>
        </div>
        <div>
          <p>Description:</p>
          <p class="break-all pr-10">{{ survey.description }}</p>
        </div>
        <div
          v-if="survey.status === SurveyStatus.ACTIVE || survey.status === SurveyStatus.ARCHIVED"
          class="absolute bottom-3 left-3"
        >
          <Link
            :disabled="Boolean(!readingsCount)"
            :href="'/readings/' + survey.id"
            class="flex text-white bg-green-500 inline-flex items-center hover:text-white hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
          >
            <svg
              class="w-6 h-6 mr-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v15a1 1 0 0 0 1 1h15M8 16l2.5-5.5 3 3L17.273 7 20 9.667"
              />
            </svg>

            View Results
          </Link>
        </div>
      </div>
      <div>
        <div v-if="survey.status === SurveyStatus.ACTIVE" class="text-right mt-2">
          <Panel class="text-sm w-60 text-center">
            <template #header><p class="text-center text-white">Warning!</p></template>
            <p class="text-left mb-5">
              Archiving this survey is permanent! It will prevent new information from being recorded and lock it from
              future edits.
            </p>
            <button
              class="flex text-white bg-red-500 inline-flex items-center hover:text-white hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
              @click="archiveSurvey"
            >
              <svg
                class="w-6 h-6 mr-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 12v1h4v-1m4 7H6a1 1 0 0 1-1-1V9h14v9a1 1 0 0 1-1 1ZM4 5h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                />
              </svg>

              Archive
            </button>
          </Panel>
        </div>
        <div v-if="survey.status === SurveyStatus.DRAFT" class="text-right">
          <Panel class="text-sm w-60 text-center">
            <template #header><p class="text-center text-white">Warning!</p></template>
            <p class="text-left mb-5">Activating this survey will archive any existing active survey.</p>
            <button
              class="flex text-white bg-red-500 inline-flex items-center hover:text-white hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
              @click="activateSurvey"
            >
              <svg
                class="w-6 h-6 mr-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M20.337 3.664c.213.212.354.486.404.782.294 1.711.657 5.195-.906 6.76-1.77 1.768-8.485 5.517-10.611 6.683a.987.987 0 0 1-1.176-.173l-.882-.88-.877-.884a.988.988 0 0 1-.173-1.177c1.165-2.126 4.913-8.841 6.682-10.611 1.562-1.563 5.046-1.198 6.757-.904.296.05.57.191.782.404ZM5.407 7.576l4-.341-2.69 4.48-2.857-.334a.996.996 0 0 1-.565-1.694l2.112-2.111Zm11.357 7.02-.34 4-2.111 2.113a.996.996 0 0 1-1.69-.565l-.422-2.807 4.563-2.74Zm.84-6.21a1.99 1.99 0 1 1-3.98 0 1.99 1.99 0 0 1 3.98 0Z"
                  clip-rule="evenodd"
                />
              </svg>

              Activate
            </button>
          </Panel>
        </div>
      </div>
    </div>
  </Panel>

  <div class="flex gap-10">
    <Panel class="mb-10 w-1/2">
      <template #header>
        <h3 class="text-white text-lg font-semibold">Scheduling</h3>
      </template>
      <div class="flex">
        <div class="w-40 border border-gray-300 rounded-lg px-3 py-2">
          <p class="font-bold uppercase text-sm">Start date / time</p>
          <p>{{ humanReadableDate(survey.startTimestamp) }}</p>
          <p>{{ humanReadableTime(survey.startTimestamp) }}</p>
          <template v-if="survey.status !== SurveyStatus.ARCHIVED">
            <DateWarning :timestamp="survey.startTimestamp" />
          </template>
        </div>
        <svg
          class="w-6 h-6 mx-2 mt-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 12H5m14 0-4 4m4-4-4-4"
          />
        </svg>
        <div class="w-40 border border-gray-300 rounded-lg px-3 py-2">
          <p class="font-bold uppercase text-sm">End date / time</p>
          <p>{{ humanReadableDate(survey.endTimestamp) }}</p>
          <p>{{ humanReadableTime(survey.endTimestamp) }}</p>
          <template v-if="survey.status !== SurveyStatus.ARCHIVED">
            <DateWarning :timestamp="survey.endTimestamp" />
          </template>
        </div>
      </div>
    </Panel>

    <Panel v-if="survey.status === SurveyStatus.ACTIVE || survey.status === SurveyStatus.ARCHIVED" class="mb-10 w-1/2">
      <template #header>
        <h3 class="text-white text-lg font-semibold">Registered Beacons</h3>
      </template>
      <div v-if="beacons.length">
        <BeaconList :beacon-list="beacons" />
      </div>
      <div v-else>No beacons registered</div>
    </Panel>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import BeaconList from "./BeaconList.vue";
import DateWarning from "./DateWarning.vue";
import Link from "../../../components/Link.vue";
import Panel from "../../../components/Panel.vue";

import type { Data } from "./+data";
import { useData } from "vike-vue/useData";
import { humanReadableDate, humanReadableTime } from "../../../utils/date";
import { SurveyStatus } from "../../../../types/sqlite.js";

const data = useData<Data>();

const beacons = ref(data.beacons);
const beaconsCount = ref(data.beaconsCount);
const readingsCount = ref(data.readingsCount);
const survey = ref(data.survey);

async function activateSurvey() {
  const res = await fetch(`/surveys/${survey.value.id}/activate`, {
    method: "PATCH",
  });

  if (res.ok) {
    window.location.reload();
  }
}

async function archiveSurvey() {
  const res = await fetch(`/surveys/${survey.value.id}/archive`, {
    method: "PATCH",
  });

  if (res.ok) {
    window.location.reload();
  }
}
</script>

<style scoped>
@reference "tailwindcss";

.status-active {
  @apply text-black bg-gradient-to-r from-teal-200 to-lime-200;
}

.status-archived {
  @apply text-white bg-gradient-to-br from-purple-600 to-blue-500;
}

.status-draft {
  @apply text-white bg-gradient-to-br from-pink-500 to-orange-400;
}
</style>
