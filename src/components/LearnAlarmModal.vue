<template>
  <div>
    <AppModal
      v-if="open"
      title="Learn About Alarms"
      icon="mdi-alarm-light"
      @okCallback="closeModal"
      :open="open"
      :width="650"
      :persistent="true"
    >
    <v-card-text>
      <div class="d-flex flex-column">
        <p class="pb-2" >Hello. by default, when you close your computer, your computer will not make a sound, so if someone tries to steal your computer and fold it down, our anti-theft program will no longer work. So please set the mode <b> when I close the lid: do nothing.</b></p>
        <div class="pb-3">
          <div class="text-h6">
            <v-icon
              color="green-darken-2"
              icon="mdi-comment-question-outline"
            ></v-icon>
            <span class="pl-1">How can i settings.</span>
          </div>
          <ul class="ml-9">
            <li>Manual</li>
            <li>Let Anti Theft Setting for you</li>
          </ul>
        </div>
        <div class="pb-3">
          <div class="text-h6">
            <!-- <v-icon
              color="green-darken-2"
              icon="mdi-asterisk"
            ></v-icon> -->
            <span >Let Anti Theft setting for you</span>
          </div>
          <v-btn outlined color="blue" @click="request">Request setting do nothing When Closing the lid </v-btn>
        </div>
        <div class="pb-3">
          <div class="text-h6">
            <!-- <v-icon
              color="green-darken-2"
              icon="mdi-asterisk"
            ></v-icon> -->
            Manual
          </div>
          <div class="d-flex flex-column">
            <div class="mb-3 ml-6">
              <p>
                1. Open Control Panel
              </p>
              <p>
                2. Click on Power Options
              </p>
              <p>
                3. Click on Choose what closing the lid does (left side)
              </p>
              <p>
                4. Toggle Option When I close thi lid: Do Nothing Both on Plugged In and On Battery
              </p>
            </div>
            <div>
              <img src="../assets/guide.png" class="" />
            </div>
          </div>
        </div>
      </div>
    </v-card-text>
  </AppModal>

  </div>

</template>
     <script setup lang="ts">
    import { ref, computed, watch } from 'vue';
    import { useStore } from 'vuex';
    import { ISnackbar } from '../utils/interface_type';
    import AppModal from './modal/AppModal.vue';
    import { setLidDoNothing } from '../demos/ipc';
    const store = useStore();

  
    const open = ref(false);
    const loading = ref(false);
    const audioList = ref([]);
  
    function closeModal() {
      store.dispatch("setLearnAlarmModal", false);
    }

    async function request() {
      let r = await setLidDoNothing();
      const snackbar: ISnackbar = {
        msg: (r == true) ?  'Request successfully' : 'Request Failed',
        open: true,
      }
      store.dispatch("setSnackbar", snackbar)
    }
  watch(() => store.getters.getLearnAlarmModal, async (newVal, oldVal) => {
    open.value = newVal;
  })

  </script>


<style scoped>
p {
  line-height: 1.6rem;
}
img {
  max-width: 100%;
}
</style>