<template>
    <div class="card p-2">
        <div class="card-header">
            <h5 class="card-title text-center">
                <router-link v-if="recipe" :to="`/recipe/${recipe._id}`">
                    {{ recipe.name }}
                </router-link>
            </h5>
        </div>
        <div class="card-body">
            <h5 class="fs-6 fw-bold">Ingredients:</h5>
            <p class="card-text">{{ recipe.ingredients }}</p>
            <h5 class=" fs-6 fw-bold">Steps:</h5>
            <p class="card-text">{{ recipe.steps }}</p>
        </div>
        <div class="card-footer">
            <p class="card-text">Posted by <router-link :to="`/user/${recipe.username}`">
                {{ recipe.username }}
            </router-link></p>
            <i
                v-if="currentUser"
                @click="toggleFavorite"
                :class="isFavorite
                    ? 'bi bi-star-fill text-warning'
                    : 'bi bi-star text-warning'"
            ></i>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { currentUser } from '../stores/auth'

defineProps({
  recipe: {
    type: Object,
    required: true
  }
})

const isFavorite = computed(() => {
  if (!currentUser.value) return false

  const favorites = currentUser.favorites || []

  return favorites.includes(props.recipe._id)
})

function toggleFavorite() {
  if (!currentUser.value) {
    alert('Please log in to favorite recipes.')
    return
  }

  currentUser.favorites ??= []

  const index = currentUser.favorites.indexOf(
    props.recipe._id
  )

  if (index === -1) {
    currentUser.favorites.push(props.recipe._id)
  } else {
    currentUser.favorites.splice(index, 1)
  }

  localStorage.setItem(
    'currentUser',
    JSON.stringify(currentUser)
  )
}
</script>

<style scoped>
.card-title {
    color: #ffc107;
}

.card {
    border-style: double;
    border-color: #ffc107;
}
</style>