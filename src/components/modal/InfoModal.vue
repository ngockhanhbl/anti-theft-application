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
import { IInfoModal } from '../../utils/interface_type';

const store = useStore()

watch(() => store.getters.getInfoModal, async (newVal: IInfoModal | null, oldVal) => {
  msg.value = newVal == null ? '' : newVal?.msg ?? '';
  title.value = newVal == null ? '' : newVal?.title ?? '';
  open.value = newVal == null ? false : newVal?.open ?? false;
  icon.value = newVal == null ? 'mdi-information' : newVal?.icon ?? 'mdi-information';
})

const open = ref(false);
const title = ref('');
const msg = ref('');
const icon = ref('mdi-information');

function closeFunc() {
  store.dispatch("setInfoModal", null);
}

</script>