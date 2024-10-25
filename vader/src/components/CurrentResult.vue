<script setup>
import wc from '@/assets/data/weatherCodes.json'
import { ref } from 'vue'
const props = defineProps(['cuwea'])
const weatherCodes = ref(wc)

function getText(code, withSymbol = true) {
  const wcText = weatherCodes.value.find(itm => itm.code == code)
  || { description: 'Unknown', symbol: '❓' };
  return withSymbol ? `${wcText.description} ${wcText.symbol}` : wcText.description;
}

function getWindDirection(deg) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  const index = Math.round(deg / 45) % 8
  return directions[index]
}
</script>
<template>
  <br />
  <h3>Current Weather</h3>

  <ul v-for="day in props.cuwea.weather" :key="day">
    <li>
      {{ getText(day.code) }}
    </li>
    <li>
      {{ day.temp.temp }}{{ day.temp.unit }} (Feels like {{ day.temp.aptemp
      }}{{ day.temp.unit }})
    </li>
    <li>Relative humidity: {{ day.humidity.relativehumidity }} {{ day.humidity.unit }}</li>
    <li>
      Wind speed: {{ Math.round(day.wind.speed) }} ({{
        Math.round(day.wind.gusts)
      }}) {{ day.wind.unit }}<br />Wind direction:
      {{ getWindDirection(day.wind.direction) }} ({{ day.wind.direction
      }} {{ day.wind.direction_unit }})
    </li>
    <li>Cloud cover: {{ day.cloud.cover }} {{ day.cloud.unit }}</li>
    <li>Pressure: {{ day.pressure.pressure }} {{ day.pressure.unit }}</li>
    <li>Precipitation: {{ day.precipitation.precip }} {{ day.precipitation.unit }}</li>
  </ul>
</template>
<style scoped>
ul {
  padding: 0;
  display: grid;
  grid-template-columns: 22% 22% 15% auto;
  background-color: rgb(222, 248, 255);
  border: 2px rgb(153, 153, 220) dashed;
}

li {
  padding: 0 0.5em;
  list-style-type: none;
  vertical-align: top;
}
</style>
