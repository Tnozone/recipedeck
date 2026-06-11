<template>
    <div class="card p-2">
        <div class="card-header">
            <h5 class="card-title text-center">
                <router-link v-if="recipe" :to="`/recipe/${recipe._id}`">
                    {{ recipe.name }}
                </router-link>
            </h5>
        </div>
        <div class="card-body">
            <h5 class="fs-6 fw-bold">Ingredients:</h5>
            <p class="card-text">{{ recipe.ingredients }}</p>
            <h5 class=" fs-6 fw-bold">Steps:</h5>
            <p class="card-text">{{ recipe.steps }}</p>
        </div>
        <div class="card-footer">
            <p class="card-text">Posted by <router-link :to="`/user/${recipe.username}`">
                {{ recipe.username }}
            </router-link></p>
            <span class="fa fa-star"></span>
        </div>
    </div>
</template>

<script setup>
defineProps({
  recipe: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.card-title {
    color: #ffc107;
}

.card {
    border-style: double;
    border-color: #ffc107;
}
</style>