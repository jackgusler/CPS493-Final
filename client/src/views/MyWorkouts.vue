<script setup lang="ts">
import PersonalWorkouts from "@/components/PersonalWorkouts.vue";
import WorkoutList from "../components/WorkoutList.vue";

</script>

<template>
    <div class="container">
        <div class="columns">
            <div class="column is-half">
                <WorkoutList />
            </div>
            <div class="column is-half">
                <PersonalWorkouts />
            </div>
        </div>
    </div>
</template>

<style scoped></style>