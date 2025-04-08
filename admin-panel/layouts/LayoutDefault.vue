<template>
  <div class="layout">
    <Sidebar>
      <Logo />
      <Link href="/admin-panel"> Home </Link>
      <Link href="/admin-panel/beacons"> Beacons </Link>
      <Link href="/admin-panel/readings"> All Readings </Link>
      <Link href="/admin-panel/config"> Config </Link>
      <Link href="/admin-panel/danger-zone"> Danger Zone </Link>
    </Sidebar>
    <Content><slot /></Content>
  </div>
</template>

<script lang="ts" setup>
import Content from "../components/Content.vue";
import Link from "../components/Link.vue";
import Logo from "../components/Logo.vue";
import Sidebar from "../components/Sidebar.vue";
</script>

<style>
body {
  margin: 0;
  font-family: sans-serif;
}
* {
  box-sizing: border-box;
}
a {
  text-decoration: none;
}
</style>

<style scoped>
.layout {
  display: flex;
  max-width: 100vw;
  margin: auto;
}
/* Page Transition Animation */
#page-content {
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
}
body.page-is-transitioning #page-content {
  opacity: 0;
}
</style>
