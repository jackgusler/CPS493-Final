<script setup lang="ts">
import { userId, isEditModalActive, selectedUser } from "@/models/editUserModal";
import { getSession } from "@/models/session";
import { getUserById, useUpdateUser, checkIfUserExistsByUsername, checkIfUserExistsByEmail, type User, fetchUserData } from "@/models/users";
import { computed, onMounted, ref, watch } from "vue";

const session = getSession();
const { updateUser, updatePassword, updateAdmin } = useUpdateUser();
const errorMessage = ref("");
const isEditSubmitted = ref(false);

const newFirstName = ref("");
const newLastName = ref("");
const newUsername = ref("");
const newEmail = ref("");
const newPassword = ref("");
const newAdmin = ref(false);

const setAdmin = () => {
    if (selectedUser.value) {
        newAdmin.value = selectedUser.value.admin;
    }
}

async function validateEdit() {
    if (newFirstName.value !== "" && newFirstName.value.length < 1) {
        errorMessage.value = 'First name must not be empty.';
        return false;
    }
    if (newLastName.value !== "" && newLastName.value.length < 1) {
        errorMessage.value = 'Last name must not be empty.';
        return false;
    }
    if (newUsername.value !== "" && newUsername.value.length < 2) {
        errorMessage.value = 'Username must be at least 2 characters long.';
        return false;
    }
    if (newUsername.value !== "" && newUsername.value !== selectedUser?.value?.username) {
        const usernameCheck = await checkIfUserExistsByUsername(newUsername.value);
        if (usernameCheck !== false) {
            errorMessage.value = 'That username is already taken.';
            return false;
        }
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (newEmail.value !== "" && !emailRegex.test(newEmail.value)) {
        errorMessage.value = 'Email must be valid.';
        return false;
    }
    if (newEmail.value !== "" && newEmail.value !== selectedUser?.value?.email) {
        const emailCheck = await checkIfUserExistsByEmail(newEmail.value);
        if (emailCheck !== false) {
            errorMessage.value = 'That email is already taken.';
            return false;
        }
    }
    if (newPassword.value !== "") {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
        if (!passwordRegex.test(newPassword.value)) {
            errorMessage.value = 'Password must be at least 8 characters long and contain at least one uppercase letter and one symbol.';
            return false;
        }
    }
    errorMessage.value = '';
    return true;
}

const confirm = async () => {
    if (!(await validateEdit())) {
        isEditSubmitted.value = true;
        return;
    }
    const updatedFields: Partial<User> = {};
    if (newFirstName.value !== "") updatedFields.firstName = newFirstName.value;
    if (newLastName.value !== "") updatedFields.lastName = newLastName.value;
    if (newUsername.value !== "") updatedFields.username = newUsername.value;
    if (newEmail.value !== "") updatedFields.email = newEmail.value;
    if (Object.keys(updatedFields).length > 0) {
        await updateUser(selectedUser!.value?.id ?? -1, updatedFields);
    }
    if (newAdmin.value !== selectedUser?.value?.admin) {
        await updateAdmin(selectedUser!.value?.id ?? -1, newAdmin.value ?? false);
    }
    if (newPassword.value !== "") {
        await updatePassword(selectedUser!.value?.id ?? -1, newPassword.value);
    }
    isEditSubmitted.value = false;
    await fetchUserData();
    cancel();
}

const cancel = () => {
    newFirstName.value = "";
    newLastName.value = "";
    newUsername.value = "";
    newEmail.value = "";
    newPassword.value = "";
    errorMessage.value = "";
    isEditSubmitted.value = false;
    isEditModalActive.value = false;
}

watch(selectedUser, setAdmin);
</script>

<template>
    <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="box">
                <div class="field">
                    <label class="label">First Name: {{ selectedUser?.firstName }} </label>
                    <div class="control">
                        <input class="input" type="text" placeholder="New First Name" v-model="newFirstName">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Last Name: {{ selectedUser?.lastName }} </label>
                    <div class="control">
                        <input class="input" type="text" placeholder="New Last Name" v-model="newLastName">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Username: @{{ selectedUser?.username }} </label>
                    <div class="control">
                        <input class="input" type="text" placeholder="New Username" v-model="newUsername">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Email: {{ selectedUser?.email }} </label>
                    <div class="control">
                        <input class="input" type="text" placeholder="New Email" v-model="newEmail">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Password: ******** </label>
                    <div class="control">
                        <input class="input" type="password" placeholder="New Password" v-model="newPassword">
                    </div>
                </div>
                <div class="field" v-if="session.user && session.user.admin">
                    <label class="label">Admin: {{ selectedUser?.admin }} </label>
                    <div class="control">
                        <label class="checkbox">
                            <input type="checkbox" v-model="newAdmin" :disabled="session.user.id === selectedUser?.id">
                            Admin
                        </label>
                    </div>
                </div>
                <div class="field">
                    <div class="message is-danger" v-if="isEditSubmitted">
                        <div class="message-body">{{ errorMessage }}</div>
                    </div>
                </div>
                <div class="field">
                    <div class="is-buttons">
                        <div class="button is-on-top" @click="confirm">Confirm</div>
                        <div class="button" @click="cancel">Cancel</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.is-buttons {
    display: block;
}

.is-on-top {
    margin-bottom: 10px;
}
</style>