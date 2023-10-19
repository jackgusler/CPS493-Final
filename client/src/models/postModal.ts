import { ref } from 'vue';

export const isModalActive = ref(false);
export const successMessage = ref(false);

export function openModal() {
  isModalActive.value = true;
}

export function closeModal() {
  isModalActive.value = false;
}

export function openSuccessMessage() {
  successMessage.value = true;
}

export function closeSuccessMessage() {
  successMessage.value = false;
}