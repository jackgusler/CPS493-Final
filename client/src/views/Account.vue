<script setup lang="ts">
import { getSession, useLogin } from "@/models/session";
import EditUserModal from "@/components/EditUserModal.vue";
import { isEditModalActive, openEditModal } from "@/models/editUserModal";

const session = getSession();
const { logout } = useLogin();

const doLogout = () => {
    logout();
}
</script>

<template>
    <div class="container">
        <div class="columns">
            <div class="column is-half is-offset-one-quarter">
                <div class="panel">
                    <p class="panel-heading is-center">
                        Welcome {{ session.user?.firstName }} {{ session.user?.lastName }}!
                    </p>
                    <div class="panel-block">
                        <div class="content">
                            <p>
                                First Name: {{ session.user?.firstName }}
                            </p>
                        </div>
                    </div>
                    <div class="panel-block">
                        <div class="content">
                            <p>
                                Last Name: {{ session.user?.lastName }}
                            </p>
                        </div>
                    </div>
                    <div class="panel-block">
                        <div class="content">
                            <p>
                                Username: @{{ session.user?.username }}
                            </p>
                        </div>
                    </div>
                    <div class="panel-block">
                        <div class="content">
                            <p>
                                Email: {{ session.user?.email }}
                            </p>
                        </div>
                    </div>
                    <div class="panel-block">
                        <div class="content">
                            <p>
                                Password: ********
                            </p>
                        </div>
                    </div>
                    <div class="panel-block" v-if="session.user?.admin">
                        <div class="content">
                            <p>
                                Admin: true
                            </p>
                        </div>
                    </div>
                    <div class="panel-block is-buttons">
                        <div class="button is-on-top" @click.prevent="openEditModal(session.user?.id ?? -1)">
                            Edit User
                        </div>
                        <div class="button" @click.prevent="doLogout">
                            Logout
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <EditUserModal  :class="{ 'is-active': isEditModalActive }"/>
</template>

<style scoped>
.is-center{
    text-align: center;
}
.is-buttons{
    display: block;
}
.is-on-top{
    margin-bottom: 10px;
}
</style>
