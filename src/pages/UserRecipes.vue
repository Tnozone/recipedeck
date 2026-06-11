<template>
  <div>
    <p class="text-center fs-3 mt-3 mb-3">Recipes posted by {{ username }}.</p>
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
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import RecipeCard from '../components/RecipeCard.vue'

const route = useRoute()

const username = route.params.username

const recipes = ref([])

onMounted(async () => {
  const response = await fetch(
    `http://localhost:3000/api/recipes/user/${username}`
  )

  recipes.value = await response.json()
})
</script>