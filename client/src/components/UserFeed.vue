<script setup lang="ts">
import { type Post } from '../models/posts'
import postData from '../data/posts.json'
import userData from '../data/users.json'
import { getSession } from '@/models/session';
import workoutsData from '../data/workouts.json'
import { ref } from 'vue';

const session = getSession()
let posts = ref<Post[]>(postData.posts)

let userPosts = ref(posts.value.filter((post) => post.userId === session.user?.id))
userPosts = ref(userPosts.value.slice().reverse());

</script>

<template>
    <nav class="panel">
        <p class="panel-heading">
            Your Posts
        </p>
        <div class="panel-block">
            <p class="control has-icons-left">
                <input class="input" type="text" placeholder="Search">
                <span class="icon is-left">
                    <i class="fas fa-search" aria-hidden="true"></i>
                </span>
            </p>
        </div>
        <div class="wrapper">
            <div v-for="post in userPosts" :key="post.userId">
                <div :class="{ 'is-right': post.userId === session.user?.id }">
                    <div class="panel-block is-right">
                        <div class="card">
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
        </div>
    </nav>
</template>


<style scoped>
.card {
    margin-left: 0px;
    width: 48%;
}

.wrapper {
    overflow-x: auto;
    width: 100%;
    min-height: 50vh;
    max-height: 84vh;
}
</style>