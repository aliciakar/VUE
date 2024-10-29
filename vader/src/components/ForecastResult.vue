<script setup>
import wc from '@/assets/data/weatherCodes.json'
import { ref } from 'vue'
const props = defineProps(['forecast'])
const weatherCodes = ref(wc)

//Funktion som hämtar vädertext + symbol
function getText(code, withSymbol = true) {
  const wcText = weatherCodes.value.find(itm => itm.code == code) || {
    description: 'Unknown',
    symbol: '❓',
  }
  return withSymbol
    ? `${wcText.description} ${wcText.symbol}`
    : wcText.description
}

//Funktion som hämtar vindriktning
function getWindDirection(deg) {
  const directions = [
    'N ⇓',
    'NE ⇙',
    'E ⇐',
    'SE ⇖',
    'S ⇑',
    'SW ⇗',
    'W ⇒',
    'NW ⇘',
  ]
  //Returnar som ett index där gradtal motsvarar riktning
  //som jämförs med consten
  const index = Math.round(deg / 45) % 8
  return directions[index]
}
</script>

<template>
  <br />
  <ul>
    <li>Date</li>
    <li>Temp</li>
    <li>Precip</li>
    <li>Wind</li>
  </ul>
  <!--Lista som visar forecast sju dagar framåt,
  hämtas från forecastservice och forecastview-->
  <ul v-for="day in props.forecast.weather" :key="day">
    <li>
      {{ new Date(day.date).getDate() }}.{{ new Date(day.date).getMonth() + 1 }}
      {{ getText(day.code) }}
    </li>
    <li>
      {{ day.temp.min }}{{ day.temp.unit }} — {{ day.temp.max
      }}{{ day.temp.unit }}
    </li>
    <li>
      {{ day.precipitation.sum }} {{ day.precipitation.unit }}<br />
      ({{ day.precipitation.probability }}%)
    </li>
    <li>
      {{ Math.round(day.wind.speed) }} ({{ Math.round(day.wind.gusts) }})
      {{ day.wind.unit }}<br />Wind direction:
      {{ getWindDirection(day.wind.direction) }}
    </li>
  </ul>
</template>
<style scoped>
ul {
  padding: 0;
  display: grid;
  grid-template-columns: 22% 22% 15% auto;
}

/*Varannan är blå, varannan gul*/
ul:nth-child(even) {
  background-color: rgb(164, 234, 255);
}

ul:nth-child(odd) {
  background-color: rgb(255, 245, 233);
}

li {
  padding: 0 0.5em;
  list-style-type: none;
  vertical-align: top;
  color: rgb(59, 64, 93);
}
</style>
