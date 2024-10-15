<script setup>
import userData from '@/assets/data/users.json'
import { ref } from 'vue'

const userList = ref(userData)
const props = defineProps(['user'])
</script>
<template>
  <div class="card">
    <img :src="props.user.image" />
    <div>
      <p>id: {{ props.user.id }}</p>
      <p>Name: {{ props.user.namn }}</p>
    </div>
  </div>
</template>
<style scoped>
.card {
  display: flex;
  flex-direction: row;
  background-color: rgb(170, 255, 227);
  max-width: 250px;
  border: 1px solid rgb(35, 35, 106);
  box-shadow: 5px 5px 5px #7873a0;
}
p {
  margin-left: 1em;
  color: black;
}
img {
  height: 75px;
  padding: 3px;
}
</style>
