<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'
import { type Workout } from '../models/workouts'
import workoutsData from '../data/workouts.json'

let isActive = ref(false)

</script>

<template>
    <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-content">
            <!-- Any other Bulma elements you want -->
        </div>
        <div class="button modal-close is-large" aria-label="close"></div>
    </div>
</template>

<style scoped>

</style>