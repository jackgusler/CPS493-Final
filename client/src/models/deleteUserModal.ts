import { ref } from "vue";

export const isDeleteModalActive = ref(false);
export const userId = ref(0);

export function openDeleteModal(id: number) {
  userId.value = id;
  isDeleteModalActive.value = true;
}

export function closeModal() {
  isDeleteModalActive.value = false;
}
