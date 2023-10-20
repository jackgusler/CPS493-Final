<script setup lang="ts">
import { type Post } from '../models/posts'
import postData from '../data/posts.json'
import userData from '../data/users.json'
import { getSession } from '@/models/session'
import workoutsData from '../data/workouts.json'
import { computed, ref } from 'vue'

const session = getSession()
let posts = ref<Post[]>(postData.posts)
posts = ref(posts.value.slice().reverse())

const searchQuery = ref('')

const filteredPosts = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return posts.value.filter((post) => {
    const username = userData.users[post.userId].username.toLowerCase()
    return username.includes(query)
  })
})

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
                            {{ userData.users[post.userId].username }}
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
                                        {{ userData.users[post.userId].firstName }} {{
                                            userData.users[post.userId].lastName }}
                                    <p class="subtitle is-6">
                                        {{ workoutsData.workouts[post.workoutId].name }}
                                    </p>
                                    </p>
                                </div>
                            </div>
                            <hr>
                            <div class="content">
                                {{ post.description }}
                                <hr>
                                <time>{{ post.date }}</time>
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