<template>
  <div class="text-center">
    <v-dialog
      v-model="open"
      max-width="400"
      persistent
    >
      <v-card
        prepend-icon="mdi-key"
        title="Create a Password"
      >
      <v-card-text>
        <v-text-field
         :rules="[required(password, 'Password')]"
          hide-details="auto"
          label="Password"
          v-model="password"
        ></v-text-field>
        <v-text-field
         :rules="[required(confirmPassword, 'Confirm Password'), confirmRule]"
          hide-details="auto"
          label="Confirm Password"
          v-model="confirmPassword"
        ></v-text-field>
      </v-card-text>
        <template v-slot:actions>
          <v-spacer></v-spacer>
          <v-btn type="button" @click="save" color="green" variant="flat" >
            Save
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
    <div class="text-center">
      <v-dialog
        v-model="dialog"
        width="auto"
        transition="dialog-top-transition"
      >
        <v-card
          max-width="320"
          prepend-icon="mdi-information"
          
          :text="dialogMsg"
          :title="dialogTitle"
        >
          <template v-slot:actions>
            <v-btn
              class="ms-auto"
              text="Ok"
              @click="closeDialog"
            ></v-btn>
          </template>
        </v-card>
      </v-dialog>
      
    </div>


  </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  import { ISnackbar } from '../utils/interface_type';

  const open = ref(false);
  const store = useStore();

  const password = ref('');
  const confirmPassword = ref('');

  const dialog = ref(false);
  const dialogTitle = ref('');
  const dialogMsg = ref('');


  function required (v: any, fieldName: string) {
    return !!v || `${fieldName} is required`;
  };
  function confirmRule () {
    return password.value === confirmPassword.value || `The Password and Confirm Password does not match`;
  };

  function save() {
    if(!password.value.trim()) {
      dialogTitle.value = "Error";
      dialogMsg.value = "The Password field is empty. Please enter your password";
      dialog.value = true;
      return;
    }else if (password.value !== confirmPassword.value) {
      dialogTitle.value = "Error";
      dialogMsg.value = "The Password and Confirm Password does not match";
      dialog.value = true;
      return;
    } else {
      localStorage.setItem("pw", password.value.trim());
      closeModal();
      const snackbar: ISnackbar = {
        msg: 'Your password has been successfully created',
        open: true,
      }
      store.dispatch("setSnackbar", snackbar)
    }
  }

  async function checkPassword() {
    const resetPassword = localStorage.getItem("resetPassword");
    if (resetPassword) {
     try {
      const TWELVE_HOUR = 12 * 60 * 60 * 1000;

      const reset = JSON.parse(resetPassword);
      const date = reset.date as number;

      const diff =( Date.now() - date);

      if (diff >= TWELVE_HOUR) {
        localStorage.removeItem("resetPassword");
        localStorage.removeItem("pw");
      }
     } catch(e) {
      localStorage.removeItem("resetPassword");
      localStorage.removeItem("pw");
     }
    }

    setTimeout(() => {
      const pw = localStorage.getItem("pw");
      if (!pw) {
        open.value = true;
      }
    }, 300)
  }

  checkPassword();

  function closeModal() {
    open.value = false;
  }
  function closeDialog() {
    dialog.value = false;
    dialogTitle.value = '';
    dialogMsg.value = '';
  }
  </script>

<style scoped>

</style>