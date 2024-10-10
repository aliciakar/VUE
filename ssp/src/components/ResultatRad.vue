<script setup>
import { ref, watch } from 'vue'

const props = defineProps(['valdaKnappar'])
const emit = defineEmits(['vinnare'])

const resultat = ref('Låt spelet börja!')

watch(props, () => {
  if (props.valdaKnappar.spelare == props.valdaKnappar.dator) {
    resultat.value = 'Oavgjort!'
  } else if (props.valdaKnappar.spelare % 2 == props.valdaKnappar.dator % 2) {
    //Samma paritet - Högsta talet vinner
    if (props.valdaKnappar.spelare > props.valdaKnappar.dator) {
      resultat.value = 'Du vann!'
      emit('vinnare', 'spelare')
    } else {
      resultat.value = 'Datorn vann!'
      emit('vinnare', 'dator')
    }
  } else {
    //Olika paritet - Lägsta talet vinner
    if (props.valdaKnappar.spelare < props.valdaKnappar.dator) {
      resultat.value = 'Du vann!'
      emit('vinnare', 'spelare')
    } else {
      resultat.value = 'Datorn vann!'
      emit('vinnare', 'dator')
    }
  }
})
</script>
<template>
  <div class="resultat">
    <p id="resultat">{{ resultat }}</p>
  </div>
</template>

<style scoped>
.resultat {
  font-size: 1.2em;
  text-align: center;
  margin: 1.2em 0;
}
</style>
