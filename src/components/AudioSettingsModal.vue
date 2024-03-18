<template>
  <div>
    <AppModal
      v-if="open"
      title="Auido Settings"
      icon="mdi-music"
      @okCallback="closeModal"
      :open="open"
      :width="500"
      @outsideClicked="closeModal"
    >
    <v-card-text>
      <v-card
      >
        <v-list>
          <v-list-subheader>Add Your New Audio {{ !myAudioFile ? 'true' : 'false' }} {{ loading ? 'true' : 'false' }}</v-list-subheader>
          <div class="d-flex px-2 align-center justify-space-between ">
            <v-file-input
              label="File input" 
              ref="file" 
              accept="audio/*" 
              class="mr-3" 
              variant="underlined" 
              @change="handleFileChange($event)"
            >
            </v-file-input>
            
            <v-btn
              :disabled="disabled"
              :loading="loading"
              class="text-none"
              color="indigo-darken-3"
              variant="flat"
              @click="addAudio"
            >
            Send
          </v-btn>
          </div>
          <v-list-subheader>Audio List</v-list-subheader>
          <v-list-item
            v-for="(item, i) in audioList"
            :key="i"
            :value="item"
            color="primary"
            rounded="shaped"
            :active="currentAudio == item"
          >
            <template v-slot:prepend>
              <v-icon icon="mdi-file-music"></v-icon>
            </template>

            <v-list-item-title v-text="item"></v-list-item-title>
          </v-list-item>


          <v-list-subheader>Audio Volume</v-list-subheader>
          <v-list-item>
            <v-slider
              v-model="audioVolume"
              color="blue"
              label=""
              :max="100"
              :min="0"
              :step="1"
              @mouseup="mouseup"
            ></v-slider>
          </v-list-item>

          
        </v-list>
      </v-card>
    </v-card-text>
  </AppModal>

  </div>

</template>
     <script setup lang="ts">
    import { ref, computed, watch } from 'vue';
    import { useStore } from 'vuex';
    import { ISnackbar } from '../utils/interface_type';
    import AppModal from './modal/AppModal.vue';
    import { addFile, setAudioVolume } from '../demos/ipc';
    const store = useStore();

    var currentAudio = ref('');
  
    var myAudioFile = ref(null);
    var file = ref(null);
    var fileName = ref('');

    var audioVolume = ref(0);

    const open = ref(false);
    const loading = ref(false);
    const audioList = ref([]);
    const disabled = computed(() => {
      return loading.value || !myAudioFile.value
    })

    async function mouseup() {
      let result = await setAudioVolume(audioVolume.value);
      if ( typeof result === 'number'  ) {
        store.dispatch("setAudioVolume", result)
      }
    }
   
    function initAudioVolume() {
      audioVolume.value = store.getters.getAudioVolume ?? 0;
      setTimeout(() => {
        audioVolume.value = store.getters.getAudioVolume ?? 0;
      }, 200)
    }

    initAudioVolume();

    async function addAudio() {
      if (myAudioFile.value) {
        try {
          loading.value = true;

          let result = await addFile(myAudioFile.value, fileName.value);
          store.dispatch("setCurrentAudio", fileName.value);
          if (result) {
            const snackbar: ISnackbar = {
              msg: 'Your custom audio has been successfully uploaded',
              open: true,
            }
            store.dispatch("setSnackbar", snackbar)
          } else {
            const snackbar: ISnackbar = {
              msg: 'Upload Failed',
              open: true,
            }
            store.dispatch("setSnackbar", snackbar)
          }
          file?.value?.reset();
        } catch(e) {
          // loading.value = false;
        } finally {
          myAudioFile.value = null;
          fileName.value = '';
          loading.value = false;
        }
      } 
    }
    

    function handleFileChange(e: any) {
      // Check if file is selected
      if (e.target.files && e.target.files[0]) {
             // Check if file is valid
        if (isFileValid(e.target.files[0])) {
          // Get uploaded file
          const file = e.target.files[0];
          myAudioFile.value = file;
          // const  fileSize = Math.round((file.size / 1024 / 1024) * 100) / 100;
          const fileExtention = file.name.split(".").pop();
          fileName.value = `my_custom_audio.${fileExtention}`;
          // const fileName = f.name.split(".").shift();
        }
      }
    }

    function isFileValid(file: any) {
      return true
    }
  
    function closeModal() {
      store.dispatch("setAudioModal", false);
    }
    
  watch(() => store.getters.getAudioModal, async (newVal, oldVal) => {
    open.value = newVal;
  })
  watch(() => store.getters.getCurrentAudio, async (newVal, oldVal) => {
    currentAudio.value = newVal;
  },{ immediate: true });
  watch(() => store.getters.getAudioList, async (newVal, oldVal) => {
    audioList.value = newVal;
  },{ immediate: true })

  </script>
