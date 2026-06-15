<template>
  <div>
    <p class="text-center fs-3 mt-3 mb-3">Recipes posted by {{ username }}.</p>
    <RecipeSearch @search="filterRecipes" class="m-3" />
  </div>
  <div class="container">
    <div class="row">
      <div
        v-for="recipe in filteredRecipes"
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
import { ref, computed, onMounted } from 'vue'
import RecipeCard from '../components/RecipeCard.vue'
import RecipeSearch from '../components/RecipeSearch.vue'

const route = useRoute()

const username = route.params.username

const recipes = ref([])
const searchText = ref('')
const searchMode = ref('name')

onMounted(async () => {
  const response = await fetch(
    `http://localhost:3000/api/recipes/user/${username}`
  )

  recipes.value = await response.json()
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
</script>