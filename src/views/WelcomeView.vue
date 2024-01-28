<template>
  <main
    class="container text-black flex flex-col justify-center items-center bg-white rounded-lg shadow-2xl m-auto min-h-[90vh] w-2/3 p-6"
  >
    <h1 class="text-6xl text-center py-4">👋🏻 Welcome Gwen!</h1>
    <div class="flex">
      <button
        class="rounded-lg p-2 mx-2 text-white bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600 block w-auto font-medium border border-gray-200 hover:text-white hover:bg-blue-200"
      >
        View Records
      </button>
      <button
        class="hover:text-white hover:bg-gray-500 rounded-lg p-2 block font-medium border border-gray-300"
        @click="logout"
      >
        Logout
      </button>
    </div>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const logout = async () => {
  localStorage.clear();
  await router.push('/');
};
</script>
