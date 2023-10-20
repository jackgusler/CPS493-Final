import data from '../data/workouts.json';

export interface Workout {
    id: number
    name: string
    description: string
    image: string
    category: string
    intensity: string
    duration: number
}

export function getWorkouts(): Workout[] {
    return data.workouts.map( x => ({ ...x }) )
}

export function getWorkoutsByName(name: string): Workout | undefined {
    return getWorkouts().find(x => x.name === name )
}