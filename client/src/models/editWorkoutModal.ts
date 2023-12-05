import { ref } from "vue";
import { getWorkout, type Workout } from "./workouts";

export const isEditModalActive = ref(false);
export const workoutId = ref(0);
export const selectedWorkout = ref<Workout | null>(null);

export async function openEditModal(id: number) {
  workoutId.value = id;
  isEditModalActive.value = true;
  const workout = await getWorkout(id);
  selectedWorkout.value = workout ? workout : null;
}
