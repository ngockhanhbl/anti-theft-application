<template>
    <v-snackbar
        v-model="open"
        location="bottom right"
        :timeout="timeout"
        
        >
        {{ msg }}
        <template v-slot:actions>
        <v-btn
            color="blue"
            variant="text"
            @click="closeFunc"
        >
            {{actionName}}
        </v-btn>
        </template>
    </v-snackbar>
</template>


<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import { ISnackbar } from '../../utils/interface_type';

const store = useStore()

watch(() => store.getters.getSnackbar, async (newVal: ISnackbar | null, oldVal) => {
  msg.value = newVal == null ? '' : newVal?.msg ?? '';
  timeout.value = newVal == null ? 3000 : newVal?.timeout ?? 3000;
  open.value = newVal == null ? false : newVal?.open ?? false;
  actionName.value = newVal == null ? 'Close' : newVal?.actionName ?? 'Close';
  actionCallback.value = newVal == null ? () => {} : newVal?.actionCallback;
})

const open = ref(false);
const timeout = ref(3000);
const msg = ref('');
const actionName = ref('');
const actionCallback = ref<Function>();

function closeFunc() {
  store.dispatch("setSnackbar", null);
  if (actionCallback) {
    actionCallback.value?.call(actionCallback.value);
  }
}

</script>