<template>
    <div class="card">
        <div class="card-header">
            <h5 class="card-title text-center">{{ recipe.name }}</h5>
        </div>
        <div class="card-body">
            <p class="card-text">{{ recipe.ingredients }}</p>
            <p class="card-text">{{ recipe.steps }}</p>
        </div>
        <div class="card-footer">
            <p class="card-text">Posted by {{ recipe.username }}</p>
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
</style>