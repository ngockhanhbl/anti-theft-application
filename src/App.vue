<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import { ref, watch, computed } from 'vue'
import { useStore } from 'vuex';

const store = useStore()

const powerMode:boolean = computed(() => {
  return store.getters.getPowerMode;
});

const headsetMode = computed(() => {
  return store.getters.getHeadsetMode;
})
const locationMode = computed(() => {
  return store.getters.getLocationMode;
})

watch(powerMode, async (newVal, oldVal) => {
  console.log(newVal);
  if (newVal) {

  }
})
</script>

<template>
  <!-- <div>
    <a href="https://www.electronjs.org/" target="_blank">
      <img src="./assets/electron.svg" class="logo electron" alt="Electron logo" />
    </a>
    <a href="https://vitejs.dev/" target="_blank">
      <img src="./assets/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div> -->
  <div class="main">
    <HelloWorld msg="Electron + Vite + Vue" />
  </div>
  <!-- <div class="flex-center">
    Place static files into the <code>/public</code> folder
    <img style="width: 2.4em; margin-left: .4em;" src="/logo.svg" alt="Logo">
  </div> -->
</template>

<style>
.main {
 width: 900px;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo.electron:hover {
  filter: drop-shadow(0 0 2em #9FEAF9);
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
