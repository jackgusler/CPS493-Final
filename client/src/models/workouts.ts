import { ref } from "vue";
import { api } from "./session";
export const workoutsData = ref<Workout[]>([]);
export interface Workout {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  intensity: string;
  duration: number;
}

export async function getWorkouts(): Promise<Workout[]> {
  return await api("workouts");
}

export async function fetchWorkoutData() {
  workoutsData.value = await getWorkouts();
}

export function getWorkout(id: number) {
  return workoutsData.value.find((workout) => workout.id === id) ?? null;
}

export function getWorkoutByName(name: string): Promise<Workout> {
  return api(`workouts/name`, { name }, "GET");
}

export function useDeleteWorkout() {
  return {
    async deleteWorkout(id: number): Promise<Workout | null> {
      try {
        const workout = await api(`workouts/${id}`, {}, "DELETE");
        if (workout != undefined) {
          return workout;
        }
      } catch (error) {
        console.error("Error calling API:", error);
      }
      return null;
    },
  };
}

export function useUpdateWorkout() {
  return {
    async updateWorkout(
      id: number,
      updatedFields: Partial<Workout>
    ): Promise<Workout | null> {
      try {
        const workout = await api(
          `workouts/${id}`,
          {
            id,
            ...updatedFields,
          },
          "PATCH"
        );
        if (workout != undefined) {
          return workout;
        }
      } catch (error) {
        console.error("Error calling API:", error);
      }
      return null;
    },
  };
}