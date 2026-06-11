<template>
  <div class="container">
    <div class="row pt-3">
      <div>
        <RecipeCard v-if="recipe" :recipe="recipe" />

        <p v-else class="text-center fs-4">
          Loading...
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import RecipeCard from '../components/RecipeCard.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const recipe = ref(null)

onMounted(async () => {
  const response = await fetch(
    `http://localhost:3000/api/recipes/${route.params.id}`
  )

  const data = await response.json()

  console.log(data)

  recipe.value = data
})
</script>