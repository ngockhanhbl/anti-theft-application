<template>
    <AppModal title="Enter your Password" okName="Check" @okCallback="check()" :open="open" :persistent="true" v-if="open">
      <v-text-field
        hide-details="auto"
        label="Password"
        v-model="password"
      ></v-text-field>
    </AppModal>
</template>
  
<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { useStore } from 'vuex';
  import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { KeyIcon } from '@heroicons/vue/24/outline';
  import {DetectTheftEnum} from '../utils/constants';
  import AppModal from './modal/AppModal.vue';
import { ISnackbar } from '../utils/interface_type';

  const open = ref(false);
  const store = useStore();
  const password = ref('');

  function check() {
    const pw = localStorage.getItem("pw");
    if(password.value.trim() !== pw) {
      const snackbar: ISnackbar = {
        msg: 'Wrong password',
        open: true,
      }
      store.dispatch("setSnackbar", snackbar)
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

        const snackbar: ISnackbar = {
          msg: (detect === DetectTheftEnum.Location) ? "Successfully!!!" : `Successfully!!! Please reconnect ${detect === DetectTheftEnum.Power  ? 'the charger': 'headset'} to continue using the feature`,
          open: true,
        }
        store.dispatch("setSnackbar", snackbar)
      },100)

      password.value = '';
    }
  }

  watch(() => store.state.visibleConfirmPasswordModal, async (newVal, oldVal) => {
    console.log('store.state.visibleConfirmPasswordModal');
    console.log(newVal);
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