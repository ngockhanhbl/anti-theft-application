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
          <div class="d-flex flex-column justify-center ">
            <div class="d-flex justify-center align-center">
              <img src="../assets/companylogo.svg" class="company_logo"/>
              <!-- <v-divider :vertical="true" color="white"  inset :thickness="2" class="mx-1 border-opacity-100" /> -->
              <div class="mx-1">|</div>
              <img src="../assets/vietnam.svg" class="vietnam_logo py-2"/>
            </div> 
            <div class="d-flex justify-center">
              <v-btn
                class="text-white text-none"
                color="blue-darken-4"
                rounded="0"
                variant="flat"
                @click="clickedContactUs"
              >
              Contact us
            </v-btn>
              
            </div>
          </div>
          
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

  function clickedContactUs() {
    window.location.assign('mailto:nguyenngockhanhbl@gmail.com');
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
.vietnam_logo {
  width: 45px;
}

</style>