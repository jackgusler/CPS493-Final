import { ref } from "vue";
import { type User, getUsers } from "./users";
import { type Workout, getWorkouts } from "./workouts";

export const isModalActive = ref(false);
export const workoutId = ref(0);
export const workoutsData = ref<Workout[]>([]);
export const usersData = ref<User[]>([]);

export function openModal(id: number) {
  workoutId.value = id;
  isModalActive.value = true;
}

export function closeModal() {
  isModalActive.value = false;
}

export const fetchData = async () => {
  workoutsData.value = await getWorkouts();
}
