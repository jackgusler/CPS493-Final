<script setup lang="ts">
import { getSession } from '@/models/session'
import { getWorkouts, type Workout } from '../models/workouts'
import { onMounted, ref } from 'vue'
import PostModal from './PostModal.vue'
import { isModalActive, closeSuccessMessage, successMessage, openModal } from '@/models/postModal'
import { useUpdateUser } from '@/models/users'

const session = getSession()
const workoutsData = ref<Workout[]>([])
const { updateUser } = useUpdateUser()

const fetchData = async () => {
    workoutsData.value = await getWorkouts()
}

function getWorkout(id: number) {
    return workoutsData.value.find((workout) => workout.id === id) || null;
}

function removeWorkout(id: number) {
    updateUser(
        session.user?.id ?? -1,
        {
            workoutsByIds: session.user?.workoutsByIds.filter((workout) => workout !== id) ?? [],
        }
    )
}

fetchData()

onMounted(() => {
    closeSuccessMessage()
})

</script>

<template>
    <div class="panel">
        <p class="panel-heading">
            Personal Workouts
        </p>
        <div class="wrapper">
            <div v-if="session.user?.workoutsByIds">
                <div v-for="(w, index) in session.user.workoutsByIds" class="panel-block" :key="index">
                    {{ getWorkout(w)?.name }}
                    <!--delete button-->
                    <div class="button is-trash" @click="removeWorkout(w)">
                        <span class="icon">
                            <i class="fas fa-trash"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <!-- if session.user?.workoutsByIds is greater than 0-->
        <div v-if="session.user?.workoutsByIds?.length ?? 0 > 0" class="panel-block">
            <div class="button" @click="openModal">
                Make post
            </div>
        </div>
        <div v-else class="panel-block is-middle">
            <p class="is-big">You have no personal workouts! Add a workout to your personal workouts to make a post!</p>
        </div>
        <div v-if="successMessage">
            <div class="panel-block">
                <div class="message is-success is-centered">
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

<style scoped>
.message {
    border: 2px solid #000;
    border-radius: 5px;
}

.wrapper {
    min-height: 0px;
    max-height: 71vh;
}

.is-centered {
    margin: auto;
}

.button.is-trash {
    margin-left: auto;
    width: 5%;
}

.is-big {
    font-weight: bold;
    font-style: italic;
    font-size: 20px;
    justify-content: center;
    color: #7e7e7e;
}
</style>