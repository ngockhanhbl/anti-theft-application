<template>
  <div>
    <AppModal
      v-if="open"
      title=""
      @okCallback="closeModal"
      :open="open"
      @outsideClicked="closeModal"
      :useOk="false"
      :bgColor="'black'"
    >
    <v-card-text>
      <div class="d-flex justify-space-between">
        <div class="w-50 wrap-center text-center">
          <img src="../assets/logo.svg" class="app_logo  py-2 w-90"/>
          <div class="text-h4 text-white">Anti Theft</div>
          <div class="text-white">Version {{version}}</div>
        </div>
        <div class="w-50 wrap-center text-center">
          <img src="../assets/companylogo.svg" class="company_logo"/>
          <div class="text-center text-white">Khanh Nguyen</div>
        </div>
      </div>
    </v-card-text>
  </AppModal>

  </div>

</template>
<script lang="ts" setup>
  import { ref, watch, computed } from 'vue';
  import { useStore } from 'vuex';
  import AppModal from './modal/AppModal.vue';
  const store = useStore();
  
  const open = ref(false);
 
  function closeModal() {
    store.dispatch("setAboutUsModal", false);
  }

  const version = computed(() => {
    return store.getters.getAppVersion;
  })
  
  watch(() => store.getters.getAboutUsModal, async (newVal, oldVal) => {
    if (newVal) {
      open.value = true;
    } else {
      open.value = false;
    }
  })
  
</script>


<style lang="css" scoped >
.wrap-center {
  margin: 0 auto;
}
.app_logo {
  width: 85%;
}
.company_logo {
  width: 90%;
}
</style>