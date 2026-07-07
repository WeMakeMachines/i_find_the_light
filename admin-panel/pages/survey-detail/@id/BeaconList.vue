<template>
  <div v-for="beacon in beaconList" :key="beacon.beaconId">
    <Link
      :href="`/beacon/${beacon.surveyId}/${beacon.beaconId}`"
      class="flex text-xs px-1.5 py-0.5 rounded mb-4 bg-gradient-to-r from-teal-200 to-lime-200"
    >
      <svg
        class="w-6 h-6 mr-2 text-gray-800"
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
          stroke-miterlimit="10"
          stroke-width="2"
          d="M7.42584 18.2443c1.3169-2.2023 2.5334-1.5242 3.85026-3.7265 1.3169-2.2023.1004-2.8805 1.4173-5.08281 1.3169-2.20233 2.5335-1.52419 3.8504-3.72652M10.8472 20.1517c1.3169-2.2024 2.5334-1.5242 3.8503-3.7266 1.3169-2.2023.1004-2.8804 1.4173-5.0828 1.3169-2.20228 2.5334-1.52414 3.8503-3.72647l-6.8428-3.81455C11.8054 6.00361 10.5889 5.32547 9.272 7.5278s-.1004 2.8805-1.4173 5.0828c-1.3169 2.2023-2.5334 1.5242-3.85031 3.7265l6.84281 3.8146Z"
        />
      </svg>

      <span class="mr-2"
        >ID: <span class="text-base font-bold">{{ beacon.beaconId }}</span></span
      >
      <span class="mr-2"
        >Name: <span class="text-base font-bold">{{ beacon.beaconName }}</span></span
      >
    </Link>
  </div>
</template>

<script lang="ts" setup>
import Link from "../../../components/Link.vue";

import { Beacon } from "../../../../types/sqlite.js";

defineProps<{
  beaconList: Beacon[];
}>();
</script>
