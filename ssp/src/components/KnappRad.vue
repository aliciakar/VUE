<script setup>
import { ref } from 'vue'

const knappar=ref(['Sten', 'Sax', 'Påse']);

function spelarval(e) {
  let buttons = document.getElementsByClassName('alternativ')
  for (let b of buttons) {
    b.classList.remove('spelarval')
  }
  e.target.classList.add('spelarval')
  datorval()
  hittaVinnare()
}

function datorval() {
  let val = Math.floor(Math.random() * 3)
  let alternativ = ['Sten', 'Sax', 'Påse']
  let buttons = document.getElementsByClassName('alternativ')
  for (let b of buttons) {
    b.classList.remove('datorval')
    b.title = ''
    if (b.textContent == alternativ[val]) {
      b.classList.add('datorval')
      b.title = 'Datorns val'
    }
  }
}

</script>

<template>
    <div class="knapprad">
        <button v-for="knapp in knappar" class="alternativ" :key="knapp" @click="spelarval">
        {{ knapp }}
        </button>
    </div>
</template>

<style scoped>
button {
  padding: 0.6em 1.3em;
  font-size: 1.2em;
  background-color: #a5f8df;
  border: 1px solid #164767;
  border-radius: 5px;
  cursor: pointer;
}

.knapprad {
  display: flex;
  justify-content: center;
  gap: 1em;
}

button.spelarval {
  background-color: rgb(66, 204, 254);
}

button.datorval {
  border: red solid 2px;
}

</style>