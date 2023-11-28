<script setup lang="ts">
import { getSession, useLogin } from "@/models/session";
import router from "@/router";

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
                    <p class="panel-heading">
                        Welcome {{ session.user?.firstName }} {{ session.user?.lastName }}!
                    </p>
                    <div class="panel-block">
                        <div class="content">
                            <p>
                                Username: {{ session.user?.username }}
                            </p>
                            <p>
                                Email: {{ session.user?.email }}
                            </p>
                            <p>
                                Admin: {{ session.user?.admin }}
                            </p>
                        </div>
                    </div>
                    <div class="panel-block">
                        <div type="submit" class="button" @click.prevent="doLogout">
                            Logout
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
