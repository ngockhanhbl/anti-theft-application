<template>
  <div>
    <AppModal 
      v-if="open"
      title="Change Password"
      icon="mdi-key"
      okName="Save"
      @okCallback="save()"
      :open="open"
      :persistent="false"
      :useCancel="true"
      @cancelCallback="closeModal"
      @outsideClicked="outsideClicked"
    >
    <v-card-text>
      <v-text-field
        hide-details="auto"
        label="Current Password"
        v-model="currentPassword"
        class="mb-2"
      ></v-text-field>

      <v-text-field
       :rules="[required(password, 'Password')]"
        hide-details="auto"
        label="Password"
        v-model="password"
        class="mb-2"
      ></v-text-field>
      <v-text-field
       :rules="[required(confirmPassword, 'Confirm Password'), confirmRule]"
        hide-details="auto"
        label="Confirm Password"
        v-model="confirmPassword"
      ></v-text-field>
      
      <div class="mt-5 d-flex justify-end cursor-pointer font-weight-light reset-pw" @click="resetPasswordFunction">
        Reset a password
      </div>
    </v-card-text>
  </AppModal>

  <AppModal 
    v-if="resetOpen"
    title="Reset Password"
    @okCallback="resetPasswordOkCallback()"
    :open="resetOpen"
    :persistent="true"
    :useCancel="true"
    @cancelCallback="resetPasswordCancelCallback()"
  >
  <v-card-text>
    <div>
      <p class="text-center">
        Your password will be reset in twelve hours. After this time you can reset a new password.
      </p>
    </div>
  </v-card-text>
  </AppModal>
  </div>

</template>
    
    <script setup lang="ts">
    import { ref, computed, watch } from 'vue';
    import { useStore } from 'vuex';
    import { IInfoModal, ISnackbar } from '../utils/interface_type';
    import AppModal from './modal/AppModal.vue';
    const store = useStore();
  
    const open = ref(false);
  
    const currentPassword = ref('');
    const password = ref('');
    const confirmPassword = ref('');

    const resetOpen = ref(false);
  
  
    function required (v: any, fieldName: string) {
      return !!v || `${fieldName} is required`;
    };
    function confirmRule () {
      return password.value === confirmPassword.value || `The Password and Confirm Password does not match`;
    };
  
    function save() {      
      if(!password.value.trim()) {
        const infoModal: IInfoModal = {
          open: true,
          title: 'Error',
          msg: 'The Password field is empty. Please enter your password',
          icon: 'mdi-alert-circle'
        }
        store.dispatch("setInfoModal", infoModal);
        return;
      }else if (password.value !== confirmPassword.value) {
        const infoModal: IInfoModal = {
          open: true,
          title: 'Error',
          msg: 'The Password and Confirm Password does not match',
          icon: 'mdi-alert-circle'
        }
        store.dispatch("setInfoModal", infoModal);
        return;
      }
       else {
        let currentPW = localStorage.getItem("pw");
        if (currentPW === currentPassword.value.trim()) {
          closeModal();
          const snackbar: ISnackbar = {
            msg: 'Your password has been successfully created',
            open: true,
          }
          store.dispatch("setSnackbar", snackbar)
          localStorage.setItem("pw", password.value.trim());
        } else {
            const infoModal: IInfoModal = {
            open: true,
            title: 'Error',
            msg: 'Your current password is incorrect',
            icon: 'mdi-alert-circle'
          }
          store.dispatch("setInfoModal", infoModal);
        }
      }
    }

    function resetPasswordFunction() {
      resetOpen.value = true;
    }
    function resetPasswordOkCallback() {
      localStorage.setItem("resetPassword", JSON.stringify({
        'date': Date.now()
      }));
      setTimeout(() => {
        resetOpen.value = false;
      }, 50);
      const snackbar: ISnackbar = {
        msg: 'Your password has been requested to be reset. They will be reset in 12 hours',
        open: true,
      }
      store.dispatch("setSnackbar", snackbar)
    }
    function resetPasswordCancelCallback() {
      setTimeout(() => {
        resetOpen.value = false;
      }, 50);
    }

    function closeModal() {
      store.dispatch("setChangePasswordModal", false);
    }
    function outsideClicked() {
      if (!resetOpen.value) {
        closeModal();
      }
    }

  watch(() => store.getters.getChangePasswordModal, async (newVal, oldVal) => {
    if (newVal) {
      open.value = true;
    } else {
      open.value = false;
    }
  })
  
  </script>
  
  <style scoped>
  .reset-pw:hover {
    text-decoration: underline;
  }
  </style>