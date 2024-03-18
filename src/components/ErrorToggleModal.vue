<template>
  <div class="text-center">
    <v-dialog
      v-model="open"
      width="auto"
    >
      <v-card
        max-width="400"
        :prepend-icon="icon"
        :text="msg"
        :title=title
      >
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            text="Ok"
            @click="closeFunc"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useStore } from 'vuex';
  import {ErrorToggleCodeEnum, getErrorToggleCodeEnumList} from '../utils/constants';
  import { IToggleError } from '../utils/interface_type';

  const store = useStore();

  function closeFunc() {
    open.value = false;
    setTimeout(() => {
        store.dispatch("resetToggleCode")
      }, 200)
  }

  const open = ref(false);
  const title = ref('');
  const msg = ref('');
  const icon = ref('mdi-information');

  const errors = ref<IToggleError[]>([
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
        msg: 'We currently do not support this mode'
    },
  ])


  watch(() => store.getters.getErrorToggleCode, async (newVal, oldVal) => {
    if (getErrorToggleCodeEnumList().includes(newVal)) {
        let e = errors.value.find((x) => x.code === newVal);
        if (e) {
          open.value = true;
          title.value= e.title;
          msg.value = e.msg;
          open.value = true;
          icon.value = 'mdi-close-circle';
        }
    } else {
        open.value = false
    }
  })


  </script>