<template>
  <v-btn class="btn-del" @click="deleteInspection">
    <v-icon>mdi-delete</v-icon>
  </v-btn>
</template>

<script>
import { useInspectionStore } from "@/stores/InspectionStore";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    inspectionId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const inspectionStore = useInspectionStore();

    const deleteInspection = () => {
      inspectionStore.deleteReport(props.inspectionId);
    };

    return { deleteInspection };
  },
});
</script>
