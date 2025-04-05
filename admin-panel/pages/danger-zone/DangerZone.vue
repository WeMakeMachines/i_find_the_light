<template>
  <div>
    <button @click="deleteReadings">Delete Readings</button>
    <button @click="deleteBeacons">Delete Beacons</button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const message = ref("");

async function deleteReadings() {
  try {
    const res = await fetch("/beacon/readings", {
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
    const res = await fetch("/beacon", {
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
</script>
