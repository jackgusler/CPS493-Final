<script setup lang="ts">
import { ref } from 'vue'
import { getWorkouts, type Workout } from '../models/workouts'
import { getSession } from '@/models/session'
import { useMakePost, getPosts } from '../models/posts'
import { closeModal, openSuccessMessage } from '@/models/postModal'

const session = getSession()
const workoutsData = ref<Workout[]>([])
const showDangerMessage = ref(false)
const { makePost } = useMakePost()

let workoutChoice = -1
let description = ''
let picture = ''

const fetchData = async () => {
    workoutsData.value = await getWorkouts()
}

function getWorkout(id: number) {
    return workoutsData.value.find((workout) => workout.id === id) || null
}

function closeMessage() {
    showDangerMessage.value = false
}

function handleCloseModal() {
    closeMessage()
    closeModal()
    openSuccessMessage()
}

const makeAPost = async () => {
    if (workoutChoice === -1 || description === '' || picture === '') {
        showDangerMessage.value = true
        return;
    }
    if (session) {
        makePost(
            (await getPosts()).length,
            session.user?.id ?? -1,
            workoutChoice,
            picture,
            description,
            new Date()
        )
    }
    handleCloseModal()
}

function cancelPost() {
    workoutChoice = -1
    description = ''
    picture = ''
    closeModal()
    closeMessage()
}

fetchData()
</script>

<template>
    <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">
                    Make A Post!
                </p>
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
                <div class="button" @click="makeAPost">
                    Post
                </div>
                <div class="button" @click="cancelPost">
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
