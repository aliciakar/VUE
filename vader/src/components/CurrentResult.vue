<script setup>
import wc from '@/assets/data/weatherCodes.json'
import { ref } from 'vue'
const props = defineProps(['cuwea'])
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
  <h3>Current Weather</h3>

  <!--Lista som visar dagens väder,
  hämtas från forecastservice och forecastview-->
  <ul v-for="day in props.cuwea.weather" :key="day">
    <li>
      {{ getText(day.code) }}
    </li>
    <li>
      {{ day.temp.temp }}{{ day.temp.unit }} (Feels like {{ day.temp.aptemp
      }}{{ day.temp.unit }})
    </li>
    <li>
      Relative humidity: {{ day.humidity.relativehumidity }}
      {{ day.humidity.unit }}
    </li>
    <li>
      Wind speed: {{ Math.round(day.wind.speed) }} ({{
        Math.round(day.wind.gusts)
      }}) {{ day.wind.unit }}<br />Wind direction:
      {{ getWindDirection(day.wind.direction) }}
    </li>
    <li>Cloud cover: {{ day.cloud.cover }} {{ day.cloud.unit }}</li>
    <li>Pressure: {{ day.pressure.pressure }} {{ day.pressure.unit }}</li>
    <li>
      Precipitation: {{ day.precipitation.precip }} {{ day.precipitation.unit }}
    </li>
  </ul>
</template>
<style scoped>
ul {
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background-color: rgb(222, 248, 255);
  border: 2px rgb(153, 153, 220) dashed;
  min-width: 400px;
}

li {
  padding: 0 0.5em;
  list-style-type: none;
  vertical-align: top;
}
</style>
