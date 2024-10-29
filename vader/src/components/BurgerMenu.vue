<script setup>
const emits = defineEmits(['toggle-menu'])
const props = defineProps(['active'])

function toggleActive() {
  emits('toggle-menu', !props.active) //Öppnar och stänger menyn
}

function closeMenu() {
  emits('toggle-menu', false) //Stänger menyn när man klickat på ett alternativ
}
</script>

<template>
  <!--När man klickar på diven togglar den active och öppnar/stänger menyn-->
  <div id="burger" :class="{ active: props.active }" @click="toggleActive">
    <button type="button" class="burger-button" title="Menu">
      <span class="burger-bar bar--1"></span>
      <span class="burger-bar bar--2"></span>
      <span class="burger-bar bar--3"></span>
    </button>
  </div>
  <br />
  <!--Navbar visas bara när active är togglat-->
  <nav class="navbar" v-show="props.active">
    <ul id="burgerlist">
      <li class="burgerlistalt">
        <!--@click stänger menyn vid click-->
        <RouterLink to="/" @click="closeMenu">Home</RouterLink>
      </li>

      <li class="burgerlistalt">
        <RouterLink to="/locations" @click="closeMenu">My Locations</RouterLink>
      </li>
    </ul>
  </nav>
</template>
<style scoped>
/*Listan och grafiskt */
#burger {
  display: block;
}
.burger-button {
  position: relative;
  height: 30px;
  width: 40px;
  display: block;
  z-index: 99;
  border: 0;
  border-radius: 0;
  background-color: transparent;
  pointer-events: all;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.burger-bar {
  background-color: #7ab1cd;
  position: absolute;
  top: 50%;
  right: 6px;
  left: 6px;
  height: 3px;
  width: auto;
  margin-top: -1px;
  transition:
    transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1),
    opacity 0.3s cubic-bezier(0.165, 0.84, 0.44, 1),
    background-color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
}
/*Streck ändrar färg vid hover*/
.burger-button:hover .burger-bar {
  background-color: #328790;
}
.bar--1 {
  -webkit-transform: translateY(-6px);
  transform: translateY(-6px);
  top: 40%;
}
.bar--2 {
  transform-origin: 100% 50%;
  transform: scaleX(1);
}
.bar--3 {
  transform: translateY(6px);
  top: 60%;
}
button {
  cursor: pointer;
}
#burger.active .burger-button {
  transform: rotate(-180deg);
}
#burger.active .bar--1 {
  transform: rotate(45deg);
  top: 50%;
}
#burger.active .bar--2 {
  opacity: 0;
}
#burger.active .bar--3 {
  transform: rotate(-45deg);
  top: 50%;
}

/*Lista:*/
ul {
  padding: 0;
  margin: 0;
  background-color: #e0f7ff;
  border: 2px dashed #9999dc;
  border-radius: 8px;
  overflow: hidden;
}

li {
  list-style-type: none;
  border-bottom: 1px solid #ccc; /* Linje mellan navs */
}

li:last-child {
  border-bottom: none;
}

li a {
  display: block; /* Länken fyller hela li */
  padding: 0.5em 1em;
  text-decoration: none;
  color: inherit;
}

li a:hover {
  background-color: #c7e5ef;
}

.navbar {
  display: block;
  width: 200px;
}
</style>
