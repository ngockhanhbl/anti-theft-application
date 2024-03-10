<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import ErrorToggleModal from './ErrorToggleModal.vue';

defineProps<{ msg: string }>()

const store = useStore()

const powerModeComputed = computed(() => {
  return store.getters.getPowerMode;
});

watch(powerModeComputed, async (newVal, oldVal) => {
  powerMode.value = newVal
})

const powerMode = ref()

const headsetMode = computed(() => {
  return store.getters.getHeadsetMode;
})
const locationMode = computed(() => {
  return store.getters.getLocationMode;
})


function togglePowerMode(){
  console.log('togglePowerMode');
  store.dispatch("togglePowerMode");
}


const count = ref(0)
const as = ref(true)

const errorToggleCode = computed(() => {
  return store.getters.getErrorToggleCode;
});

</script>

<template>
<div class="w-full">
  {{ errorToggleCode }} {{ headsetMode }}
  <div class="flex justify-between">
    <div class="option-card rounded border border-slate-200	">
        <div class="h-full py-2 flex flex-col justify-between">
          <div>
            <div>Power Detector</div>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis tempora odit laudantium voluptatem impedit reprehenderit.</p>
          </div>
          <div>
            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox" @click="togglePowerMode" v-model="powerMode" class="sr-only peer">
              <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</span>
            </label>
          </div>
        </div>
    </div>
    <div class="option-card rounded border border-slate-200	">
      Headset Detector
    </div>
    <div class="option-card rounded border border-slate-200	">
      Location Detector
    </div>
  </div>

  <ErrorToggleModal />
</div>
  <!-- <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>
  <h1>{{ msg }}</h1> -->
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
.option-card {
  width: 280px;
  height: 200px;
}
.box-container {
  
}
</style>
