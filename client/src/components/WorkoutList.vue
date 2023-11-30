<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { getWorkouts, type Workout } from '../models/workouts'
import { getSession } from '@/models/session'
import { useUpdateUser } from '@/models/users';

const session = getSession()

const { updateUser } = useUpdateUser();

const activeTab = ref('All');
const originalWorkoutsData = ref<Workout[]>([]);
const workoutsData = ref<Workout[]>([])

const activeButton = ref<number>(0)
const selectedWorkout = ref<Workout | null>(null)
const searchQuery = ref('')

const isInUserWorkouts = ref(false);

const fetchData = async () => {
    originalWorkoutsData.value = await getWorkouts();
    workoutsData.value = originalWorkoutsData.value;
    if (workoutsData.value.length > 0) {
        activeButton.value = workoutsData.value[0].id
        selectedWorkout.value = workoutsData.value[0]
    }
}

const filteredWorkouts = computed(() => {
    const query = searchQuery.value.toLowerCase()
    return workoutsData.value.filter((workout) => {
        return workout.name.toLowerCase().includes(query)
    })
})

watch(activeTab, (newVal) => {
    // Update the filtered workouts based on the activeTab selection
    if (newVal === 'All') {
        workoutsData.value = originalWorkoutsData.value.slice();
    } else if (newVal === 'Strength') {
        workoutsData.value = originalWorkoutsData.value.filter((workout) => {
            return workout.category.includes('Strength')
        })
    } else {
        workoutsData.value = originalWorkoutsData.value.filter((workout) => {
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
        selectedWorkout.value = workoutsData.value.find((workout) => workout.id === workoutId) || null
    }
}

function updateUserWorkouts() {
    isInUserWorkouts.value = session?.user?.workoutsByIds?.includes(selectedWorkout?.value?.id ?? -1) ?? false;
}

function addToPersonalWorkouts(id: number) {
    if (id < 0 || !session || !session.user) {
        return;
    }
    if (session) {
        updateUser(
            session.user?.id ?? -1,
            session.user?.firstName ?? '',
            session.user?.lastName  ?? '',
            session.user?.username ?? '',
            session.user?.email ?? '',
            session.user?.password ?? '',
            session.user?.admin ?? false,
            session.user?.workoutsByIds?.concat(id) ?? [id] ?? [],        
        ).then(() => {
            updateUserWorkouts();
        })
    }
}

fetchData()
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