<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { ref } from "vue";
import LoginBadge from "./LoginBadge.vue";
</script>

<template>
  <div>
    <nav class="navbar is-black" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <RouterLink class="navbar-item" to="/">
          <img
            src="https://bulma.io/images/bulma-logo-white.png"
            width="112"
            height="28"
          />
        </RouterLink>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <RouterLink class="navbar-item" to="/my-workouts"
            >My Workouts</RouterLink
          >
          <RouterLink class="navbar-item" to="/statistics"
            >Statistics</RouterLink
          >
          <RouterLink class="navbar-item" to="/friends">Friends</RouterLink>
          <a class="navbar-item" href="#">Search</a>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="dropdown is-hoverable is-right ">
              <div class="dropdown-trigger">
                Admin
              </div>
              <div class="dropdown-menu" id="dropdown-menu4" role="menu">
                <div class="dropdown-content">
                  <div class="dropdown-item">
                    <p>
                       <RouterLink to="/users">Users</RouterLink>
                    </p>
                </div>
                </div>
              </div>
            </div>
          </div>
          <LoginBadge />
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.button {
  padding: 0;
  background-color: #cccccc;
}
.navbar-item {
  border: 2px solid transparent;
}
.router-link-active,
.login-badge:active {
  border-bottom: 2px solid #00ff00;
}
.dropdown-content{
    background-color: #0A0A0A;
}
.router-link-active:active{
    font: #00ff00;
}
</style>
