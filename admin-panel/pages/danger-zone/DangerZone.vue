<template>
  <div class="flex gap-4">
    <button
      class="text-white bg-red-500 inline-flex items-center hover:text-white hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
      @click="deleteReadings"
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
          d="M18.122 17.645a7.185 7.185 0 0 1-2.656 2.495 7.06 7.06 0 0 1-3.52.853 6.617 6.617 0 0 1-3.306-.718 6.73 6.73 0 0 1-2.54-2.266c-2.672-4.57.287-8.846.887-9.668A4.448 4.448 0 0 0 8.07 6.31 4.49 4.49 0 0 0 7.997 4c1.284.965 6.43 3.258 5.525 10.631 1.496-1.136 2.7-3.046 2.846-6.216 1.43 1.061 3.985 5.462 1.754 9.23Z"
        />
      </svg>

      Delete ALL readings
    </button>
    <button
      class="text-white bg-red-500 inline-flex items-center hover:text-white hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
      @click="deleteBeacons"
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
          d="M18.122 17.645a7.185 7.185 0 0 1-2.656 2.495 7.06 7.06 0 0 1-3.52.853 6.617 6.617 0 0 1-3.306-.718 6.73 6.73 0 0 1-2.54-2.266c-2.672-4.57.287-8.846.887-9.668A4.448 4.448 0 0 0 8.07 6.31 4.49 4.49 0 0 0 7.997 4c1.284.965 6.43 3.258 5.525 10.631 1.496-1.136 2.7-3.046 2.846-6.216 1.43 1.061 3.985 5.462 1.754 9.23Z"
        />
      </svg>

      Delete ALL beacons
    </button>
    <button
      class="text-white bg-red-500 inline-flex items-center hover:text-white hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
      @click="deleteSurveys"
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
          d="M18.122 17.645a7.185 7.185 0 0 1-2.656 2.495 7.06 7.06 0 0 1-3.52.853 6.617 6.617 0 0 1-3.306-.718 6.73 6.73 0 0 1-2.54-2.266c-2.672-4.57.287-8.846.887-9.668A4.448 4.448 0 0 0 8.07 6.31 4.49 4.49 0 0 0 7.997 4c1.284.965 6.43 3.258 5.525 10.631 1.496-1.136 2.7-3.046 2.846-6.216 1.43 1.061 3.985 5.462 1.754 9.23Z"
        />
      </svg>

      Delete ALL surverys
    </button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const message = ref("");

async function deleteReadings() {
  try {
    const res = await fetch("/readings", {
      method: "DELETE",
    });
    if (res.ok) {
      message.value = "Readings deleted!";
    } else {
      message.value = "Something went wrong.";
    }
  } catch (err) {
    message.value = "Error: " + err.message;
  }
}

async function deleteBeacons() {
  try {
    const res = await fetch("/beacons", {
      method: "DELETE",
    });
    if (res.ok) {
      message.value = "Beacons deleted!";
    } else {
      message.value = "Something went wrong.";
    }
  } catch (err) {
    message.value = "Error: " + err.message;
  }
}

async function deleteSurveys() {
  try {
    const res = await fetch("/surveys", {
      method: "DELETE",
    });
    if (res.ok) {
      message.value = "Surveys deleted!";
    } else {
      message.value = "Something went wrong.";
    }
  } catch (err) {
    message.value = "Error: " + err.message;
  }
}
</script>
