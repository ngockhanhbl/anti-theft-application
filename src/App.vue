<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import CreatePasswordModal from './components/CreatePasswordModal.vue';
import ConfirmPasswordModal from './components/ConfirmPasswordModal.vue';
import {DetectTheftEnum} from './utils/constants';

import { ref, watch, computed } from 'vue'
import { useStore } from 'vuex';

const store = useStore()

const powerMode = computed(() => {
  return store.getters.getPowerMode;
});

const headsetMode = computed(() => {
  return store.getters.getHeadsetMode;
})

const locationMode = computed(() => {
  return store.getters.getLocationMode;
})

// setTimeout(() => {
//   console.log("starting setVisibleConfirmPassword");
//   store.dispatch("setVisibleConfirmPasswordModal", true);
// }, 5000);

function playAudio() {
  //HTMLVideoElement
  document.getElementById("myAudio")?.play();
}
function stopAudio() {
  document.getElementById("myAudio")?.pause();
}


watch(() => store.getters.getPowerReady, async (newVal, oldVal) => {
  console.log("powerReady", newVal)
  console.log("powerMode", powerMode.value)
  if (!newVal && powerMode.value) {
    store.dispatch("setDetectTheft", DetectTheftEnum.Power);
  }
})

watch(() => store.getters.getDetectTheft, async (newVal, oldVal) => {
  console.log("detectTheft", newVal)
  console.log("DetectTheftEnum.None.valueOf", DetectTheftEnum.None.valueOf())
  if (newVal !== DetectTheftEnum.None.valueOf()) {
    // play audio
    playAudio();
    // show pop-up
    store.dispatch("setVisibleConfirmPasswordModal", true);

    // TODO write log to db. thoi gian - phuong thuc (10 lan gan nhat).
  } else {
    stopAudio();
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
    <CreatePasswordModal />
    <ConfirmPasswordModal />
    <audio id="myAudio" controls loop preload="none" hidden>
      <source src="./assets/audio/audio.mp3" type="audio/mpeg">
      <source src="./assets/audio/audio.ogg" type="audio/ogg" />
    </audio>
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
