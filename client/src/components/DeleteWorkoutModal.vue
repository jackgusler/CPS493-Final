<script setup lang="ts">
import { isDeleteModalActive, workoutId } from '@/models/deleteWorkoutModal';
import { useDeleteWorkout, fetchWorkoutData } from '@/models/workouts';

const { deleteWorkout } = useDeleteWorkout();

function confirmDeleteWorkout(id: number) {
    isDeleteModalActive.value = false;
    return deleteWorkout(id).then(fetchWorkoutData)
}

function cancel() {
    isDeleteModalActive.value = false;
    workoutId.value = -1;
}

</script>

<template>
    <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <div class="message is-danger">
                <div class="message-body">
                    Are you sure you want to delete the workout with the id of {{ workoutId }}?
                    <div class="modal-card-foot">
                        <div class="button" @click="confirmDeleteWorkout(workoutId)">
                            Delete
                        </div>
                        <div class="button" @click="cancel">
                            Cancel
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-card-foot {
    background-color: transparent;
    border: none;
}
</style>