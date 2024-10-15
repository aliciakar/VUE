<script setup>
document.title = 'Home'
import { inject, onMounted, ref } from 'vue'

const tid = ref(new Date().toLocaleString())
const views = inject('HomeViews')
onMounted(() => {
  views.value++
})
</script>
<template>
  <main>
    <p>
      När sidan laddades var klockan <br />
      {{ tid }}
    </p>
    <p>
      Den här sidan har visats: <b>{{ views }}</b> gånger
    </p>
    <ul>
      <li>
        <RouterLink to="/my">My view</RouterLink>
      </li>
      <li>
        <RouterLink to="/user">Userview</RouterLink>
      </li>
    </ul>
  </main>
</template>
