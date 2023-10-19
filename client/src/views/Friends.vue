<script setup lang="ts">
import Friends from "../components/FriendFeed.vue";
import Users from "../components/UserFeed.vue";
</script>

<template>
    <div class="container">
        <div class="columns">
            <div class="column is-half">
                <Friends />
            </div>
            <div class="column is-half">
                <Users />
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>