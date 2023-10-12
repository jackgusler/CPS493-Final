<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import MainHero from "./components/MainHero.vue";
</script>

<template>
  <header>
    <NavBar />
    <RouterView />
    <MainHero />
  </header>
</template>

<style scoped>
header {
  background-color: #7e7e7e;
}

</style>
