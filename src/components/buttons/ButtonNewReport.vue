<template>
  <v-btn class="btn-form" @click="goToForm">
    <v-icon>mdi-file-plus</v-icon>
  </v-btn>
</template>

<script>
import { useRouter } from "vue-router";
import { useInspectionStore } from "@/stores/InspectionStore";

export default {
  setup() {
    const store = useInspectionStore();
    const router = useRouter();

    const goToForm = () => {
      store.resetStoreState();
      router.push({ name: "form" });
    };

    return {
      goToForm,
    };
  },
};
</script>
