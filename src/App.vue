<script setup>

import Header from './components/Header.vue'
import MyHeader from './components/MyHeader.vue'
import Footer from './components/Footer.vue'
import MessageBox from './components/MessageBox.vue'
import ConfirmModal from './components/ConfirmModal.vue'
import { isAuthenticated } from './stores/auth.js'

</script>

<template>
  <div class="app">
    <MyHeader v-if="isAuthenticated" />
    <Header v-else />
    <main class="flex-grow-1">
      <MessageBox />
      <ConfirmModal />
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
  background-color: #A0C8F5;
}
</style>
