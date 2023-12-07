<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import DeletePostModalVue from './DeletePostModal.vue';
import { isModalActive, openModal, fetchUserData, postsData, usersPosts, workoutsData, usersData, session } from '@/models/deletePostModal';

const searchQuery = ref('')

watch(() => session.user, () => {
    usersPosts.value = postsData.value.filter((post) => post.userId === session.user?.id)
})

const filteredPosts = computed(() => {
    const query = searchQuery.value.toLowerCase()
    return usersPosts.value.filter((post) => {
        const workoutName = workoutsData.value[post.workoutId] ? workoutsData.value[post.workoutId].name.toLowerCase() : '';
        return workoutName.includes(query)
    })
})

function formatDate(dateString: string) {
    const date = new Date(dateString)
    const month = date.getMonth() + 1
    const day = date.getDate()
    const year = date.getFullYear()
    return `${month}/${day}/${year}`
}

fetchUserData()
</script>

<template>
    <nav class="panel">
        <p class="panel-heading">
            Your Posts
        </p>
        <div class="panel-block">
            <p class="control has-icons-left">
                <input class="input" type="text" placeholder="Search by workout name!" v-model="searchQuery">
                <span class="icon is-left">
                    <i class="fas fa-search" aria-hidden="true"></i>
                </span>
            </p>
        </div>
        <div class="wrapper">
            <div v-for="post in filteredPosts" :key="post.userId">
                <div :class="{ 'is-right': post.userId === session.user?.id }">
                    <div class="panel-block is-right">
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
                                <div class="content is-fullwidth">
                                    {{ post.description }}
                                    <hr>
                                    <!--post.date but in MM/DD/YYYY-->
                                    <time>
                                        {{ formatDate(post.date) }}
                                        <div class="button is-trash" @click="openModal(post.id)">
                                            <span class="icon">
                                                <i class="fas fa-trash"></i>
                                            </span>
                                        </div>
                                    </time>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <DeletePostModalVue :class="{ 'is-active': isModalActive }" />
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

.username {
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    border-bottom: 2px solid black;
}

.card {
    border: 2px solid black;
}

.panel-block {
    justify-content: right;
}
.button.is-trash {
    width: 10%;
}
</style>