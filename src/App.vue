<script setup>
import { RouterLink, RouterView } from 'vue-router'
import GoogleMap from './components/GoogleMap.vue'
import NcdotData from './components/NcdotData.vue'
</script>

<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
    <a class="navbar-brand pl-20" href="#">NC Incidents</a>
  </nav>

  <main role="main" class="container align-items-center top-level-container">
    <div class="row">
      <div class="col-md-5 col-lg-5 col-sm-12"><NcdotData></NcdotData></div>
      <div class="col-md-7 col-lg-7 col-sm-12"><GoogleMap></GoogleMap></div>
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
