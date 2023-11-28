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

export function getWorkouts(): Promise<Workout[]> {
    return api("workouts")
}

export function getWorkoutByName(name: string): Promise<Workout> {
    return api(`workouts/name`, { name }, "GET")
}