<template>
  <div>
    <p class="text-center mt-3 mb-3 fs-5">Welcome. Upload a recipe or browse for one you like.</p>
    <RecipeSearch @search="filterRecipes" class="m-3" />
  </div>
  <div class="container">
    <div class="row">
      <div
        v-for="recipe in filteredRecipes"
        :key="recipe._id"
        class="col-md-4 mb-4"
      >
      <!-- d-flex align-items-stretch -->
        <RecipeCard 
          :recipe="recipe"
          @deleted="removeRecipe" 
        />
        <!-- class="h-100 -->
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script setup>
import RecipeCard from '../components/RecipeCard.vue'
import RecipeSearch from '../components/RecipeSearch.vue'
import { ref, computed, onMounted } from 'vue'
import { token, fetchUser } from '../stores/auth'

const recipes = ref([])
const searchText = ref('')
const searchMode = ref('name')

onMounted(async () => {
  if (token.value) {
    await fetchUser()
  }

  const response = await fetch(
    'http://localhost:3000/api/recipes'
  )

  const data = await response.json()

  console.log(data)

  recipes.value = data
})

function filterRecipes({ text, mode }) {

  searchText.value = text
  searchMode.value = mode
}

const filteredRecipes = computed(() => {
  if (!searchText.value.trim()) {
    return recipes.value
  }

  const query = searchText.value.toLowerCase()

  if (searchMode.value === 'name') {
    return recipes.value.filter(recipe =>
      recipe.name.toLowerCase().includes(query)
    )
  }

  return recipes.value.filter(recipe =>
    recipe.tags.some(tag =>
      tag.toLowerCase().includes(query)
    )
  )
})

function removeRecipe(recipeId) {
  recipes.value = recipes.value.filter(
    recipe => recipe._id !== recipeId
  )
}
</script>