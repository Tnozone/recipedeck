<script setup>
import { computed } from 'vue'

import Header from './components/Header.vue'
import MyHeader from './components/MyHeader.vue'
import Footer from './components/Footer.vue'

import { currentUser } from './stores/auth'
</script>

<template>
  <div class="app">
    <MyHeader v-if="currentUser" />
    <Header v-else />
    <main class="flex-grow-1">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  background-color: rgb(160, 200, 245);
}
</style>
