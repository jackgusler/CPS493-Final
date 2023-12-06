<script setup lang="ts">
import { getPosts, useDeletePost, type Post } from '@/models/posts';
import { isDeleteModalActive, userId } from '@/models/deleteUserModal';
import { fetchUserData, useDeleteUser } from '@/models/users';
import { ref } from 'vue';

const { deletePost } = useDeletePost();
const { deleteUser } = useDeleteUser();
const postsData = ref<Post[]>([]);

async function fetchPostsData() {
        postsData.value = await getPosts();
}

function confirmDeleteUser(id: number) {
    isDeleteModalActive.value = false;
    postsData.value.forEach(post => {
        if (post.userId === id) {
            deletePost(post.id);
        }
    });
    return deleteUser(id).then(fetchUserData)
}

function cancel() {
    isDeleteModalActive.value = false;
    userId.value = -1;
}

fetchPostsData();
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