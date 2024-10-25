<script setup>
import CurrentResult from '@/components/CurrentResult.vue'
import ForecastResult from '@/components/ForecastResult.vue'
import { getForecast, getCurrentWeather } from '@/services/forecastService'
import { watchEffect, ref } from 'vue'

const currentLocation = ref({
  lat: 60.0,
  long: 20.0,
  name: 'Nuvarande position',
})

const current = ref({})
const forecast = ref({})
const props = defineProps(['location'])

watchEffect(() => {
  let locationsList = JSON.parse(localStorage.getItem('locations'))
  if (props.location) {
    currentLocation.value = locationsList.find(loc => {
      return loc.name.toLocaleLowerCase() === props.location.toLocaleLowerCase()
    })
  } else {
    currentLocation.value = locationsList.find(loc => {
      return loc.default
    })
  }
  if (currentLocation.value) {
    getForecast(currentLocation.value)
      .then(response => {
        forecast.value = response
      })
      .catch(err => {
        console.log(err)
      })
    getCurrentWeather(currentLocation.value)
      .then(response => {
        current.value = response
      })
      .catch(err => {
        console.log(err)
      })
  }
})
</script>
<template>
  <template v-if="!currentLocation">
    <h2>Angiven plats saknas</h2>
    <p>{{ props.location }} finns inte i listan över platser.</p>
  </template>

  <template v-else>
    <h2>{{ currentLocation.name }}</h2>
    <p class="location">
      Lat: <span>{{ currentLocation.position.lat.toFixed(3) }}</span>
    </p>
    <p class="location">
      Long: <span> {{ currentLocation.position.long.toFixed(3) }}</span>
    </p>
    <CurrentResult :cuwea="current" />
    <ForecastResult :forecast="forecast" />
  </template>
</template>
<style scoped>
.location {
  display: inline-block;
  margin: 0 1em;
}
</style>
