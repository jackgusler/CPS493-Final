import { ref } from "vue";
import { type User, getUsers } from "./users";
import { type Workout, getWorkouts } from "./workouts";

export const isModalActive = ref(false);
export const userId = ref(0);
export const workoutsData = ref<Workout[]>([]);
export const usersData = ref<User[]>([]);

export function openModal(id: number) {
  userId.value = id;
  isModalActive.value = true;
}

export function closeModal() {
  isModalActive.value = false;
}

export const fetchData = async () => {
  workoutsData.value = await getWorkouts();
  usersData.value = await getUsers();
};

export function getWorkout(id: number) {
  return workoutsData.value.find((workout) => workout.id === id) ?? null;
}
