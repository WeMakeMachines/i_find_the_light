<template>
  <ul class="border rounded-lg px-3 py-3">
    <li
      v-for="(beacon, index) in beaconList"
      :key="index"
      :class="index === 0 ? '' : 'border-t'"
      class="border-dotted py-2 hover:bg-gray-100"
    >
      <div class="flex">
        <p class="w-1/3">Assigned id: {{ beacon.beaconId }}</p>
        <p class="w-1/3">Self reported name: {{ beacon.beaconName }}</p>
        <p class="w-1/3">Device Key: {{ beacon.deviceKey }}</p>
        <button
          @click="deleteBeacon(beacon.beaconId)"
          type="button"
          class="ml-5 text-red-300 inline-flex items-center hover:text-white hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm pl-4 pr-2 py-2 text-center"
        >
          <svg class="w-5 h-5 mr-1 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { Beacon } from "../../../types/sqlite.js";

const { beaconList } = defineProps<{ beaconList: Beacon[] }>();

const emit = defineEmits<{
  (e: "deleteBeacon", id: number): void;
}>();

function deleteBeacon(id: number) {
  emit("deleteBeacon", id);
}
</script>
