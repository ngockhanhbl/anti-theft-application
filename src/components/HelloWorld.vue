<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import ErrorToggleModal from './ErrorToggleModal.vue';
// import {ErrorToggleCodeEnum} from '../utils/constants';


// defineProps<{ msg: string }>()

const store = useStore()
const powerMode = ref(false)
const headsetMode = ref(false)
const locationMode = ref(false)

// test scrope
const powerready = computed(() => {
  return store.getters.getHeadsetReady;
})
// end test scrope

const errorToggleCode = computed(() => {
  return store.getters.getErrorToggleCode;
});

function togglePowerMode() {
  store.dispatch("togglePowerMode");
  setTimeout(() => {
    powerMode.value = store.getters.getPowerMode;
  }, 1)
}

function toggleHeadsetMode() {
  store.dispatch("toggleHeadsetMode");
  setTimeout(() => {
    headsetMode.value = store.getters.getHeadsetMode;
  }, 1)
}

function toggleLocationMode() {
  store.dispatch("toggleLocationMode");
  setTimeout(() => {
    locationMode.value = store.getters.getLocationMode;
  }, 1)
}


watch(() => store.getters.getHeadsetMode, async (newVal, oldVal) => {
  headsetMode.value = newVal;
})
watch(() => store.getters.getPowerMode, async (newVal, oldVal) => {
  powerMode.value = newVal;
})
watch(() => store.getters.getLocationMode, async (newVal, oldVal) => {
  locationMode.value = newVal;
})
</script>

<template>
<div class="w-100">
  <div class="d-flex justify-space-between">
    <div class="option-card rounded border-width  border-sky-300" >
      <div class="h-100 d-flex px-2 flex-column justify-space-between">
          <div class="d-flex pb-2 align-center justify-space-between">
            <span class="font-weight-medium text-white">Power Detector</span>
            <v-switch
              v-model="powerMode"
              label=""
              hide-details
              inset
              color="blue-accent-4"
              @click="togglePowerMode"
            ></v-switch>
          </div>
        <img src="../assets/energetic.svg" class="main-icon  py-2" alt="Electron logo" />
        <div class="py-2">
          <p class="text-white des">An alarm sounds when the power cord is unplugged.</p>
        </div>
      </div>
    </div>
    <div class="option-card rounded border-width border-sky-300" >
      <div class="h-100 px-2 d-flex flex-column justify-space-between">
        <div>
          <div class="d-flex pb-2 align-center justify-space-between">
            <span class="font-weight-medium text-white">Headset Detector</span>
            <v-switch
              v-model="headsetMode"
              label=""
              hide-details
              inset
              color="blue-accent-4"
              @click="toggleHeadsetMode"
            ></v-switch>
          </div>
        </div>
        <img src="../assets/headset.svg" class="main-icon py-2" alt="Electron logo" />
        <div class="py-2">
          <p class="text-white des ">An alarm sounds when the headset is removed.</p>
        </div>
      </div>
    </div>

    <div class="option-card rounded border-width border-sky-300" >
      <div class="h-100 px-2 d-flex flex-column justify-space-between">
        <div>
          <div class="d-flex pb-2 align-center justify-space-between">
            <span class="font-weight-medium text-white">Location Detector</span>
            <v-switch
              v-model="locationMode"
              label=""
              hide-details
              inset
              color="blue-accent-4"
              @click="toggleLocationMode"
            ></v-switch>
          </div>
        </div>
        <img src="../assets/direction.svg" class="main-icon  py-2 " alt="Electron logo" />
        <div class=" py-2 ">
          <p class="text-white des">An alarm sounds  when the laptop is moved.</p>
        </div>
      </div>
    </div>

  </div>

  <ErrorToggleModal />
</div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
.option-card {
  width: 280px;
  height: 200px;
  background: url('../assets/pattern-1.jpg');
}
.icon {
  width: 24px;
}
.main-icon{
  width: 70px;
  margin: 0 auto;
}
.des {
  font-size: 14px;
  text-align: center;
}

</style>
