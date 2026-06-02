<template>
  <div>
    <p class="text-center">Welcome. Upload a recipe or browse for one you like.</p>
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
import recipes from '../data/recipes.json'
import RecipeCard from '../components/RecipeCard.vue'

const currentUser =
  JSON.parse(localStorage.getItem('currentUser'))
</script>