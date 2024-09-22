<template>
  <div>
    <v-progress-circular v-if="loading" indeterminate></v-progress-circular>
    <v-alert v-if="error" type="error">{{ error }}</v-alert>

    <ButtonNewReport />

    <v-list rounded>
      <v-card-title>Completed Inspections</v-card-title>
      <v-divider class="my-4"></v-divider>
      <v-list-item v-if="completedInspections.length === 0">
        <v-list-item-content>
          <v-list-item-title>No inspections available</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-for="inspection in completedInspections"
        :key="inspection.id"
      >
        <v-list-item-content>
          <v-list-item-title>
            <v-icon class="completed">mdi-check-circle</v-icon>
            {{ inspection.location }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{
              inspection.damageDate || inspection.maintenanceDate || "No Date"
            }}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            {{ inspection.description || "No description available" }}
          </v-list-item-subtitle>
          <v-btn
            class="btn-edit"
            :to="{ name: 'view', params: { id: inspection.id } }"
            link
          >
            <v-icon>mdi-file-document-multiple-outline</v-icon>
          </v-btn>
          <ButtonDelete :inspectionId="inspection.id" />
        </v-list-item-content>
        <v-divider class="my-4"></v-divider>
      </v-list-item>
    </v-list>

    <BackButton />
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useInspectionStore } from "@/stores/InspectionStore";
import BackButton from "./buttons/ButtonBack.vue";
import ButtonNewReport from "./buttons/ButtonNewReport.vue";
import ButtonDelete from "./buttons/ButtonDelete.vue";

export default {
  components: {
    BackButton,
    ButtonNewReport,
    ButtonDelete,
  },
  setup() {
    const inspectionStore = useInspectionStore();

    onMounted(() => {
      inspectionStore.loadInspections();
    });

    const completedInspections = computed(
      () => inspectionStore.completedInspections
    );
    const loading = computed(() => inspectionStore.loading);
    const error = computed(() => inspectionStore.error);

    return {
      completedInspections,
      loading,
      error,
    };
  },
};
</script>
