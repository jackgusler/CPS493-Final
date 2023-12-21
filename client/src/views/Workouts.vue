<script setup lang="ts">
import {
  openDeleteModal,
  isDeleteModalActive,
} from "@/models/deleteWorkoutModal";
import DeleteWorkoutModal from "@/components/DeleteWorkoutModal.vue";
import { openEditModal, isEditModalActive } from "@/models/editWorkoutModal";
import EditWorkoutModal from "@/components/EditWorkoutModal.vue";
import {
  workoutsData,
  fetchWorkoutData,
  searchWorkouts,
  type Workout,
} from "@/models/workouts";
import { computed, onMounted, ref } from "vue";
import { api } from "@/models/session";

const openEditModalThenFetch = async (id: number) => {
  openEditModal(id);
  await fetchWorkoutData();
};
const openDeleteModalThenFetch = async (id: number) => {
  openDeleteModal(id);
  await fetchWorkoutData();
};

onMounted(async () => {
  await fetchWorkoutData();
});

const isFetching = ref(false);
const page = ref(1);
const totalPages = ref(1);

const data = ref<Workout[]>([]);
const selected = ref<Workout | null>(null);
const name = ref("");

async function getAsyncData(_name: string) {
  if (name.value !== _name) {
    name.value = _name;
    data.value = [];
    page.value = 1;
    totalPages.value = 1;
  }

  // String cleared
  if (!_name.length) {
    data.value = [];
    page.value = 1;
    totalPages.value = 1;
    return;
  }

  // Reached last page
  if (page.value > totalPages.value) {
    return;
  }

  isFetching.value = true;
  try {
    const _data = await searchWorkouts(_name, page.value);

    data.value = [...data.value, ..._data.results];
    page.value += 1;
    totalPages.value = 1; //_data.total_pages;
  } catch (err) {
    console.error(err);
  } finally {
    isFetching.value = false;
  }
}

function getMoreAsyncData() {
  getAsyncData(name.value);
}
</script>

<template>
  <div class="container">
    <nav class="panel">
      <p class="panel-heading">Workouts</p>
      <div class="panel-block">
        <o-field label="Find a workout">
          <o-autocomplete
            :data="data"
            placeholder="e.g. Running"
            field="name"
            :loading="isFetching"
            check-scroll
            open-on-focus
            :debounce="500"
            @input="getAsyncData"
            @select="(option: Workout) => (selected = option)"
            @scroll-end="getMoreAsyncData"
          >
            <template #default="props">
              <div class="media">
                <div class="media-left">
                  <img width="32" :src="props.option.image" />
                </div>
                <div class="media-content">
                  {{ props.option.name }}
                </div>
                <div class="media-content">
                  {{ props.option.description }}
                </div>
              </div>
            </template>
            <template v-if="page > totalPages" #footer>
              <span class="ex-text-grey">
                Thats it! No more workouts found.
              </span>
            </template>
          </o-autocomplete>
        </o-field>
        <p><b>Selected:</b> {{ selected }}</p>
      </div>
      <div class="panel-block">
        <div class="table-container">
          <table
            class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
          >
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
                  <div
                    class="button"
                    @click="openEditModalThenFetch(workout.id ?? -1)"
                  >
                    <span class="icon is-small">
                      <i class="fas fa-edit"></i>
                    </span>
                  </div>
                </td>
                <td>
                  <div
                    class="button"
                    @click="openDeleteModalThenFetch(workout.id ?? -1)"
                  >
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
  <EditWorkoutModal :class="{ 'is-active': isEditModalActive }" />
  <DeleteWorkoutModal :class="{ 'is-active': isDeleteModalActive }" />
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
