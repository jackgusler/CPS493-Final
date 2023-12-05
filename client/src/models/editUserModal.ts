import { ref } from "vue";
import { getUserById, type User } from "./users";

export const isEditModalActive = ref(false);
export const userId = ref(0);
export const selectedUser = ref<User | null>(null);

export async function openEditModal(id: number) {
  userId.value = id;
  isEditModalActive.value = true;
  const user = await getUserById(id);
  selectedUser.value = user ? user : null;
}