<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'
import { type Workout } from '../models/workouts'
import workoutsData from '../data/workouts.json'
import isActive from '../components/PostModal.vue'

const activeTab = ref('All')
const workouts = ref<Workout[]>(workoutsData.workouts)
const activeButton = ref<number>(workouts.value[0].id || 0)
const selectedWorkout = ref<Workout | null>(workouts.value[0] || null)

watch(activeTab, (newVal) => {
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
        selectedWorkout.value = workouts.value.find((workout) => workout.id === workoutId) || null;
    }
}

function openPostModal() {
    isActive.value = true
}

</script>


<template>
    <div class="container">
        <div class="columns">
            <div class="column is-one-fourth">
                <div id="app">
                    <nav class="panel">
                        <p class="panel-heading">
                            Workouts
                        </p>
                        <div class="panel-block">
                            <p class="control has-icons-left">
                                <input class="input" type="text" placeholder="Search">
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
                                <p v-for="workout in workouts" :key="workout.id" class="workouts">
                                    <div class="button" :class="{ 'is-green': activeButton === workout.id }" @click="toggle(workout.id)">
                                        {{ workout.name }}
                                    </div>
                                </p>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            <div class="column is-one-fourth">
                <div class="panel">
                    <p class="panel-heading workout-name">
                        {{ selectedWorkout?.name}}
                    </p>
                    <div class="panel-block workout-description">
                        <p>
                            {{ selectedWorkout?.description}}
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
                        <div class="button">Add to personal workouts</div>
                    </div>
                    <div class="panel-block">
                        <div class="button" @click="openPostModal">Make a post</div>
                    </div>
                </div>
            </div>
            <div class="column is-half">
                <nav class="panel">
                    <p class="panel-heading">
                        Friends
                    </p>
                    <div class="panel-block">
                        <p class="control has-icons-left">
                            <input class="input" type="text" placeholder="Search">
                            <span class="icon is-left">
                                <i class="fas fa-search" aria-hidden="true"></i>
                            </span>
                        </p>
                    </div>
                    <div class="panel-block">
                        <div class="card">
                            <div class="card-image">
                                <figure class="image is-4by3">
                                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
                                </figure>
                            </div>
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-left">
                                        <figure class="image is-48x48">
                                            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="title is-4">John Smith</p>
                                        <p class="subtitle is-6">@johnsmith</p>
                                    </div>
                                </div>
                                <div class="content">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                                    <a href="#">#css</a> <a href="#">#responsive</a>
                                    <br>
                                    <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>
</template>

<style scoped>
.box, .panel {
    height: 75vh;
    background-color: #f5f5f5;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
}
.panel-heading {
    background-color: #CCCCCC;
}
.container {
    margin-top: 1rem;
    margin-bottom: 1rem;
}
.card {
    margin-left: 0px;
    width: 48%;
}
.wrapper{
    overflow-x: auto; 
    min-width: 294px;
    max-width: 294px;
    min-height: 62vh;
    max-height: 62.78vh;
}
.workouts{
    margin: 0px;
    padding: 2px;
    width: 96%;
    height: 100%;
    display: grid;
}
.button:hover{
    border: 1px solid #000000;
    border-radius: 5px;
    padding: 0px;
    margin: 0px;
}
.button{
    width: 100%;
    height: 100%;
    border: 1px solid #CCCCCC;
    border-radius: 5px;
    padding: 0px;
    margin: 0px;
}
.button.is-green{
    background-color: #00ff00;
    border: 1px solid #000000;
    border-radius: 5px;
}
.workout-image{
    margin: 10px;
}
.panel-tabs a{
    color: #000000;
}
.panel-tabs a:hover{
    border-color: #000000;
}
.panel-tabs a.is-active{
    border-color: #000000;
    font-weight: 400;
}
</style>