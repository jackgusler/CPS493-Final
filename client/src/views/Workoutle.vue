<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import { type Workout } from '@/models/workouts';
import workoutsData from '@/data/workouts.json';

const unusedWorkouts = ref<Workout[]>(workoutsData.workouts)
const usedWorkouts = ref<Workout[]>([])
const randomWorkout = ref<Workout | null>(null)
let grid = 0
const gameStarted = ref<boolean>(false)
const hint = ref<string>('')
const userGuess = ref<string>('')
const inputFields = ref<HTMLElement[]>([]);

function getRandomWorkout() {
    if (unusedWorkouts.value.length === 0) {
        unusedWorkouts.value = usedWorkouts.value;
        usedWorkouts.value = [];
    }
    const randomIndex = Math.floor(Math.random() * unusedWorkouts.value.length);
    const randomWorkoutValue = unusedWorkouts.value[randomIndex];
    if(randomWorkoutValue?.name.length <= 22)
    {
        usedWorkouts.value.push(randomWorkoutValue);
        unusedWorkouts.value.splice(randomIndex, 1);
        randomWorkoutValue.name = randomWorkoutValue.name.replace(/[\s\W]/g, '');
        randomWorkoutValue.name = randomWorkoutValue.name.toUpperCase();
        randomWorkout.value = randomWorkoutValue;
    } else {
        getRandomWorkout();
    }
}

function startGame() {
    getRandomWorkout();
    grid = randomWorkout.value?.name.length || 0;
    gameStarted.value = true;
}

function handleKeyUp(index: number) {
    
    inputFields.value[index + 1].focus();
    if (index === grid - 1) {
        checkGuess();
    }
}

function checkGuess() {
    if (userGuess.value.toUpperCase() === randomWorkout.value?.name) {
        hint.value = 'Congratulations! You guessed the correct workout, you won!';
    } else {
        hint.value = 'Sorry, thats not the correct workout. Try again.';
    }
    userGuess.value = ''; // Clear the input field
}

</script>

<template>
    <div class="container">
        <strong>Workoutle</strong>
        <h2>Guess the workout in 6 guesses!</h2>
        <div class="button" @click="startGame">Start</div>
        <div v-if="gameStarted == true">
            <div :class="gameStarted ? 'big-box' : 'grid-box'">
                <div v-for="i in 6" :key="i" class="columns">
                    <div v-for="(letter, index) in randomWorkout?.name" :key="index">
                        <input
                            ref="inputFields"
                            v-model="userGuess[index]"
                            @keyup="handleKeyUp(index)"
                            maxlength="1"
                        />
                    </div>
                </div>
            </div>
            <div>Hint 1 - Duration: {{ randomWorkout?.duration }}</div>
            <div>Hint 2 - Intensity: {{ randomWorkout?.intensity }}</div>
            <div>Hint 3 - Category: {{ randomWorkout?.category }}</div>
            <div>Hint 4 - Ends with: {{ randomWorkout?.name[randomWorkout?.name.length-1] }}</div>
            <div>Hint 5 - Starts with: {{ randomWorkout?.name[0] }}</div>
            <div>{{randomWorkout?.name}}</div>
        </div>
    </div>
</template>

<style scoped>

input{
    height: 50px;
    width: 50px;
    font-size: 2rem;
    text-align: center;
    margin: 0.1rem;
    border-radius: 10px;
    border: 1px solid #ccc;
    outline: none;
    text-transform: uppercase;

}
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 75vh;
    margin-top: 1rem;
    margin-bottom: 1rem;
}
.big-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    padding: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.grid-box {
    /* CSS styles for the grid box */
    width: 75vw;
    background-color: #f5f5f5;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    padding: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
}
strong{
    font-size: 2rem;
    margin-bottom: 1rem;
}
h2{
    margin-bottom: 1rem;
}
</style>