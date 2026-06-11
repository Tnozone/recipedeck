<template>
  <div>
    <p class="text-center fs-3 mt-3 mb-3">Your Saved Recipes</p>
  </div>
  <div class="container">
    <div class="row">
      <div
        v-for="recipe in recipes"
        :key="recipe.id"
        class="col-md-4 mb-4"
      >
        <RecipeCard :recipe="recipe" />
      </div>
    </div>
  </div>
</template>

<script setup>
import RecipeCard from '../components/RecipeCard.vue'
import { ref, onMounted } from 'vue'

const recipes = ref([])

const currentUser = JSON.parse(
  localStorage.getItem('currentUser') ?? 'null'
)

onMounted(async () => {
  const response = await fetch(
    `http://localhost:3000/api/recipes/user/${currentUser.username}`
  )

  recipes.value = await response.json()
})
</script>