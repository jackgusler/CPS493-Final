<script setup lang="ts">
import { ref } from 'vue';
import { useLogin, useSignUp } from '@/models/session';
import { checkIfUserExistsByEmail, checkIfUserExistsByUsername, getUserByEmail } from '@/models/users';

const { login } = useLogin();
const { signUp } = useSignUp();

const email = ref('');
const password = ref('');
const signUpFirstName = ref('');
const signUpLastName = ref('');
const signUpUsername = ref('');
const signUpEmail = ref('');
const signUpPassword = ref('');
const signUpPassword2 = ref('');
const isSignUp = ref(false);
const errorMessage = ref('');
const isLoginSubmitted = ref(false);
const isSignUpSubmitted = ref(false);

async function validateLogin() {
  const userCheck = await checkIfUserExistsByEmail(email.value);
  if (userCheck === undefined) {
    errorMessage.value = 'That email does not exist. Please sign up or try again.';
    return false;
  }
  const user = await getUserByEmail(email.value);
  if (email.value === '' || password.value === '') {
    errorMessage.value = 'Email and password cannot be empty.';
    return false;
    /*check if account exists in database by email and password*/
  } else if (!user || user?.password !== password.value) {
    errorMessage.value = 'That email or password does not exist. Please sign up or try again.';
    return false;
  }
  errorMessage.value = '';
  return true;
}

async function validateSignUp() {
  if (isSignUp.value) {
    if (signUpFirstName.value.length < 1 || signUpLastName.value.length < 1) {
      errorMessage.value = 'First and last name must not be empty.';
      return false;
    }
    //username check, must be at least 2 characters long, and can't be taken
    if (signUpUsername.value.length < 2) {
      errorMessage.value = 'Username must be at least 2 characters long.';
      return false;
    }
    const usernameCheck = await checkIfUserExistsByUsername(signUpUsername.value);
    if (usernameCheck !== false) {
      errorMessage.value = 'That username is already taken.';
      return false;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(signUpEmail.value)) {
      errorMessage.value = 'Email must be valid.';
      return false;
    }
    const emailCheck = await checkIfUserExistsByEmail(signUpEmail.value);
    if (emailCheck !== false) {
      errorMessage.value = 'That email is already taken.';
      return false;
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(signUpPassword.value)) {
      errorMessage.value = 'Password must be at least 8 characters long and contain at least one uppercase letter and one symbol.';
      return false;
    }
    if (signUpPassword.value !== signUpPassword2.value) {
      errorMessage.value = 'Passwords do not match.';
      return false;
    }
  }
  errorMessage.value = '';
  return true;
}

const doLogin = async () => {
  if (!(await validateLogin())) {
    isLoginSubmitted.value = true;
    return;
  }
  login(email.value, password.value);
  isLoginSubmitted.value = false;
}

const doSignUp = async () => {
  if (!(await validateSignUp())) {
    isSignUpSubmitted.value = true;
    return;
  }
  await signUp(
    signUpFirstName.value,
    signUpLastName.value,
    signUpUsername.value,
    signUpEmail.value,
    signUpPassword.value,
  )
  isSignUpSubmitted.value = false;
}

function toggleSignUp() {
  email.value = '';
  password.value = '';
  signUpFirstName.value = '';
  signUpLastName.value = '';
  signUpUsername.value = '';
  signUpEmail.value = '';
  signUpPassword.value = '';
  signUpPassword2.value = '';
  errorMessage.value = '';
  isLoginSubmitted.value = false;
  isSignUpSubmitted.value = false;
  isSignUp.value = !isSignUp.value;
}
</script>

<template>
  <div class="container">
    <div class="panel">
      <p class="panel-heading is-centered">
        {{ isSignUp ? 'Sign Up' : 'Login' }}
      <div class="button is-green is-not-header" @click="toggleSignUp">{{ isSignUp ? 'Go to Login' : 'Go to Sign Up' }}
      </div>
      </p>
      <div class="form">
        <form v-if="!isSignUp">
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input class="input" type="text" v-model="email">
            </div>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input class="input" type="password" v-model="password">
            </div>
          </div>
          <div class="field">
            <div class="message is-danger" v-if="isLoginSubmitted">
              <div class="message-body">{{ errorMessage }}</div>
            </div>
          </div>
          <div class="button is-green" @click="doLogin">Login</div>
        </form>
        <form v-else>
          <div class="field">
            <label class="label">First Name</label>
            <div class="control">
              <input class="input" type="text" v-model="signUpFirstName">
            </div>
          </div>
          <div class="field">
            <label class="label">Last Name</label>
            <div class="control">
              <input class="input" type="text" v-model="signUpLastName">
            </div>
          </div>
          <div class="field">
            <label class="label">Username</label>
            <div class="control">
              <input class="input" type="text" v-model="signUpUsername">
            </div>
          </div>
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input class="input" type="text" v-model="signUpEmail">
            </div>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input class="input" type="password" v-model="signUpPassword">
            </div>
          </div>
          <div class="field">
            <label class="label">Confirm Password</label>
            <div class="control">
              <input class="input" type="password" v-model="signUpPassword2">
            </div>
          </div>
          <div class="field">
            <div class="message is-danger" v-if="isSignUpSubmitted">
              <div class="message-body">{{ errorMessage }}</div>
            </div>
          </div>
          <div class="button is-green" @click="doSignUp">Sign Up</div>
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped>
.is-centered {
  text-align: center;
  justify-content: center;
}

.form {
  padding: 1rem;
}

.is-not-header {
  font-weight: normal;
}
</style>