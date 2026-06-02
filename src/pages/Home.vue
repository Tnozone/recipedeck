<template>
  <div>
    <p class="text-center">Welcome. Upload a recipe or browse for one you like.</p>
  </div>
  <div></div>
</template>

<script setup>
  const currentUser =
    JSON.parse(localStorage.getItem('currentUser'))
</script>