<template>
  <div v-if="isPast(timestamp)" class="border border-red-500 rounded-sm mt-2">
    <div class="flex bg-red-500 text-white p-2">
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
          d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
      <p class="uppercase">Warning!</p>
    </div>
    <p class="p-2">Date is in the past.</p>
  </div>
</template>

<script setup>
import { isPast } from "date-fns";

defineProps({
  timestamp: {
    type: Number,
  },
});
</script>
