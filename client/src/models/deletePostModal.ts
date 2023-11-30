import { ref } from "vue";
import { getPosts, type Post } from "./posts";
import { type User, getUsers } from "./users";
import { type Workout, getWorkouts } from "./workouts";
import { getSession } from "./session";

export const session = getSession()
export const postsData = ref<Post[]>([])
export const usersPosts = ref<Post[]>([])
export const workoutsData = ref<Workout[]>([])
export const usersData = ref<User[]>([])
export let filteredPosts = ref<Post[]>([])

export const searchQuery = ref("");

export const isModalActive = ref(false);
export const postId = ref(0);

export function openModal(id: number) {
  postId.value = id;
  isModalActive.value = true;
}

export function closeModal() {
  isModalActive.value = false;
}

export const fetchUserData = async () => {
    postsData.value = await getPosts()
    postsData.value.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
    usersPosts.value = postsData.value.filter((post) => post.userId === session.user?.id)
    workoutsData.value = await getWorkouts()
    usersData.value = await getUsers()
}

export const updateFilteredPosts = () => {
    const query = searchQuery.value.toLowerCase();
    filteredPosts.value = postsData.value.filter((post) => {
        const username = usersData.value[post.userId] ? usersData.value[post.userId].username.toLowerCase() : '';
        return username.includes(query);
    });
};

export const fetchFriendData = async () => {
    postsData.value = await getPosts();
    postsData.value.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    workoutsData.value = await getWorkouts();
    usersData.value = await getUsers();

    updateFilteredPosts()
};

export function fetchData() {
    fetchUserData();
    fetchFriendData();
}