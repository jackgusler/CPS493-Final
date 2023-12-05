<script setup lang="ts">
import { workoutId, isEditModalActive, selectedWorkout } from "@/models/editWorkoutModal";
import { getSession } from "@/models/session";
import { type Workout, fetchWorkoutData, useUpdateWorkout } from "@/models/workouts";
import { ref, watch } from "vue";

const session = getSession();
const { updateWorkout } = useUpdateWorkout();
const errorMessage = ref("");
const isEditSubmitted = ref(false);

const newName = ref("");
const newDescription = ref("");
const newImage = ref("");
const newCategory = ref("");
const newIntensity = ref("");
const newDuration = ref(0);

async function validateEdit() {
    if (newName.value !== "" && newName.value.length < 1) {
        errorMessage.value = 'Name must not be empty.';
        return false;
    }
    if (newDescription.value !== "" && newDescription.value.length < 1) {
        errorMessage.value = 'Description must not be empty.';
        return false;
    }
    if (newImage.value !== "" && newImage.value.length < 1) {
        return false;
    }
    if (newCategory.value !== "" && newCategory.value.length < 1) {
        errorMessage.value = 'Category must not be empty.';
        return false;
    }
    if (newIntensity.value !== "" && newIntensity.value.length < 1) {
        errorMessage.value = 'Intensity must not be empty.';
        return false;
    }
    if (newDuration.value !== 0 && newDuration.value < 1) {
        errorMessage.value = 'Duration must not be empty.';
        return false;
    }
    return true;
}

const confirm = async () => {
    if (!(await validateEdit())) {
        isEditSubmitted.value = true;
        return;
    }
    const updatedFields: Partial<Workout> = {};
    if (newName.value !== "") {
        updatedFields.name = newName.value;
    }
    if (newDescription.value !== "") {
        updatedFields.description = newDescription.value;
    }
    if (newImage.value !== "") {
        updatedFields.image = newImage.value;
    }
    if (newCategory.value !== "") {
        updatedFields.category = newCategory.value;
    }
    if (newIntensity.value !== "") {
        updatedFields.intensity = newIntensity.value;
    }
    if (newDuration.value !== 0) {
        updatedFields.duration = newDuration.value;
    }

    isEditSubmitted.value = false;
    await updateWorkout(workoutId.value, updatedFields);
    await fetchWorkoutData();
    cancel();
}

const cancel = () => {
    newName.value = "";
    newDescription.value = "";
    newImage.value = "";
    newCategory.value = "";
    newIntensity.value = "";
    newDuration.value = 0;
    errorMessage.value = "";
    isEditSubmitted.value = false;
    isEditModalActive.value = false;
}

watch(selectedWorkout, (newWorkout) => {
    newDuration.value = newWorkout?.duration ?? 0;
})
</script>

<template>
    <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="box">
                <div class="field">
                    <label class="label">Name: {{ selectedWorkout?.name }} </label>
                    <div class="control">
                        <input class="input" type="text" placeholder="New Name" v-model="newName">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Description: {{ selectedWorkout?.description }} </label>
                    <div class="control">
                        <input class="input" type="text" placeholder="New Description" v-model="newDescription">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Image: {{ selectedWorkout?.image }} </label>
                    <div class="control">
                        <input class="input" type="text" placeholder="New Image" v-model="newImage">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Category: {{ selectedWorkout?.category }} </label>
                    <div class="control">
                        <input class="input" type="text" placeholder="New Category" v-model="newCategory">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Duration: {{ selectedWorkout?.duration }} </label>
                    <div class="control">
                        <input class="input" type="number" placeholder="New Duration" v-model.number="newDuration">
                    </div>
                </div>
                <div class="field">
                    <div class="message is-danger" v-if="isEditSubmitted">
                        <div class="message-body">{{ errorMessage }}</div>
                    </div>
                </div>
                <div class="field">
                    <div class="is-buttons">
                        <div class="button is-on-top" @click="confirm">Confirm</div>
                        <div class="button" @click="cancel">Cancel</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.is-buttons {
    display: block;
}

.is-on-top {
    margin-bottom: 10px;
}
</style>