<template>
  <div class="container p-3">
    <div class="card p-4">
      <p class="text-center">Upload a recipe.</p>
      <form @submit.prevent="addRecipe">

        <div class="mb-3">
          <label class="form-label">
            Recipe Name
          </label>
          <input
            v-model="name"
            type="text"
            class="form-control"
            required
          >
        </div>

        <div class="mb-3">
          <label class="form-label">
            Tags
          </label>
          <input
            v-model="tags"
            type="text"
            class="form-control"
            placeholder="Italian, Pasta, Dinner"
          >
          <small class="text-muted">
            Separate tags with commas.
          </small>
        </div>

        <div class="mb-3">
          <label class="form-label">
            Ingredients
          </label>
          <textarea
            v-model="ingredients"
            class="form-control"
            rows="5"
            placeholder="One ingredient per line"
            required
          ></textarea>
        </div>

        <div class="mb-3">
          <label class="form-label">
            Steps
          </label>
          <textarea
            v-model="steps"
            class="form-control"
            rows="8"
            placeholder="Describe how to make the recipe"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          class="btn btn-success"
        >
          Add Recipe
        </button>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const tags = ref('')
const ingredients = ref('')
const steps = ref('')

function addRecipe() {
  const currentUser = JSON.parse(
    localStorage.getItem('currentUser')
  )

  if (!currentUser) {
    alert("You must be logged in.")
    return
  }

  const recipes = JSON.parse(
    localStorage.getItem('recipes') || '[]'
  )

  const recipe = {
    id: Date.now(),
    name: name.value,
    tags: tags.value
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0),
    ingredients: ingredients.value,
    steps: steps.value,
    username: currentUser.username
  }

  recipes.push(recipe)

  localStorage.setItem(
    'recipes',
    JSON.stringify(recipes)
  )

  alert("Recipe added!")

  // Clear form
  name.value = ''
  tags.value = ''
  ingredients.value = ''
  steps.value = ''
}
</script>