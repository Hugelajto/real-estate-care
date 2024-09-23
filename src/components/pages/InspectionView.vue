<template>
  <v-container>
    <v-card class="pa-4">
      <v-card-title class="text-h5 font-weight-bold">
        Inspection Report Overview
      </v-card-title>
      <v-divider class="my-4"></v-divider>
      <v-card-text>
        <v-row
          v-for="(field, index) in filteredFormFields"
          :key="index"
          class="mb-4"
        >
          <v-col cols="4" class="text-h6 font-weight-bold">
            {{ field.label }}:
          </v-col>
          <v-col cols="8" class="text-body-1">
            <span v-if="store[field.model]">{{ store[field.model] }}</span>
            <span v-else class="text-grey">--</span>
          </v-col>
        </v-row>

        <v-row v-if="store.image" class="mb-4">
          <v-col cols="4" class="text-h6 font-weight-bold"
            >Uploaded Image:</v-col
          >
          <v-col cols="8">
            <v-img
              :src="store.image"
              max-width="200"
              alt="Uploaded image"
            ></v-img>
          </v-col>
        </v-row>

        <v-row v-if="store.documentation" class="mb-4">
          <v-col cols="4" class="text-h6 font-weight-bold"
            >Uploaded Document:</v-col
          >
          <v-col cols="8">
            <v-btn color="secondary" @click="navigateToDocumentation"
              >PDF file</v-btn
            >
          </v-col>
        </v-row>

        <v-row class="mb-4">
          <v-col cols="4" class="text-h6 font-weight-bold">Status:</v-col>
          <v-col cols="8" class="text-body-1">{{ store.status || "--" }}</v-col>
        </v-row>
      </v-card-text>
      <v-divider class="my-4"></v-divider>
      <BackButton />
    </v-card>
  </v-container>
</template>

<script>
import { computed, onMounted } from "vue";
import { useInspectionStore } from "@/stores/InspectionStore";
import { useRouter, useRoute } from "vue-router";
import BackButton from "../buttons/ButtonBack.vue";

export default {
  components: { BackButton },
  setup() {
    const store = useInspectionStore();
    const router = useRouter();
    const route = useRoute();

    const formFields = computed(() => store.formFields);
    const filteredFormFields = computed(() => {
      return formFields.value.filter(
        (field) => field.label && store[field.model] !== undefined
      );
    });

    const navigateToDocumentation = () => {
      router.push({
        name: "documentation",
        params: { id: store.id },
      });
    };

    onMounted(async () => {
      const inspection = await store.getInspection(route.params.id);
      if (inspection) {
        Object.assign(store, inspection);
      }
    });

    return {
      store,
      filteredFormFields,
      navigateToDocumentation,
    };
  },
};
</script>
