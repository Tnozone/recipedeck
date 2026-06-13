<template>
  <div>
    <p class="text-center mt-3 mb-3">Welcome. Upload a recipe or browse for one you like.</p>
  </div>
  <div class="container">
    <div class="row">
      <div
        v-for="recipe in recipes"
        :key="recipe._id"
        class="col-md-4 mb-4"
      >
        <RecipeCard 
          :recipe="recipe" 
          @deleted="removeRecipe" 
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import RecipeCard from '../components/RecipeCard.vue'
import { ref, onMounted } from 'vue'

const recipes = ref([])

onMounted(async () => {
  const response = await fetch(
    'http://localhost:3000/api/recipes'
  )

  const data = await response.json()

  console.log(data)

  recipes.value = data
})

function removeRecipe(recipeId) {
  recipes.value = recipes.value.filter(
    recipe => recipe._id !== recipeId
  )
}
</script>