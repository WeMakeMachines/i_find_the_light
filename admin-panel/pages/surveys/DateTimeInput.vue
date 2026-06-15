<template>
  <input
    v-model="transformTimestamp"
    type="datetime-local"
    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

const model = defineModel<number>();

const transformTimestamp = computed<string>({
  get() {
    if (!model.value) return "";

    const date = new Date(model.value);

    return date.toISOString().slice(0, 16);
  },

  set(value: string) {
    if (!value) {
      model.value = undefined as any;
      return;
    }

    model.value = new Date(value).getTime();
  },
});
</script>
