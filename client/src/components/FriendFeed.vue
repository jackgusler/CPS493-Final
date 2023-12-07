<script setup lang="ts">
import { watch } from 'vue'
import { searchQuery, fetchFriendData, updateFilteredPosts, session, workoutsData, usersData, filteredPosts } from '@/models/deletePostModal';

watch(searchQuery, updateFilteredPosts);

function formatDate(dateString: string) {
    const date = new Date(dateString)
    const month = date.getMonth() + 1
    const day = date.getDate()
    const year = date.getFullYear()
    return `${month}/${day}/${year}`
}

fetchFriendData();
</script>

<template>
    <nav class="panel">
        <p class="panel-heading">
            Home Feed
        </p>
        <div class="panel-block">
            <p class="control has-icons-left">
                <input class="input" type="text" placeholder="Search by username!" v-model="searchQuery">
                <span class="icon is-left">
                    <i class="fas fa-search" aria-hidden="true"></i>
                </span>
            </p>
        </div>
        <div class="wrapper">
            <div v-for="post in filteredPosts" :key="post.userId">
                <div class="panel-block" :class="{ 'is-right': post.userId === session.user?.id }">
                    <div class="card">
                        <p class="username">
                            @{{ usersData[post.userId] ? usersData[post.userId].username : '' }}
                        </p>
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <img :src="post?.picture">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-4">
                                        {{ usersData[post.userId] ? usersData[post.userId].firstName : '' }} {{
                                            usersData[post.userId] ? usersData[post.userId].lastName : '' }}
                                    <p class="subtitle is-6">
                                        {{ workoutsData[post.workoutId] ? workoutsData[post.workoutId].name : '' }}
                                    </p>
                                    </p>
                                </div>
                            </div>
                            <hr>
                            <div class="content">
                                {{ post.description }}
                                <hr>
                                <time>{{ formatDate(post.date) }}</time>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>


<style scoped>
.card {
    margin-left: 0px;
    width: 48%;
    border: 2px solid black;
}

.wrapper {
    overflow-x: auto;
    width: 100%;
    min-height: 50vh;
    max-height: 84vh;
}

.username {
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    border-bottom: 2px solid black;
}

.is-right {
    justify-content: right;
}
</style>