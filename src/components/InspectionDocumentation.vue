<template>
  <ButtonNewReport />
  <v-container>
    <v-card>
      <v-card-title>Documents Overview</v-card-title>
      <v-divider class="my-4"></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item-group>
            <v-list-item
              v-for="inspection in inspections"
              :key="inspection.id"
              @click="openLink(inspection.documentation)"
            >
              <v-list-item-content>
                <v-list-item-title>
                  <v-icon>mdi-book</v-icon>
                  {{ inspection.location }}</v-list-item-title
                >
                <v-list-item-subtitle>{{
                  inspection.description
                }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-divider class="my-4"></v-divider>
            </v-list-item>
          </v-list-item-group>

          <v-list-item v-if="inspections.length === 0">
            <v-list-item-content>
              <v-list-item-title
                >No inspections available with documentation.</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
  <ButtonBack />
</template>

<script>
import { computed } from "vue";
import { useInspectionStore } from "@/stores/InspectionStore";
import ButtonBack from "./buttons/ButtonBack.vue";
import ButtonNewReport from "./buttons/ButtonNewReport.vue";

export default {
  components: {
    ButtonBack,
    ButtonNewReport,
  },
  setup() {
    const store = useInspectionStore();

    const openLink = (link) => {
      window.open(link, "_blank");
    };

    const inspections = computed(() => {
      return store.inspections.filter((inspection) => inspection.documentation);
    });

    return {
      store,
      inspections,
      openLink,
      ButtonBack,
      ButtonNewReport,
    };
  },
};
</script>
