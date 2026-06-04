<template>
  <div>
    <p class="text-center">Recipes posted by {{ username }}.</p>
  </div>
  <div class="container">
    <div class="row">
      <div
        v-for="recipe in userRecipes"
        :key="recipe.id"
        class="col-md-4 mb-4"
      >
        <RecipeCard :recipe="recipe" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import recipes from '../data/recipes.json'
import RecipeCard from '../components/RecipeCard.vue'

const route = useRoute()

const username = route.params.username

const userRecipes = computed(() =>
  recipes.filter(
    recipe => recipe.username === username
  )
)
</script>