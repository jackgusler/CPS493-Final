<script setup lang="ts">
import { RouterLink } from "vue-router"
import LoginBadge from "./LoginBadge.vue"
import { getSession } from "@/models/session"

const session = getSession()

</script>

<template>
  <div>
    <nav class="navbar is-black" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <RouterLink class="navbar-item" to="/">
          <img src="https://bulma.io/images/bulma-logo-white.png" width="112" height="28" />
        </RouterLink>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <RouterLink class="navbar-item" to="/my-workouts">My Workouts</RouterLink>
          <RouterLink class="navbar-item" to="/statistics">Statistics</RouterLink>
          <RouterLink class="navbar-item" to="/friends">Friends</RouterLink>
        </div>
        <div class="navbar-end">
          <div v-if="session.user?.admin" class="navbar-item dropdown is-hoverable is-right">
            <div class="dropdown-trigger">
              Admin
            </div>
            <div class="dropdown-menu">
              <div class="dropdown-content">
                <div class="dropdown-item">
                  <p>
                    <RouterLink to="/users">Users</RouterLink>
                  </p>
                  <p>
                    <RouterLink to="/workouts">Workouts</RouterLink>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <LoginBadge />
      </div>
    </nav>
  </div>
</template>

<style scoped>
.navbar-item {
  border: 2px solid transparent;
}
.router-link-active {
  border-bottom: 2px solid #00ff00;
}
a.router-link-exact-active {
  background-color: #0A0A0A;
  color: #FFFFFF;
}
.dropdown-content, .dropdown-menu {
  background-color: #0A0A0A;
}
a, .dropdown-trigger {
  color: #ffffff;
}
.dropdown-trigger:active {
  color: #0A0A0A;
}
.dropdown-menu {
  border: 2px solid #CCCCCC;
  border-radius: 5px;
}
.router-link:hover,
a.navbar-item:hover,
LoginBadge:hover,
.navbar-item:hover {
  border-bottom: 2px solid #CCCCCC;
  background: transparent;
  color: white;
}</style>
