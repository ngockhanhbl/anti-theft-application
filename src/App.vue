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

import { ref, watch, computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex';
import { ISnackbar } from './utils/interface_type';
import { setLidDoNothing } from './demos/ipc';
import { getAudioAssetUrl } from './utils/helper_function';
 

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

const showWarning = ref(true);

function checkisShowWarning() {
  let total = localStorage.getItem("totalAppOpens");
  if (!total) {
    localStorage.setItem("totalAppOpens", '1');
    return true;
  } else {
    try {
      let count = Number(total);
      return (count > 20) ? false : true; 
    } catch(e) {
      return true;
    }
  }

}
onBeforeMount(() => {
  showWarning.value = checkisShowWarning();
})



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
  // maximum volume of system volume
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

function openSettingAlarm() {
  store.dispatch('setLearnAlarmModal', true);
}

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

watch( () => store.getters.getCurrentAudio, async (newVal, oldVal) => {
  localStorage.setItem("audio", newVal);

  audioSrc.value = getAudioAssetUrl(newVal).toString();
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
  <div class="main h-100">
      <div v-show="showWarning" class="warning rounded px-1 py-1 border-width border-sky-30">By default when someone lids your computer,the application will not make a sound to warn you, so please set mode do nothing <span class="text-decoration-underline cursor-pointer	" @click="openSettingAlarm" >here</span> </div>
      <div class="main-content w-100">
        <HomePage />
        <CreatePasswordModal />
        <ConfirmPasswordModal />
        <ChangePasswordModal  />
        <HistoryModal />
        <AudioSettingsModal />
        <LearnAlarmModal />
        <Snackbar />
        <InfoModal />
        {{ audioSrc }}
        <audio id="myAudio" ref="audioRef" controls loop preload="none" hidden>
          <source :src="audioSrc" type="audio/mpeg">
          <!-- <source src="./assets/audio/my_custom_audio.mp3" type="audio/mpeg"> -->
        </audio>
      </div>
    
  </div>
</template>

<style>
.main {
 width: 900px;
 position: relative;
}

.main-content {
  position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
.warning {
  position: absolute;
  background: blueviolet;
  color: white;
  text-align: center;
  line-height: 1.6rem;
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
