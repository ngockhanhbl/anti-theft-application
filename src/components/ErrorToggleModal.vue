<template>
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-10" @close="closeFunc">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>
  
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">
                    <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">{{error?.title ?? 'Error'}}</DialogTitle>
                      <div class="mt-2">
                        <p class="text-sm text-gray-500">{{error?.msg ?? ''}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <!-- <button type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" @click="open = false">Deactivate</button> -->
                  <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="closeFunc" ref="cancelButtonRef">Cancel</button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { useStore } from 'vuex';
  import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline';
  import {ErrorToggleCodeEnum, getErrorToggleCodeEnumList} from '../utils/constants';

  const open = ref(false);
  const store = useStore();

  function closeFunc() {
    open.value = false;
    setTimeout(() => {
      store.dispatch("resetToggleCode")
    }, 200)
  }

  // const errorToggleCode = computed(() => {
  //   return store.getters.getErrorToggleCode;
  // });

  const errors = ref([
    {
        code: ErrorToggleCodeEnum.PowerErr,
        title: 'Toggle Power Detect Fail',
        msg: 'Your device is in an uncharged state. Please plug in the charger to use this function'
    },
    {
        code: ErrorToggleCodeEnum.HeadsetErr,
        title: 'Toggle Headset Detect Fail',
        msg: 'You have not plugged the headset into the device. Please plug Headset to use this function'
    },
    {
        code: ErrorToggleCodeEnum.LocationErr,
        title: 'Toggle Location Detect Fail',
        msg: 'Please allow Anti Theft use your location'
    },
  ])

  const error = ref<object | null>(errors.value[0]);

  watch(() => store.getters.getErrorToggleCode, async (newVal, oldVal) => {
    console.log("newVal, ", newVal)
    console.log(getErrorToggleCodeEnumList().includes(newVal))
    if (getErrorToggleCodeEnumList().includes(newVal)) {
        let e = errors.value.find((x) => x.code === newVal);
        if (e) {
          open.value = true
          error.value = {...e};
        }
    } else {
        open.value = false
        error.value = null;
    }
  })


  </script>