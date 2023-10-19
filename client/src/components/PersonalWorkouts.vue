<script setup lang="ts">
import { getSession } from '@/models/session';
import { type Workout } from '../models/workouts'
import workoutsData from '../data/workouts.json'
import { ref } from 'vue';
import PostModal from './PostModal.vue';
import { isModalActive, closeSuccessMessage, successMessage, openModal } from '@/models/postModal';

const session = getSession()
const workout = ref<Workout | null>(null)

function getWorkout(id: number) {
    return workout.value = workoutsData.workouts.find((workout) => workout.id === id) || null;
}

</script>

<template>
    <div class="panel">
        <p class="panel-heading">
            Personal Workouts
        </p>
        <div v-if="session.user?.workoutsByIds">
            <div v-for="(w, index) in session.user.workoutsByIds" class="panel-block" :key="index">
                {{ getWorkout(w)?.name }}
            </div>
        </div>
        <div class="panel-block">
            <div class="button" @click="openModal">
                Make post
            </div>
        </div>
        <div v-if="successMessage">
            <div class="panel-block">
                <div class="message is-success">
                    <div class="message-header">
                        <p>Success</p>
                        <button class="delete" aria-label="delete" @click="closeSuccessMessage"></button>
                    </div>
                    <div class="message-body">
                        Your post has been successfully created!
                    </div>
                </div>
            </div>
        </div>
    </div>
    <PostModal :class="{ 'is-active': isModalActive }" />
</template>

<style scoped></style>