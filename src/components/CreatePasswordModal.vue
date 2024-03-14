<template>
  <div class="text-center pa-4">
    <v-dialog
      v-model="open"
      max-width="400"
      persistent
    >
      <v-card
        prepend-icon="mdi-lock"
        title="Create a Password"
      >
      <v-card-text>
        <v-text-field
         :rules="[required]"
          hide-details="auto"
          label="Password"
          v-model="password"
        ></v-text-field>
        <v-text-field
         :rules="[required, confirmRule]"
          hide-details="auto"
          label="Confirm Password"
          v-model="confirmPassword"
        ></v-text-field>
      </v-card-text>
        <template v-slot:actions>
          <v-spacer></v-spacer>
          <v-btn @click="save" color="green" variant="flat" >
            Save
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { useStore } from 'vuex';
  import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { KeyIcon } from '@heroicons/vue/24/outline';

  const open = ref(true);
  const store = useStore();

  const password = ref('');
  const confirmPassword = ref('');

  function required (v: any) {
    return !!v || 'Field is required'
  };
  function confirmRule () {
    return password.value === confirmPassword.value
  };
  // const rules = {
  //   required: (value: any) => !!value || 'Field is required',
  // };

  function save() {
    if(!password.value.trim()) {
      alert("The Password field is empty. Please enter your password")
      return;
    }else if (password.value !== confirmPassword.value) {
      alert("The Password and Confirm Password does not match")
      return;
    } else {
      localStorage.setItem("pw", password.value.trim());
      closeModal();
      // TODO alert success
    }
  }

  const pw = localStorage.getItem("pw");
  if (!pw) {
    open.value = true;
  }

  function closeModal() {
    open.value = false;
  }

  </script>

<style scoped>

</style>