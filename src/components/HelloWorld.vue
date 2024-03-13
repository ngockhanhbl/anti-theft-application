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

</script>

<template>
<div class="w-full">
  errorToggleCode:{{ errorToggleCode }} || headset:{{ headsetMode }} |headset {{ powerready }}
  <div class="flex justify-between">
    <div class="option-card rounded border border-sky-300" id="headset-card">
      <div class="h-full p-2 flex flex-col justify-between">
        <div>
          <div class="flex pb-2 justify-between">
            <span class="font-medium text-white">Power Detector</span>
            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox"
                v-model="powerMode"
                @click="togglePowerMode"
                class="sr-only peer"
              />
              <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
        <img src="../assets/energetic.svg" class="main-icon" alt="Electron logo" />
        <div>
          <p class="text-white des">An alarm sounds when the power cord is unplugged.</p>
        </div>
      </div>
    </div>
    <div class="option-card rounded border border-sky-300" id="headset-card">
      <div class="h-full p-2 flex flex-col justify-between">
        <div>
          <div class="flex pb-2 justify-between">
            <!-- <img src="../assets/headset.svg" class="icon mr-2" alt="Electron logo" /> -->
            <span class="font-medium text-white">Headset Detector</span>
            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox"
                v-model="headsetMode"
                @click="toggleHeadsetMode"
                class="sr-only peer"
              />
              <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
        <img src="../assets/headset.svg" class="main-icon" alt="Electron logo" />
        <div>
          <p class="text-white des">An alarm sounds when the headset is removed.</p>
        </div>
      </div>
    </div>
    <div class="option-card rounded border border-sky-300" id="headset-card">
      <div class="h-full p-2 flex flex-col justify-between">
        <div>
          <div class="flex pb-2 justify-between">
            <!-- <img src="../assets/headset.svg" class="icon mr-2" alt="Electron logo" /> -->
            <span class="font-medium text-white">Location Detector</span>
            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox"
                v-model="locationMode"
                @click="toggleLocationMode"
                class="sr-only peer"
              />
              <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
        <img src="../assets/direction.svg" class="main-icon" alt="Electron logo" />
        <div>
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
.box-container {
  
}
#power-card{
  background: url('../assets/pattern-1.jpg');
}
#headset-card{
  background: url('../assets/pattern-2.png');
  background: url('../assets/pattern-1.jpg');

}
#location-card{
  background: url('../assets/pattern-1.jpg');
}
</style>
