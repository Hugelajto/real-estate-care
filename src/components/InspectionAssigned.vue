<template>
  <div>
    <v-progress-circular v-if="loading" indeterminate></v-progress-circular>
    <v-alert v-if="error" type="error">{{ error }}</v-alert>

    <ButtonNewReport />

    <v-list rounded>
      <v-card-title>Assigned Inspections</v-card-title>
      <v-divider class="my-4"></v-divider>

      <v-list-item v-if="assignedInspections.length === 0">
        <v-list-item-content>
          <v-list-item-title>No inspections available</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        v-for="inspection in assignedInspections"
        :key="inspection.id"
      >
        <v-list-item-content>
          <v-list-item-title>
            <v-icon>mdi-file-document</v-icon>
            {{ inspection.location }}</v-list-item-title
          >
          <v-btn
            class="btn-edit"
            :to="{ name: 'edit', params: { id: inspection.id } }"
            link
          >
            <v-icon>mdi-file-edit</v-icon>
          </v-btn>

          <ButtonDelete :inspectionId="inspection.id" />
        </v-list-item-content>
        <v-divider class="my-4"></v-divider>
      </v-list-item>
    </v-list>

    <ButtonBack />
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useInspectionStore } from "@/stores/InspectionStore";
import ButtonNewReport from "./buttons/ButtonNewReport.vue";
import ButtonDelete from "./buttons/ButtonDelete.vue";
import ButtonBack from "./buttons/ButtonBack.vue";

export default {
  components: {
    ButtonBack,
    ButtonNewReport,
    ButtonDelete,
  },
  setup() {
    const inspectionStore = useInspectionStore();

    const assignedInspections = computed(
      () => inspectionStore.assignedInspections
    );
    const loading = computed(() => inspectionStore.loading);
    const error = computed(() => inspectionStore.error);

    onMounted(() => {
      inspectionStore.loadInspections();
    });

    return {
      assignedInspections,
      loading,
      error,
    };
  },
};
</script>
