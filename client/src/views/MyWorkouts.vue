<script setup lang="ts">
import PersonalWorkouts from "@/components/PersonalWorkouts.vue";
import WorkoutList from "../components/WorkoutList.vue";

</script>

<template>
    <div class="container">
        <div class="columns">
            <div class="column is-three-fifths">
                <WorkoutList />
            </div>
            <div class="column is-two-fifths">
                <PersonalWorkouts />
            </div>
        </div>
    </div>
</template>

<style scoped></style>