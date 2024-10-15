<script setup>
document.title = 'About'

import { inject } from 'vue'
const views = inject('HomeViews')
</script>

<template>
  <main>
    <p>
      Homeviews har visats
      <b>{{ views }}</b>
      gånger
    </p>
  </main>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
