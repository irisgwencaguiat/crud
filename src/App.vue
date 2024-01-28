<template>
  <div class="font-Roboto flex min-h-screen max-h-screen bg-blue-100">
    <RouterView :key="$route.fullPath" />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>
