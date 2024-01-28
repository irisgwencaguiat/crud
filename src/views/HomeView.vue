<template>
  <main
    class="container text-black bg-white rounded-lg shadow-2xl m-auto h-auto w-96 p-6"
  >
    <h1 class="my-4 text-4xl text-center font-medium">
      {{ currentTitle }} Form
    </h1>
    <div class="flex rounded-lg" role="group">
      <button
        type="button"
        class="block w-full text-sm font-medium border border-gray-200 rounded-s-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600"
        :class="[
          currentForm === 'login'
            ? 'text-white bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600'
            : '',
        ]"
        @click="changeForm('login')"
      >
        Login
      </button>

      <button
        type="button"
        class="block w-full px-4 py-2 text-sm font-medium bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600"
        :class="[
          currentForm === 'sign-up'
            ? 'text-white bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600'
            : '',
        ]"
        @click="changeForm('sign-up')"
      >
        Register
      </button>
    </div>
    <div v-if="currentForm === 'login'">
      <div class="mt-8">
        <!--      <label for="email" class="text-gray-700">Email</label>-->
        <input
          type="text"
          placeholder="Email or Username"
          v-model="loginQuery.email"
          id="login-email"
          class="shadow mt-1 py-2 px-2 w-full border rounded-lg focus:outline-none focus:border-violet-400"
        />
      </div>
      <div class="mt-4">
        <!--      <label for="password" class="text-gray-700">Password</label>-->
        <input
          type="password"
          placeholder="Password"
          v-model="loginQuery.password"
          id="login-password"
          class="shadow mt-1 py-2 px-2 w-full border rounded-lg focus:outline-none focus:border-violet-400"
        />
      </div>
      <!--    <p-->
      <!--      v-if="loginError"-->
      <!--      class="pt-2 pb-1 px-1 mt-2 border border-red-600 text-red-600 bg-red-100"-->
      <!--    >-->
      <!--      {{ loginErrorMessage }}-->
      <!--    </p>-->
      <button
        class="border rounded-lg p-2 mt-6 block w-full text-white bg-gradient-to-r from-blue-800 to-blue-900"
        @click="login"
      >
        Login
      </button>
    </div>
    <div v-if="currentForm === 'sign-up'">
      <div class="mt-8">
        <!--      <label for="email" class="text-gray-700">Email</label>-->
        <input
          type="text"
          placeholder="Username"
          id="sign-up-username"
          class="shadow mt-1 py-2 px-2 w-full border rounded-lg focus:outline-none focus:border-violet-400"
        />
      </div>
      <div class="mt-4">
        <!--      <label for="email" class="text-gray-700">Email</label>-->
        <input
          type="text"
          placeholder="Phone Number"
          id="sign-up-number"
          class="shadow mt-1 py-2 px-2 w-full border rounded-lg focus:outline-none focus:border-violet-400"
        />
      </div>
      <div class="mt-4">
        <!--      <label for="email" class="text-gray-700">Email</label>-->
        <input
          type="text"
          placeholder="Email"
          id="sign-up-email"
          class="shadow mt-1 py-2 px-2 w-full border rounded-lg focus:outline-none focus:border-violet-400"
        />
      </div>
      <div class="mt-4">
        <!--      <label for="password" class="text-gray-700">Password</label>-->
        <input
          type="password"
          placeholder="Password"
          id="sign-up-password"
          class="shadow mt-1 py-2 px-2 w-full border rounded-lg focus:outline-none focus:border-violet-400"
        />
      </div>
      <div class="mt-4">
        <!--      <label for="password" class="text-gray-700">Password</label>-->
        <input
          type="password"
          placeholder="Confirm Password"
          id="sign-up-confirm-password"
          class="shadow mt-1 py-2 px-2 w-full border rounded-lg focus:outline-none focus:border-violet-400"
        />
      </div>
      <p
        v-if="loginError"
        class="pt-2 pb-1 px-1 mt-2 border border-red-600 text-red-600 bg-red-100"
      >
        {{ loginErrorMessage }}
      </p>
      <button
        class="border rounded-lg p-2 mt-6 block w-full text-white bg-gradient-to-r from-blue-800 to-blue-900"
      >
        Register
      </button>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const currentForm = ref('login');
const currentTitle = ref('Login');
const changeForm = (form) => {
  currentForm.value = form;

  if (form === 'sign-up') {
    currentTitle.value = 'Sign Up';
  } else {
    currentTitle.value = 'Login';
  }
};

const router = useRouter();
const loginError = ref(null);
const loginErrorMessage = ref('');
const loginQuery = reactive({
  email: '',
  password: '',
});
const signUpQuery = reactive({
  email: '',
  username: '',
  password: '',
  confirm_password: '',
  phone_number: '',
});

const login = async () => {
  if (loginQuery !== null) {
    try {
      const result = await axios.post('/login', {
        username: loginQuery.email,
        password: loginQuery.password,
      });
      localStorage.setItem('token', result.data.data.access_token);
      localStorage.setItem('user', JSON.stringify(result.data.data.user));

      loginQuery.email = '';
      loginQuery.password = '';
      loginError.value = false;
      // if (localStorage.getItem('user') !== null) {
      //   axios.defaults.headers[
      //     'Authorization'
      //   ] = `Bearer ${localStorage.getItem('token')}`;
      await router.push('/welcome');
    } catch (err) {
      loginError.value = true;
      loginErrorMessage.value = err.response.data.message;
    }
  }
};

const signUp = async () => {
  if (signUpQuery !== null) {
    try {
      const result = await axios.post('/sign-up', {
        username: signUpQuery.userame,
        email: signUpQuery.email,
        password: signUpQuery.password,
      });
      signUpQuery.firstName = '';
      signUpQuery.lastName = '';
      signUpQuery.email = '';
      signUpQuery.password = '';
      signUpError.value = false;
      localStorage.setItem('token', result.data.data.access_token);
      localStorage.setItem('token', result.data.data.user);
      await router.push('/chat-room');
    } catch (err) {
      signUpError.value = true;
      signUpErrorMessage.value = err.response.data.message;
    }
  }
};
</script>
