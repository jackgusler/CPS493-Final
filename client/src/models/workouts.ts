import { api } from "./session"
export interface Workout {
    id: number
    name: string
    description: string
    image: string
    category: string
    intensity: string
    duration: number
}

export async function getWorkouts(): Promise<Workout[]> {
    return await api("workouts")
}

export function getWorkoutByName(name: string): Promise<Workout> {
    return api(`workouts/name`, { name }, "GET")
}

export function useDeleteWorkout() {
    return {
        async deleteWorkout(id: number): Promise<Workout | null> {
            try {
                const workout = await api(`workouts/${id}`, {}, "DELETE")
                if (workout != undefined) {
                    return workout
                }
            } catch (error) {
                console.error("Error calling API:", error)
            }
            return null
        },
    }
}