import type { DataListEnvelope, DataEnvelope } from './fetch'
import { api } from './session'

export interface Workout {
    id: number
    name: string
    description: string
    image: string
    category: string
    intensity: string
    duration: string
}

export function getWorkouts(): Promise<DataListEnvelope<Workout>> {
    return api('workouts')
}

export function getWorkout(id: number): Promise<DataEnvelope<Workout>> {
    return api(`workouts/${id}`)
}

export function createWorkout(workout: Workout): Promise<DataEnvelope<Workout>> {
    return api('workouts/create', workout, 'POST')
}

export function updateWorkout(workout: Workout): Promise<DataEnvelope<Workout>> {
    return api(`workouts/update/${workout.id}`, workout, 'PATCH')
}

export function deleteProduct(workout: Workout): Promise<DataEnvelope<Workout>> {
    return api(`workouts/delete/${workout.id}`, workout, 'DELETE')
}