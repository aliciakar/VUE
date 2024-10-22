<script setup>
import router from '@/router'
import { onMounted, ref } from 'vue'

const location = ref({
  name: '',
  position: { lat: 0, long: 0 },
  default: false,
})
const locationsList = ref([])

onMounted(() => {
  locationsList.value = JSON.parse(localStorage.getItem('locations'))
})

function saveLocation() {
  let locations = locationsList.value.filter(loc => {
    return (
      loc.name.toLocaleLowerCase().trim() !=
      location.value.name.toLocaleLowerCase().trim()
    )
  })
  locations.push(location.value)
  locationsList.value = locations
  setLocation(location.value, false)
  resetLocation()
  localStorage.setItem('locations', JSON.stringify(locationsList.value))
}

function resetLocation() {
  location.value = { name: '', position: { lat: 0, long: 0 }, default: false }
}

function removeLocation(location) {
  locationsList.value = locationsList.value.filter(loc => {
    return loc !== location
  })
  if (location.default && locationsList.value.length > 0) {
    locationsList.value[0].default = true
  }
  localStorage.setItem('locations', JSON.stringify(locationsList.value))
}

function setLocation(location, navigate) {
  if (locationsList.value.indexOf(location) === -1) {
    return
  }
  locationsList.value.map(itm => {
    itm.default = itm === location
  })
  if (navigate) {
    router.push(`/forecast/${location.name}`)
  }
  localStorage.setItem('locations', JSON.stringify(locationsList.value))
}
</script>
<template>
  <h2>Locations</h2>
  <label
    >Namn:
    <input type="text" v-model="location.name" placeholder="Location name"
  /></label>
  <label
    >Lat:
    <input
      type="number"
      max="90"
      min="-90"
      step=".1"
      size="5"
      v-model="location.position.lat"
  /></label>
  <label
    >Long:
    <input
      type="number"
      max="180"
      min="-180"
      step=".1"
      size="6"
      v-model="location.position.long"
  /></label>
  <button @click="saveLocation">Save</button>
  <button @click="resetLocation">Reset</button>
  <hr />
  <h3>List</h3>
  <ul>
    <li
      v-for="loc in locationsList"
      :key="loc"
      :class="loc.default ? 'default' : ''"
      @click="setLocation(loc, true)"
    >
      {{ loc.name }}
      ({{ Math.abs(loc.position?.lat ?? 0).toFixed(2) }}°{{
        loc.position?.lat > 0 ? 'N' : 'S'
      }}
      {{ Math.abs(loc.position?.long ?? 0).toFixed(2) }}°{{
        loc.position?.long > 0 ? 'E' : 'W'
      }})
      <span class="remove" @click="removeLocation(loc)">x</span>
    </li>
  </ul>
</template>
<style scoped>
label {
  display: block;
  width: 15em;
  padding-top: 0.5em;
}

.default {
  font-weight: bold;
}

input[type='number'] {
  text-align: right;
}

.default {
  font-weight: bold;
}

ul {
  padding: 0;
}

li {
  padding: 0 0.2em;
  list-style: none;
  background-color: rgb(164, 234, 255);
  cursor: pointer;
}

li:nth-child(even) {
  background-color: rgb(255, 245, 233);
}

.remove {
  background-color: rgb(255, 63, 63);
  border: 1px solid white;
  float: right;
  padding: 0 0.2em 0.3em 0.2em;
  margin-top: 0.1em;
  font-size: small;
  line-height: 1em;
  color: white;
  cursor: pointer;
}
</style>
