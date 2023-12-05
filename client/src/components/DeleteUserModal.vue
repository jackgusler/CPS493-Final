<script setup lang="ts">
import { isDeleteModalActive, userId } from '@/models/deleteUserModal';
import { fetchUserData, useDeleteUser } from '@/models/users';

const { deleteUser } = useDeleteUser();

function confirmDeleteUser(id: number) {
    isDeleteModalActive.value = false;
    return deleteUser(id).then(fetchUserData)
}

function cancel() {
    isDeleteModalActive.value = false;
    userId.value = -1;
}

</script>

<template>
    <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <div class="message is-danger">
                <div class="message-body">
                    Are you sure you want to delete the user with the id of {{ userId }}?
                    <div class="modal-card-foot">
                        <div class="button" @click="confirmDeleteUser(userId)">
                            Delete
                        </div>
                        <div class="button" @click="cancel">
                            Cancel
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-card-foot {
    background-color: transparent;
    border: none;
}
</style>