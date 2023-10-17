<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import MainHero from "./components/MainHero.vue";
</script>

<template>
  <header>

    <body>
      <NavBar />
      <RouterView />
    </body>
  </header>
</template>

<style scoped></style>
