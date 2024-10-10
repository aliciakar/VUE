<script setup>
import { ref } from 'vue'
import KnappRad from './components/KnappRad.vue'
import ResultatRad from './components/ResultatRad.vue'
import PoangRad from './components/PoangRad.vue'

const knappar = ref(['Sten', 'Sax', 'Påse'])
const resultat = ref({})
const vinnare = ref('')
const reset = ref(true)

function raknaPoang(v) {
  vinnare.value = v
}

function hittaVinnare(valdaKnappar) {
  vinnare.value = ''
  reset.value = false
  let spelare = knappar.value.indexOf(valdaKnappar.spelare)
  let dator = knappar.value.indexOf(valdaKnappar.dator)
  resultat.value = { spelare: spelare, dator: dator }
}
</script>

<template>
  <header>
    <h1>Sten, sax, påse!</h1>
  </header>

  <main>
    <KnappRad :knappar="knappar" @valda-knappar="hittaVinnare" :reset="reset" />

    <ResultatRad :valda-knappar="resultat" @vinnare="raknaPoang" :reset="reset" />

    <PoangRad :vinnare="vinnare" :reset="reset" />

    <div class="score">
      <button id="nolla" @click="reset = true">Nollställ poängen</button>
    </div>
  </main>
</template>

<style scoped>
header {
  text-align: center;
  margin-bottom: 1.2em;
}

button {
  padding: 0.6em 1.3em;
  font-size: 1.2em;
  background-color: #a5f8df;
  border: 1px solid #164767;
  border-radius: 5px;
  cursor: pointer;
}

.score {
  font-size: 1.2em;
  text-align: center;
}

button#nolla {
  margin-top: 2em;
  padding: 0.3em 0.6em;
  font-size: 0.8em;
}
button#nolla:hover {
  background-color: #7bd7bc;
}
</style>
