<script setup lang="ts">
import { fetchData, workoutsData, openModal, isModalActive } from '@/models/deleteWorkoutModal';
import DeleteWorkoutModal from '@/components/DeleteWorkoutModal.vue';

fetchData();
</script>

<template>
    <div class="container">
        <nav class="panel">
            <p class="panel-heading">
                Workouts
            </p>
            <div class="panel-block">
                <div class="table-container">
                    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Image</th>
                                <th>Category</th>
                                <th>Intensity</th>
                                <th>Duration</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="workout in workoutsData" :key="workout.id">
                                <td>{{ workout.name }}</td>
                                <td>{{ workout.description }}</td>
                                <td>{{ workout.image }}</td>
                                <td>{{ workout.category }}</td>
                                <td>{{ workout.intensity }}</td>
                                <td>{{ workout.duration }}</td>
                                <td>
                                    <div class="button">
                                        <span class="icon is-small">
                                            <i class="fas fa-edit"></i>
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <div class="button" @click="openModal(workout.id ?? -1)">
                                        <span class="icon is-small">
                                            <i class="fas fa-trash"></i>
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </nav>
    </div>
    <DeleteWorkoutModal :class="{ 'is-active': isModalActive }" />
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
    z-index: 19;
}
</style>