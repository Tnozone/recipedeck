<template>
  <div class="container p-3">
    <div class="card p-4">
      <h4 class="text-center">Upload a recipe</h4>
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
          <small class="text-muted">
            One step per line.
          </small>
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
import { useRouter } from 'vue-router'

const router = useRouter()

const name = ref('')
const tags = ref('')
const ingredients = ref('')
const steps = ref('')

async function addRecipe() {
  const currentUser = JSON.parse(
    localStorage.getItem('currentUser') ?? 'null'
  )

  if (!currentUser) {
    alert('You must be logged in.')
    return
  }

  try {
    const response = await fetch(
      'http://localhost:3000/api/recipes',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name.value,
          tags: tags.value
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0),
          ingredients: ingredients.value,
          steps: steps.value,
          username: currentUser.username
        })
      }
    )

    if (!response.ok) {
      const error = await response.json()
      alert(error.message || 'Failed to add recipe')
      return
    }

    alert('Recipe added!')

    name.value = ''
    tags.value = ''
    ingredients.value = ''
    steps.value = ''

    router.push('/recipes')
  }
  catch (err) {
    console.error(err)
    alert('Could not connect to server')
  }
}
</script>