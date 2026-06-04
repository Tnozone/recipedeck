<template>
  <div class="container p-5 justify-content-center align-items-center">
    <h1 class="fs-1 text-danger">404 - Page not found</h1>
    <p class="text-danger">The page "{{ route.fullPath }}" does not exist.</p>
    <router-link to="/" class="btn btn-primary">
      Return Home
    </router-link>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>