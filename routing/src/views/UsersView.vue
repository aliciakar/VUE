<script setup>
import jimmy from '@/assets/images/jimmy.jfif'
import UserCard from '@/components/UserCard.vue'
import userData from '@/assets/data/users.json'
import UsersList from '@/components/UsersList.vue'
import { ref } from 'vue'
const users = ref(userData)
document.title = 'Users'
</script>
<template>
  <div class="users">
    <h1>Användarsida</h1>
    <UserCard :user="{ id: 1, namn: 'Jimmy', image: jimmy }" />
    <UsersList :user-list="users" />
  </div>
</template>
<style scoped></style>
