<script setup lang="ts">
import { getSession, login, logout } from "@/models/session";
import router from "@/router";
import { ref } from "vue";

const session = getSession();
let email = ""
let password = ""

const doLogin = () => {
  //login with the email and password from the form
  login(email, password);
  router.push("/");
};

</script>

<template>
  <div class="container">
  <div class="columns">
    <div class="column is-half is-offset-one-quarter">
      <div class="panel">
        <p class="panel-heading">
          Login
      </p>
        <div class="panel-block">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  v-model="email"
                  class="input"
                  type="email"
                  placeholder="Email"
                />
              </div>
              </div>
            </div>
            <div class="panel-block">
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  v-model="password"
                  class="input"
                  type="password"
                  placeholder="Password"
                />
              </div>
              </div>
            </div>
            <div class="panel-block">
            <div class="field">
              <div class="control">
                <div
                  type="submit"
                  class="button"
                  @click.prevent="doLogin"
                >
                  Login
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
input, .control, .field {
    border-radius: 10px;
    margin: 0 auto;
    width: 100%;
    height: 100%;
}
.panel-block{
  border: none;
}
</style>
