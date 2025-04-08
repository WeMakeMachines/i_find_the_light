<template>
  <div id="page-container">
    <div id="page-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style>
#page-container {
  padding: 20px;
  padding-bottom: 50px;
  min-height: 100vh;
  flex-grow: 1;
}

#page-content {
  padding: 20px;
  padding-bottom: 50px;
  min-height: 100vh;
}

/* Page Transition Animation */
body.page-is-transitioning #page-content {
  opacity: 0;
}
</style>

<style scoped>
/* Page Transition Animation */
#page-content {
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
}
</style>
