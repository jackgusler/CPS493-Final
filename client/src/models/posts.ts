import data from '../data/posts.json';
import type { Workout } from './workouts';

export interface Post {
    userId: number;
    workoutId: number;
    picture: string,
    description: string;
    date: string;
}

export function getPosts(): Post[] {
    return data.posts.map( x => ({ ...x }) )
}