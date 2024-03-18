<script setup lang="ts">
import HomePage from './components/HomePage.vue';
import CreatePasswordModal from './components/CreatePasswordModal.vue';
import ConfirmPasswordModal from './components/ConfirmPasswordModal.vue';
import ChangePasswordModal from './components/ChangePasswordModal.vue';
import Snackbar from './components/snackbar/Snackbar.vue';
import InfoModal from './components/modal/InfoModal.vue';
import HistoryModal from './components/HistoryModal.vue';
import AudioSettingsModal from './components/AudioSettingsModal.vue';
import LearnAlarmModal from './components/LearnAlarmModal.vue';
import {DetectTheftEnum} from './utils/constants';

import { ref, watch, computed } from 'vue'
import { useStore } from 'vuex';
import { ISnackbar } from './utils/interface_type';
import { setLidDoNothing } from './demos/ipc';
 

const store = useStore()

const audioSrc = ref('');
const audioRef = ref<HTMLAudioElement>();

const powerMode = computed(() => {
  return store.getters.getPowerMode;
});

const headsetMode = computed(() => {
  return store.getters.getHeadsetMode;
})

// const locationMode = computed(() => {
//   return store.getters.getLocationMode;
// })


function playAudio() {
  //HTMLVideoElement
  document.getElementById("myAudio")?.play();
}
function stopAudio() {
  document.getElementById("myAudio")?.pause();
}

function setAudioVolume(val: number) {
  setTimeout(() => {
    console.log(document.getElementById("myAudio"));
    if (document.getElementById("myAudio")) {
      document.getElementById("myAudio")!.volume = val;
    }
  }, 1000)
}

function getCurrentAudio() {
  let audioStr = localStorage.getItem("audio");
  if (audioStr) {
    store.dispatch("setCurrentAudio", audioStr);
  }
  setAudioVolume(1);
}

getCurrentAudio();

const updateDevices = () => {
  navigator.mediaDevices.enumerateDevices()
    .then(function(devices) {
      // check to see if we have any device with "head" in its name connected
      // like "headset" or "headphones"
      let headphonesConnected = devices
        .filter(device => /audio\w+/.test(device.kind))
        .find(device => device.label.toLowerCase().includes('head'));
      store.dispatch("setHeadsetReady", headphonesConnected ? true : false);
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
  // console.log("detectTheft", newVal)
  if (newVal !== DetectTheftEnum.None.valueOf()) {
    playAudio();
    store.dispatch("setVisibleConfirmPasswordModal", true);

    try {
      let historiesStr = localStorage.getItem("history");
      let history = {
        "date": new Date().toLocaleString(),
        "method": DetectTheftEnum[(newVal as DetectTheftEnum).valueOf()],
      }
      if (!historiesStr) {
        localStorage.setItem("history", JSON.stringify([history]));
      } else {
        let histories = JSON.parse(historiesStr);
        histories.unshift(history);
        localStorage.setItem("history", JSON.stringify(histories.slice(0, 20)));
      }
    } catch (error) {
      // console.log(error)
    }
  } else {
    stopAudio();
  }
})
// end detect theft

watch(() => store.getters.getCurrentAudio, async (newVal, oldVal) => {
  localStorage.setItem("audio", newVal);

  audioSrc.value = './assets/audio/' + newVal;
},{ immediate: true });

watch(() => store.getters.getAudioVolume, async (newVal, oldVal) => {
  if (newVal <= 30) {
    const snackbar: ISnackbar = {
      msg: newVal === 0 ? 'warning! you haven\'t turned up the volume yet' : 'Your volume is a bit low. Do you want to open it louder?',
      timeout: 6000,
      actionName: 'Yes, I do',
      actionCallback: () => {
        console.log("callback call")
        store.dispatch("setAudioModal", true)
      },
      open: true,
    }
    store.dispatch("setSnackbar", snackbar)
  }
});

</script>

<template>
  <div class="main">
    <HomePage />
    <CreatePasswordModal />
    <ConfirmPasswordModal />
    <ChangePasswordModal  />
    <HistoryModal />
    <AudioSettingsModal />
    <LearnAlarmModal />
    <Snackbar />
    <InfoModal />
    <audio id="myAudio" ref="audioRef" controls loop preload="none" hidden>
      <!-- <source :src=audioSrc type="audio/mpeg">
      <source :src=audioSrc type="audio/mpeg"> -->
      <source src="./assets/audio/honk.mp3" type="audio/mpeg">
    </audio>
  </div>
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
