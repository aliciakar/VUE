<script setup>
import CurrentResult from '@/components/CurrentResult.vue'
import ForecastResult from '@/components/ForecastResult.vue'
import { getForecast, getCurrentWeather } from '@/services/forecastService'
import { watchEffect, ref } from 'vue'

//Har en default location som Greenwich, GB
const currentLocation = ref({
  lat: 51.47,
  long: 0,
  name: 'Greenwich',
})

//Consts för current, forecast och hämtar prop location
const current = ref({})
const forecast = ref({})
const props = defineProps(['location'])

//Triggar varje gång props.location eller locationslist ändras
watchEffect(() => {
  let locationsList = JSON.parse(localStorage.getItem('locations'))
  //Kollar om en location blivit propad och hittar den
  if (props.location) {
    currentLocation.value = locationsList.find(loc => {
      return loc.name.toLocaleLowerCase() === props.location.toLocaleLowerCase()
    })
    //Tar default annars
  } else {
    currentLocation.value = locationsList.find(loc => {
      return loc.default
    })
  }

  //Om den hittar en fetchar den forecasten och current weather
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
  <!--Om given location saknas i locationslist säger den att den saknas-->
  <template v-if="!currentLocation">
    <h2>Angiven plats saknas</h2>
    <p>{{ props.location }} finns inte i listan över platser.</p>
  </template>

  <!--Annars visar all info-->
  <template v-else>
    <h2>{{ currentLocation.name }}</h2>
    <p class="location">
      Lat: <span>{{ currentLocation.position.lat.toFixed(3) }}</span>
    </p>
    <p class="location">
      Long: <span> {{ currentLocation.position.long.toFixed(3) }}</span>
    </p>

    <!--Fetchar komponenterna från current- och forecastresult-->
    <div id="currentbox">
      <CurrentResult :cuwea="current" />
    </div>
    <h2>Forecast</h2>
    <ForecastResult :forecast="forecast" />
  </template>
</template>
<style scoped>
.location {
  display: inline-block;
  margin: 0 1em;
}
#currentbox {
  margin: 5px;
}
</style>
