import { ref } from "vue";

export const isDeleteModalActive = ref(false);
export const workoutId = ref(0);

export function openDeleteModal(id: number) {
  workoutId.value = id;
  isDeleteModalActive.value = true;
}

export function closeModal() {
  isDeleteModalActive.value = false;
}
