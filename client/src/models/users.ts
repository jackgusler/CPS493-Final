import data from '../data/users.json';
export interface User {
    id?: number,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    admin: boolean,
    token?: string
    workoutsByIds: number[]
}

export function getUsers(): User[] {
    return data.users;
}

export function getUserByEmail(email: string): User | undefined {
    return getUsers().find(x => x.email === email )
}