<template>
  <div id="page-sidebar">
    <slot />
  </div>
</template>
<script setup lang="ts"></script>

<style>
#page-sidebar {
  padding: 20px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  line-height: 1.8em;
  border-right: 2px solid #eee;
}
</style>
