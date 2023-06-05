<script setup>
import { RouterLink, RouterView } from 'vue-router'
import GoogleMap from './components/GoogleMap.vue'
import NcdotData from './components/NcdotData.vue'
</script>

<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
    <a class="navbar-brand" href="#">Navbar</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarsExampleDefault"
      aria-controls="navbarsExampleDefault"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarsExampleDefault">
      <RouterLink to="/">Home</RouterLink>
    </div>
  </nav>

  <main role="main" class="container">
    <div class="row app-sections">
      <div class="col-4"><NcdotData></NcdotData></div>
      <div class="col-8"><GoogleMap></GoogleMap></div>
    </div>
  </main>
</template>

<style scoped></style>
<!-- Explanation -->
<!-- include main API call -->
<!-- dropdowns for API options -->
<!-- change API call if needed -->
<!-- map section -->
<!-- Drop pins where incidents are -->
