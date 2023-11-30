<script setup lang="ts">
import { useDeletePost } from '@/models/posts';
import { isModalActive, postId, fetchData } from '@/models/deletePostModal';

const { deletePost } = useDeletePost();

function confirmDeletePost(id: number) {
    isModalActive.value = false;
    return deletePost(id).then(fetchData)
}

function cancelPost() {
    isModalActive.value = false;
    postId.value = -1;
}

</script>

<template>
    <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <div class="message is-danger">
                <div class="message-body">
                    Are you sure you want to delete this post?
                    <div class="modal-card-foot">
                        <div class="button" @click="confirmDeletePost(postId)">
                            Delete
                        </div>
                        <div class="button" @click="cancelPost">
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
}
</style>