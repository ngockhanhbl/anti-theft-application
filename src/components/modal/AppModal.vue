<template>
    <div class="text-center">
      <v-dialog
        v-model="open"
        width="auto"
        @input="cancelClicked"
        :persistent='persistent'
      >
        <v-card
          :width="width"
          :prepend-icon="icon"
          :title=title
          
          v-click-outside="outsideClicked"
        >
          <v-card-text>
            <slot></slot>
          </v-card-text>
          <template v-slot:actions>
            <v-spacer></v-spacer>
            <v-btn
              v-if="useCancel"
              :text="cancelName"
              variant="text"
              @click="cancelClicked"
            ></v-btn>

            <v-btn
              v-if="useOk"
              :text="okName"
              color="green"
              variant="flat"
              @click="okClicked"
            ></v-btn>
          </template>
        </v-card>
      </v-dialog>
    </div>
  </template>
    
  <script setup lang="ts">
  import { ref,} from 'vue';
  const emit = defineEmits(['okCallback', 'cancelCallback', 'outsideClicked'])
    const props = defineProps({
        open: { type: Boolean, default: false },
        title: { type: String, required: true },
        useOk: { type: Boolean, default: true },
        okName: { type: String, default: 'OK' },
        useCancel: { type: Boolean, default: false },
        cancelName: { type: String, default: 'Cancel' },
        icon: { type: String || null, default: null },
        persistent: { type: Boolean, default: false },
        width: { type: Number, default: 400 },
    })
  
  const open = ref(props.open);
  const title = ref(props.title);
  const useOk = ref(props.useOk);
  const okName = ref(props.okName);
  const useCancel = ref(props.useCancel);
  const cancelName = ref(props.cancelName);
  const icon = ref(props.icon);
  const persistent = ref(props.persistent);
  const width = ref(props.width);

  function okClicked() {
    emit("okCallback");
  }

  function cancelClicked() {
    emit("cancelCallback");
  }


  function outsideClicked () {
    emit("outsideClicked");
  }
  
  
  </script>