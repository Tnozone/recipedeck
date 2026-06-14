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
          <div class="d-flex justify-content-between">
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
          <button 
            v-if="isOwner"
            @click="deleteRecipe" 
            class="btn btn-danger">
          Delete</button>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { currentUser } from '../stores/auth'

const props = defineProps({
  recipe: {
    type: Object,
    required: true
  }
})

const isOwner = computed(() => {
  return (
    currentUser.value &&
    currentUser.value.username === props.recipe.username
  )
})

const isFavorite = computed(() => {
  if (!currentUser.value) return false

  const favorites = Array.isArray(currentUser.value.favorites)
    ? currentUser.value.favorites
    : []

  return favorites.some(fav =>
    fav.toString?.() === props.recipe._id
  )
})

const emit = defineEmits([
  'favoriteChanged',
  'deleted'
])

async function toggleFavorite() {
  if (!currentUser.value) {
    alert('Please log in')
    return
  }

  const recipeId = props.recipe._id

  const response = await fetch(
    `http://localhost:3000/api/users/${currentUser.value.username}/favorites/${recipeId}`,
    {
      method: 'POST'
    }
  )

  const updatedFavorites = await response.json()

  currentUser.value.favorites = updatedFavorites

  localStorage.setItem(
    'currentUser',
    JSON.stringify(currentUser.value)
  )

  emit('favoriteChanged', {
    recipeId: props.recipe._id,
    isFavorite: updatedFavorites.some(
      fav => fav.toString() === props.recipe._id
    )
  })
}

async function deleteRecipe() {
  const confirmed = confirm(
    'Are you sure you want to delete this recipe?'
  )

  if (!confirmed) return

  try {
    const response = await fetch(
      `http://localhost:3000/api/recipes/${props.recipe._id}`,
      {
        method: 'DELETE'
      }
    )

    if (!response.ok) {
      throw new Error('Delete failed')
    }

    emit('deleted', props.recipe._id)
  }
  catch (err) {
    console.error(err)
    alert('Could not delete recipe')
  }
}
</script>

<style scoped>
.card-title router-link {
  color: #ffc107;
  text-decoration: none;
}

.card {
  border-style: double;
  border-color: #ffc107;
  -webkit-mask-image: radial-gradient(circle 10px at 0 0, transparent 0, transparent 20px, black 21px);
}

.card-footer i {
  font-size: 1.5rem;
  cursor: pointer;
  /* user-select: none; */
}

.card-footer i:hover {
  transform: scale(1.1);
}
</style>