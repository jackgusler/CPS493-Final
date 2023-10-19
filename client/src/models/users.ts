import data from '../data/users.json';
import type { Workout } from './workouts';

export interface User {
    id?: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: "admin" | "user",
    token?: string
    workoutsByIds: number[]
}

export function getUsers(): User[] {
    return data.users.map( x => ({ ...x, role: x.id <= 5 ? 'admin' : 'user' }) )
}

export function getUserByEmail(email: string): User | undefined {
    return getUsers().find(x => x.email === email )
}