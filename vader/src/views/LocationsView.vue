<script setup>
import router from '@/router'
import {
  getAddressFromCoords,
  getPosition,
} from '@/services/positioningService'
import { onMounted, ref } from 'vue'

//Skapar location const med dynamic property
const location = ref({
  name: '',
  position: { lat: 0, long: 0 },
  default: false,
  dynamic: false,
})
const locationsList = ref([])

onMounted(() => {
  locationsList.value = JSON.parse(localStorage.getItem('locations')) || []

  //Antingen hittar eller skapar current location
  let current = locationsList.value.find(loc => loc.dynamic === true)

  //Om inte current location redan finns
  if (!current) {
    current = {
      name: 'Current location',
      position: { lat: 0, long: 0 },
      default: false,
      dynamic: true,
    }
    //Lägger current högst upp i listan
    locationsList.value.unshift(current)
  }

  getPosition()
    .then(response => {
      current.position = response.position

      //Fetchar adressen från koordinaterna
      return getAddressFromCoords(response.position.lat, response.position.long)
    })
    .then(address => {
      //Gör namnet på location till adressen som den fetchat
      current.name = address
      let index = locationsList.value.findIndex(loc => loc.dynamic === true)
      locationsList.value.splice(index, 1, current)

      //Sparar i local storage
      localStorage.setItem('locations', JSON.stringify(locationsList.value))
    })
    //Vid error heter den current location
    .catch(err => {
      let index = locationsList.value.findIndex(
        loc => loc.name === 'Current location',
      )
      locationsList.value.splice(index, 1)
      console.log(err)
    })
})

function saveLocation() {
  getAddressFromCoords(
    location.value.position.lat,
    location.value.position.long,
  )
    .then(address => {
      //Kollar att location är dynamic (alltså current)
      if (location.value.dynamic) {
        //Om det är current, ändras namnet till adressen
        location.value.name = address || location.value.name
      }
      //Skapar locationslistan
      let locations = locationsList.value.filter(
        loc =>
          loc.name.toLowerCase().trim() !==
          location.value.name.toLowerCase().trim(),
      )
      //Pushar in den inskrivna locationen och resettar fields
      locations.push(location.value)
      locationsList.value = locations
      setLocation(location.value, false)
      resetLocation()
      localStorage.setItem('locations', JSON.stringify(locationsList.value))
    })
    .catch(err => {
      console.log('Failed to fetch address:', err)
      //Sparar utan adress om inte fetchen funkar
      let locations = locationsList.value.filter(
        loc =>
          loc.name.toLowerCase().trim() !=
          location.value.name.toLowerCase().trim(),
      )
      locations.push(location.value)
      locationsList.value = locations
      setLocation(location.value, false)
      resetLocation()
      localStorage.setItem('locations', JSON.stringify(locationsList.value))
    })
}

//Återställer alla inputs till noll
function resetLocation() {
  location.value = { name: '', position: { lat: 0, long: 0 }, default: false }
}

//Tar bort locationen från listan
function removeLocation(location) {
  locationsList.value = locationsList.value.filter(loc => {
    return loc !== location
  })
  //Kollar om den var default så att det alltid ska finnas en default
  if (location.default && locationsList.value.length > 0) {
    locationsList.value[0].default = true
  }
  //Sparar den uppdaterade listan till localstorage
  localStorage.setItem('locations', JSON.stringify(locationsList.value))
}

function setLocation(location, navigate) {
  //Kollar om location finns i listan
  if (locationsList.value.indexOf(location) === -1) {
    return
  }
  //Sätter default
  locationsList.value.map(itm => {
    itm.default = itm === location
  })
  //Om navigate är true tar den en till forecasten för den locationen
  if (navigate) {
    router.push(`/forecast/${location.name}`)
  }
  localStorage.setItem('locations', JSON.stringify(locationsList.value))
}
</script>
<template>
  <h2>My Locations</h2>
  <br />
  <hr />
  <br />
  <h3>My saved locations</h3>
  <ul>
    <li
      v-for="loc in locationsList"
      :key="loc.name"
      :class="loc.default ? 'default' : ''"
      @click="setLocation(loc, true)"
    >
      <!--Displayar koordinater-->
      {{ loc.name }}
      ({{ Math.abs(loc.position?.lat ?? 0).toFixed(2) }}°{{
        loc.position?.lat > 0 ? 'N' : 'S'
      }}
      {{ Math.abs(loc.position?.long ?? 0).toFixed(2) }}°{{
        loc.position?.long > 0 ? 'E' : 'W'
      }})
      <!--Ta bort knapp visas endast om den inte är dynamic (current location)-->
      <span
        class="remove"
        @click="removeLocation(loc)"
        v-show="loc.name !== 'Current location' && !loc.dynamic"
        >x</span
      >
    </li>
  </ul>
  <br />
  <hr />
  <br />
  <h3>Add location</h3>
  <label
    >Name:
    <input
      type="text"
      v-model="location.name"
      class="input"
      placeholder="Location name"
  /></label>
  <label
    >Lat:
    <input
      type="number"
      class="input"
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
      class="input"
      max="180"
      min="-180"
      step=".1"
      size="6"
      v-model="location.position.long"
  /></label>
  <!--Vid klick körs save och reset location-->
  <button @click="saveLocation" id="savelocation">Save</button>
  <button @click="resetLocation" id="resetlocation">Reset</button>
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

.input {
  padding: 4px;
  width: 100%;
  max-width: 300px;
  font-size: 14px;
  color: #333;
  background-color: #ffffff;
  border: 1.5px solid #ccc;
  border-radius: 5px;
  outline: none;
}

input[type='number'] {
  text-align: right;
  width: 40%;
  margin-left: 5px;
}

.default {
  font-weight: bold;
}

h3 {
  margin-bottom: 6px;
}

ul {
  padding: 0;
  min-width: 100px;
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

#savelocation,
#resetlocation {
  background-color: #f5fbff;
  color: rgb(57, 62, 97);
  padding: 6px 14px;
  margin-top: 12px;
  border: solid rgb(101, 108, 153) 2px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

#resetlocation {
  margin-left: 6px;
}

#savelocation:hover,
#resetlocation:hover {
  background-color: #ceecea;
}
</style>
