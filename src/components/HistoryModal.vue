<template>
  <div>
    <AppModal
      v-if="open"
      title="History"
      icon="mdi-information"
      @okCallback="closeModal"
      :open="open"
      @outsideClicked="closeModal"
      :width="500"
    >
    <v-card-text>
      <v-table density="compact">
        <thead>
          <tr>
            <th class="text-left">
              No.
            </th>
            <th class="text-left">
              Mode
            </th>
            <th class="text-left">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in history"
            :key="item.date"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ item.method }}</td>
            <td>{{ item.date }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </AppModal>

  </div>

</template>
    <script setup lang="ts">
    import { ref, watch } from 'vue';
    import { useStore } from 'vuex';
    import AppModal from './modal/AppModal.vue';
    const store = useStore();
  
    const open = ref(false);
    const history = ref<any[]>([]);
    function getHistories(): any[] {
      var jsonStr = localStorage.getItem("history");
      try {
        if (!jsonStr) return [];
        let histoties = JSON.parse(jsonStr);
        if (Array.isArray(histoties)) {
          return histoties;
        } else {
          return [];
        }
      } catch(e) {
        return [];
      }
    }
    history.value = getHistories()
    function closeModal() {
      store.dispatch("setHistoryModal", false);
    }

  watch(() => store.getters.getHistoryModal, async (newVal, oldVal) => {
    if (newVal) {
      open.value = true;
    } else {
      open.value = false;
    }
  })
  
  </script>
