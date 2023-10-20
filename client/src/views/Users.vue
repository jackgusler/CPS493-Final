<script setup lang="ts">
import type { Workout } from '@/models/workouts';
import { ref } from 'vue';
import Users from '../data/users.json'
import workoutsData from '../data/workouts.json'


const workout = ref<Workout | null>(null)

function getWorkout(id: number) {
    return workout.value = workoutsData.workouts.find((workout) => workout.id === id) || null;
}

</script>

<template>
    <div class="container">
        <nav class="panel">

            <p class="panel-heading">
                Users
            </p>
            <div class="panel-block">
                <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Workouts</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in Users.users" :key="user.id">
                            <td>{{ user.firstName }} {{ user.lastName }}</td>
                            <td>{{ user.username }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.role }}</td>
                            <td>
                                <div class="select is-full-width">
                                    <select class="form-control">
                                        <option v-for="w in user?.workoutsByIds" :key="w" :value="w">
                                            {{ getWorkout(w)?.name }}
                                        </option>
                                    </select>
                                </div>
                            </td>
                            <td>
                                <div class="button">
                                    <span class="icon is-small">
                                        <i class="fas fa-edit"></i>
                                    </span>
                                </div>
                            </td>
                            <td>
                                <div class="button">
                                    <span class="icon is-small">
                                        <i class="fas fa-trash"></i>
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </nav>
    </div>
</template>

<style scoped>
.panel-block {
    display: flex;
    flex-direction: column;
}

.table-container {
    overflow: auto;
    max-height: 1125px;
}

thead {
    position: sticky;
    top: 0;
    background-color: #cccccc;
    z-index: 100;
}
</style>