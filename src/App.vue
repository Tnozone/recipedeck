<script setup>
import { computed } from 'vue'

import Header from './components/Header.vue'
import MyHeader from './components/MyHeader.vue'
import Footer from './components/Footer.vue'

import { currentUser } from './stores/auth'
</script>

<template>
  <MyHeader v-if="currentUser" />
  <Header v-else />
  <router-view />
  <Footer />
</template>

<style scoped></style>
