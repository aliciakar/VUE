<script setup>
import UserCard from '@/components/UserCard.vue'
import johnDoe from '@/assets/images/JohnDoe.png'

const props = defineProps(['id'])
const user = ref({ id: props.id, namn: 'John Doe', image: johnDoe })

import userData from '@/assets/data/users.json'
import { ref, watchEffect } from 'vue'

const userList = ref(userData)

watchEffect(() => {
  user.value =
    userList.value.users.find((itm) => {
      if (itm.id == props.id) {
        itm.image = new URL(`../assets/images/${itm.bild}`, import.meta.url).href
        if (itm.image.endsWith('undefined')) {
          itm.image = johnDoe
        }
        return true
      }
    }) ?? user.value
})
</script>
<template>
  <h1>{{ user.namn }}</h1>
  <UserCard :user="user" />
  <RouterLink to="/user">Tillbaka till användarlistan</RouterLink>
</template>
