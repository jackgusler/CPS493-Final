<script setup lang="ts">
import { isModalActive } from "@/models/editUserModal";
import { getSession } from "@/models/session";
import { useUpdateUser, checkIfUserExistsByUsername, checkIfUserExistsByEmail, type User } from "@/models/users";
import { ref } from "vue";

const session = getSession();
const { updateUser, updatePassword } = useUpdateUser();
const errorMessage = ref("");
const isEditSubmitted = ref(false);

const newFirstName = ref("");
const newLastName = ref("");
const newUsername = ref("");
const newEmail = ref("");
const newPassword = ref("");
let newAdmin = ref(session.user?.admin)

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
    if (newUsername.value !== "" && newUsername.value !== session.user?.username) {
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
    if (newEmail.value !== "" && newEmail.value !== session.user?.email) {
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
    isEditSubmitted.value = true;
    if (!(await validateEdit())) {
        return;
    }
    const updatedFields: Partial<User> = {};
    if (newFirstName.value !== "") updatedFields.firstName = newFirstName.value;
    if (newLastName.value !== "") updatedFields.lastName = newLastName.value;
    if (newUsername.value !== "") updatedFields.username = newUsername.value;
    if (newEmail.value !== "") updatedFields.email = newEmail.value;
    if (newAdmin.value !== session.user?.admin) updatedFields.admin = newAdmin.value;
    if (Object.keys(updatedFields).length > 0) {
        updateUser(session.user!.id ?? -1, updatedFields);
    }
    if (newPassword.value !== "") {
        updatePassword(session.user!.id ?? -1, newPassword.value);
    }
    isEditSubmitted.value = false;
    cancel();
}

const cancel = () => {
    newFirstName.value = "";
    newLastName.value = "";
    newUsername.value = "";
    newEmail.value = "";
    newPassword.value = "";
    newAdmin.value = session.user?.admin;
    errorMessage.value = "";
    isEditSubmitted.value = false;
    isModalActive.value = false;
}

</script>

<template>
    <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="box">
                <div class="field">
                    <label class="label">First Name: {{ session.user?.firstName }} </label>
                    <div class="control">
                        <input class="input" type="text" placeholder="New First Name" v-model="newFirstName">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Last Name: {{ session.user?.lastName }} </label>
                    <div class="control">
                        <input class="input" type="text" placeholder="New Last Name" v-model="newLastName">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Username: @{{ session.user?.username }} </label>
                    <div class="control">
                        <input class="input" type="text" placeholder="New Username" v-model="newUsername">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Email: {{ session.user?.email }} </label>
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
                <div class="field" v-if="session.user?.admin">
                    <label class="label">Admin: {{ session.user?.admin }} </label>
                    <div class="control">
                        <label class="checkbox">
                            <input type="checkbox" v-model="newAdmin">
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
        <button class="modal-close is-large" aria-label="close"></button>
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