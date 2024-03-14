<template>
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-10">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">
                    <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-400 sm:mx-0 sm:h-10 sm:w-10">
                      <KeyIcon class="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Enter your Password</DialogTitle>
                      <div class="mt-2">
                        <input type="text" placeholder="Password" v-model="password" class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                            invalid:border-pink-500 invalid:text-pink-600
                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                        "/>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-5 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" @click="check()">Send</button>
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
  import { KeyIcon } from '@heroicons/vue/24/outline';
  import {DetectTheftEnum} from '../utils/constants';

  const open = ref(false);
  const store = useStore();
  const password = ref('');

  function check() {
    const pw = localStorage.getItem("pw");
    if(password.value.trim() !== pw) {
      // TODO alert make form no longer entered input
      return;
    } else {
      store.dispatch("setVisibleConfirmPasswordModal", false);
      const detect = store.getters.getDetectTheft
      store.dispatch("setDetectTheft", DetectTheftEnum.None);

      setTimeout(() => {
        if (detect === DetectTheftEnum.Power) {
        store.dispatch("togglePowerMode", false);
        } else if (detect === DetectTheftEnum.Headset) {
          store.dispatch("toggleHeadsetMode", false);
        }else {
          store.dispatch("toggleLocationMode", false);
        }

        (detect === DetectTheftEnum.Location) ?
        alert("Successfully!!!"):
        alert(`Successfully!!! Please reconnect ${detect === DetectTheftEnum.Power  ? 'the charger': 'headset'} to continue using the feature`);
      },100)

      password.value = '';
    }
  }

  watch(() => store.state.visibleConfirmPasswordModal, async (newVal, oldVal) => {
    if (newVal) {
      open.value = true;
    } else {
      closeModal()
    }
  })


  function closeModal() {
    open.value = false;
  }

  </script>