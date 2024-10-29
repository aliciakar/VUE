<script setup>
import { onMounted, ref } from 'vue'
import BurgerMenu from './components/BurgerMenu.vue'
onMounted(() => {
  //Vid mount kollar om locations finns och hämtar dem från localstorage
  let locations = JSON.parse(localStorage.getItem('locations'))
  //Finns inga locations läggs det till Greenwich som default
  if (!locations) {
    locations = [
      { name: 'Greenwich', position: { lat: 51.47, long: 0 }, default: true },
    ]
    localStorage.setItem('locations', JSON.stringify(locations))
  }
})
const menuActive = ref(false)
</script>

<template>
  <!--Menyn-->
  <header>
    <BurgerMenu @toggle-menu="menuActive = !menuActive" :active="menuActive" />
    <br />
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
