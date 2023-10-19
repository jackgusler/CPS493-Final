<script setup lang="ts">
import { handleError, ref } from 'vue';
import { type Workout } from '../models/workouts';
import workoutsData from '../data/workouts.json';
import { getSession } from '@/models/session';
import { type Post } from '../models/posts';
import postData from '../data/posts.json';
import { closeModal, openSuccessMessage } from '@/models/postModal';

const session = getSession()
const workout = ref<Workout | null>(null)
const post = ref<Post | null>(null)
const showDangerMessage = ref(false)

let workoutChoice = 0
let description = ''
let picture = ''

function getWorkout(id: number) {
    return workout.value = workoutsData.workouts.find((workout) => workout.id === id) || null;
}

function closeMessage() {
    showDangerMessage.value = false;
}

function handleCloseModal() {
    closeMessage()
    closeModal()
    openSuccessMessage()
}

function makeAPost() {
    if (workoutChoice === 0 || description === '' || picture === '') {
        showDangerMessage.value = true;
        return;
    }
    if (session) {
        post.value = {
            userId: session.user?.id || 0,
            workoutId: workoutChoice,
            picture: picture,
            description: description,
            date: new Date().toLocaleDateString()
        }
        postData.posts.push(post.value)
    }
    handleCloseModal()
}

</script>

<template>
    <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">
                    Make A Post!
                </p>
                <div class="delete" aria-label="close" @click="handleCloseModal"></div>
            </header>
            <section class="modal-card-body">
                <div class="field">
                    <label class="label" for="workout">
                        Workout
                    </label>
                    <div class="select is-full-width">
                        <select class="form-control" v-model="workoutChoice">
                            <option v-for="w in session.user?.workoutsByIds" :key="w" :value="w">
                                {{ getWorkout(w)?.name }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="field">
                    <label class="label" for="description">
                        Description
                    </label>
                    <input v-model="description" type="text" class="input" id="description">
                </div>
                <div class="field">
                    <label class="label" for="description">
                        Picture
                    </label>
                    <input v-model="picture" type="text" class="input" id="description">
                </div>
                <!--
                <div class="field">
                    <label class="label" for="picture">
                        Picture
                    </label>
                    <div class="file has-name">
                        <label class="file-label">
                            <input class="file-input" type="file" name="picture" accept="image/*">
                            <span class="file-cta">
                                <span class="file-icon">
                                    <i class="fas fa-upload"></i>
                                </span>
                                <span class="file-label">
                                    Choose an image file…
                                </span>
                            </span>
                        </label>
                    </div>
                </div>
                -->
                <div class="message is-danger" v-if="showDangerMessage">
                    <div class="message-body">
                        Please fill out all the fields!
                        <div class="delete message-delete" aria-label="close" @click="closeMessage"></div>
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot">
                <div class="button is-success" @click="makeAPost">
                    Post
                </div>
                <div class="button" @click="handleCloseModal">
                    Cancel
                </div>
            </footer>
        </div>
    </div>
</template>

<style scoped>
.message-delete {
    left: 60%;
}
</style>
