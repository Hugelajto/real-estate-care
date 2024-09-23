<template>
  <div>
    <v-btn class="btn-del" @click="openConfirmationDialog">
      <v-icon>mdi-delete</v-icon>
    </v-btn>

    <v-dialog v-model="confirmationDialog" width="300">
      <v-card>
        <v-card-title class="headline">Confirm Deletion</v-card-title>
        <v-card-text
          >Are you sure you want to delete this inspection?</v-card-text
        >
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="confirmationDialog = false">Cancel</v-btn>
          <v-btn color="red" @click="confirmDelete">Yes, Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { useInspectionStore } from "@/stores/InspectionStore";
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    inspectionId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const inspectionStore = useInspectionStore();
    const confirmationDialog = ref(false);

    const openConfirmationDialog = () => {
      confirmationDialog.value = true;
    };

    const confirmDelete = () => {
      inspectionStore.deleteReport(props.inspectionId);
      confirmationDialog.value = false;
    };

    return { openConfirmationDialog, confirmDelete, confirmationDialog };
  },
});
</script>
