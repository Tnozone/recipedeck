<template>
    <div class="card recipe-card">
        <div class="card-header">
            <h5 class="card-title text-center">
                <router-link v-if="recipe" :to="`/recipe/${recipe._id}`"
                class="recipe-link">
                    {{ recipe.name }}
                </router-link>
            </h5>
        </div>
        <div class="card-body"
        >
            <h5 class="fs-6 fw-bold">Ingredients:</h5>
            <p class="card-text">{{ recipe.ingredients }}</p>
            <h5 class=" fs-6 fw-bold">Steps:</h5>
            <p class="card-text">{{ recipe.steps }}</p>
        </div>
        <div class="card-footer">
          <div class="d-flex justify-content-between mb-3">
            <p class="card-text">Posted by <router-link :to="`/user/${recipe.username}`">
                {{ recipe.username }}
            </router-link></p>
            <i
                v-if="user"
                @click="toggleFavorite"
                :class="isFavorite
                    ? 'bi bi-star-fill text-warning'
                    : 'bi bi-star text-warning'"
            ></i>
          </div>
          <div class="d-flex justify-content-end">
            <button 
              v-if="isOwner"
              @click="deleteRecipe" 
              class="btn btn-danger">
            Delete</button>
          </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { user, token} from '../stores/auth.js'
import { showMessage } from '../stores/message'
import { showConfirm } from '../stores/confirm'

const props = defineProps({
  recipe: {
    type: Object,
    required: true
  }
})

// checks if the current user is the recipe's publisher
const isOwner = computed(() => {
  return (
    user.value &&
    user.value.username === props.recipe.username
  )
})

const isFavorite = computed(() => {
  if (!user.value) return false

  const favorites = Array.isArray(user.value.favorites)
    ? user.value.favorites
    : []

  return favorites.some(fav =>
    fav.toString?.() === props.recipe._id
  )
})

const emit = defineEmits([
  'favoriteChanged',
  'deleted'
])

// adds and removes recipe from favorites array in the database
async function toggleFavorite() {
  if (!user.value) {
    showMessage('Please log in', 'danger')
    return
  }

  const recipeId = props.recipe._id

  const response = await fetch(
    `http://localhost:3000/api/users/${user.value.username}/favorites/${recipeId}`,
    {
      method: 'POST',
      headers: {
      Authorization: `Bearer ${token.value}`
    }
    }
  )

  const updatedFavorites = await response.json()

  user.value.favorites = updatedFavorites

  localStorage.setItem(
    'user',
    JSON.stringify(user.value)
  )

  emit('favoriteChanged', {
    recipeId: props.recipe._id,
    isFavorite: updatedFavorites.some(
      fav => fav.toString() === props.recipe._id
    )
  })
}

// deletes the recipe, button only available for the recipe publisher
async function deleteRecipe() {
  if (!isOwner.value) {
    showMessage('Forbidden', 'danger')
    return
  }
  
  const confirmed = await showConfirm(
    'Are you sure you want to delete this recipe?'
  )

  if (!confirmed) return

  try {
    const response = await fetch(
      `http://localhost:3000/api/recipes/${props.recipe._id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token.value}`
        }
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
.recipe-link {
  color: var(--title-color);
  text-decoration: none;
}

.recipe-link:hover {
  color: var(--title-color-hover);
  text-decoration: underline;
}

.recipe-card {
  border-style: double;
  border-width: medium;
  border-color: var(--border-color);
  border-radius: 5% 15%;
  overflow: hidden;
  padding: 0;
}

.card-footer i {
  font-size: 1.5rem;
  cursor: pointer;
}

.card-footer i:hover {
  transform: scale(1.1);
}
</style>