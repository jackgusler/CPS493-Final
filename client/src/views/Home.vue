<script setup lang="ts">
import WorkoutList from "../components/WorkoutList.vue";
import Friends from "../components/FriendFeed.vue";

</script>

<template>
    <div class="container">
        <div class="columns">
            <div class="column is-half">
                <WorkoutList />
            </div>
            <div class="column is-half">
                <Friends />
            </div>
        </div>
    </div>
</template>

<style scoped></style>