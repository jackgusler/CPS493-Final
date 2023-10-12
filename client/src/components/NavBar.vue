<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
</script>

<template>
    <div>
        <nav class="navbar is-black" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <RouterLink class="navbar-item" to="/">
                    <img src="https://bulma.io/images/bulma-logo-white.png" width="112" height="28">
                </RouterLink>
            </div>
            <div class="navbar-menu">
                <div class="navbar-start">
                    <a class="navbar-item" href="#">Personal Workouts</a>
                    <RouterLink class="navbar-item" to="/workoutle">
                          Workoutle
                      </RouterLink>                      
                    <a class="navbar-item" href="#">Calorie Calculator</a>
                </div>
                <div class="navbar-end">
                    <RouterLink class="navbar-item" to="/login">
                            <i class="fas fa-user"></i>
                    </RouterLink>
                </div>
            </div>
        </nav>
    </div>
</template>

<style scoped>
.button{
    padding: 0;
    background-color: #CCCCCC;
}
.navbar-item{
    border: 2px solid transparent;
}
.router-link-active{
    border-bottom: 2px solid #00FF00;
}
</style>