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

function playAudio() {
  //HTMLVideoElement
  document.getElementById("myAudio")?.play();
}
function stopAudio() {
  document.getElementById("myAudio")?.pause();
}

const updateDevices = () => {
  navigator.mediaDevices.enumerateDevices()
    .then(function(devices) {
      // check to see if we have any device with "head" in its name connected
      // like "headset" or "headphones"
      let headphonesConnected = devices
        .filter(device => /audio\w+/.test(device.kind))
        .find(device => device.label.toLowerCase().includes('head'));
      store.dispatch("setHeadsetReady", headphonesConnected ? true : false);
      console.log("headphonesConnected", headphonesConnected ? true : false);
    })
  ;
};

updateDevices();

// add an ondevicechange event listener so we can tell when
// an input device is connected and disconnected
navigator.mediaDevices.ondevicechange = updateDevices;

// detect theft
watch(() => store.getters.getPowerReady, async (newVal, oldVal) => {
  if (!newVal && powerMode.value) {
    store.dispatch("setDetectTheft", DetectTheftEnum.Power);
  }
})
watch(() => store.getters.getHeadsetReady, async (newVal, oldVal) => {
  if (!newVal && headsetMode.value) {
    store.dispatch("setDetectTheft", DetectTheftEnum.Headset);
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

    try {
      let historiesStr = localStorage.getItem("history");
      let history = {
        "date": new Date().toLocaleString(),
        "method": DetectTheftEnum[(newVal as DetectTheftEnum).valueOf()],
      }
      console.log(history);
      if (!historiesStr) {
        localStorage.setItem("history", JSON.stringify([history]));
      } else {
        let histories = JSON.parse(historiesStr);
        histories.unshift(history);
        localStorage.setItem("history", JSON.stringify(histories.slice(0, 20)));
      }
    } catch (error) {
      console.log(error)
    }
  } else {
    stopAudio();
  }
})
// end detect theft


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
