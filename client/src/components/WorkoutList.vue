<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { type Workout } from '../models/workouts'
import workoutsData from '../data/workouts.json'
import { getSession } from '@/models/session'

const session = getSession()

const activeTab = ref('All');
const workouts = ref<Workout[]>(workoutsData.workouts)
const activeButton = ref<number>(workouts.value[0].id || 0)
const selectedWorkout = ref<Workout | null>(workouts.value[0] || null)
const searchQuery = ref('')

const filteredWorkouts = computed(() => {
    const query = searchQuery.value.toLowerCase()
    return workouts.value.filter((workout) => {
        return workout.name.toLowerCase().includes(query)
    })
})

watch(activeTab, (newVal) => {
    // Update the filtered workouts based on the activeTab selection
    if (newVal === 'All') {
        workouts.value = workoutsData.workouts
    } else if (newVal === 'Strength') {
        workouts.value = workoutsData.workouts.filter((workout) => {
            return workout.category.includes('Strength')
        })
    } else {
        workouts.value = workoutsData.workouts.filter((workout) => {
            return workout.category === newVal
        })
    }
})

function setActiveTab(tabName: string) {
    activeTab.value = tabName
}

function toggle(workoutId: number) {
    if (activeButton.value !== workoutId) {
        activeButton.value = workoutId
        selectedWorkout.value = workouts.value.find((workout) => workout.id === workoutId) || null
    }
}

function addToPersonalWorkouts(id: number) {
    if (id < 0) {
        return
    }
    if (session) {
        session.user?.workoutsByIds?.push(id)
    }
}
</script>


<template>
    <div class="columns">
        <div class="column is-one-fourth">
            <nav class="panel">
                <p class="panel-heading">
                    Workouts
                </p>
                <div class="panel-block">
                    <p class="control has-icons-left">
                        <input class="input" type="text" placeholder="Search" v-model="searchQuery">
                        <span class="icon is-left">
                            <i class="fas fa-search" aria-hidden="true"></i>
                        </span>
                    </p>
                </div>
                <p class="panel-tabs">
                    <a @click="setActiveTab('All')" :class="{ 'is-active': activeTab === 'All' }">All</a>
                    <a @click="setActiveTab('Cardio')" :class="{ 'is-active': activeTab === 'Cardio' }">Cardio</a>
                    <a @click="setActiveTab('Strength')" :class="{ 'is-active': activeTab === 'Strength' }">Strength</a>
                    <a @click="setActiveTab('Yoga')" :class="{ 'is-active': activeTab === 'Yoga' }">Yoga</a>
                    <a @click="setActiveTab('Pilates')" :class="{ 'is-active': activeTab === 'Pilates' }">Pilates</a>
                </p>
                <div class="panel-block">
                    <div class="wrapper">
                        <p v-for="workout in filteredWorkouts" :key="workout.id" class="workouts">
                        <div class="button" :class="{ 'is-green': activeButton === workout.id }"
                            @click="toggle(workout.id)">
                            {{ workout.name }}
                        </div>
                        </p>
                    </div>
                </div>
            </nav>
        </div>
        <div class="column is-one-fourth">
            <div class="panel">
                <p class="panel-heading workout-name">
                    {{ selectedWorkout?.name }}
                </p>
                <div class="panel-block workout-description">
                    <p>
                        {{ selectedWorkout?.description }}
                    </p>
                </div>
                <figure class="image is-4by3 workout-image">
                    <img src="https://bulma.io/images/placeholders/256x256.png" alt="Placeholder image">
                </figure>
                <div class="panel-block" v-if="selectedWorkout?.category.includes('Strength')">
                    Category: {{ selectedWorkout?.category }}
                </div>
                <div class="panel-block">
                    Duration: {{ selectedWorkout?.duration }}
                </div>
                <div class="panel-block">
                    Intensity: {{ selectedWorkout?.intensity }}
                </div>
                <div class="panel-block">
                    <div v-if="selectedWorkout && !session?.user?.workoutsByIds?.includes(selectedWorkout?.id)"
                        class="button" @click="addToPersonalWorkouts(selectedWorkout?.id)">
                        Add to personal workouts
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>