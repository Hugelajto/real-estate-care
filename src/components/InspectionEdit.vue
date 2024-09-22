<template>
  <v-container>
    <v-card>
      <v-form ref="form" @submit.prevent="confirmSubmit">
        <v-select
          label="Inspection Type"
          v-model="store.inspectionType"
          :items="store.inspectionTypes"
          @change="updateFormFields"
        />

        <div v-for="(field, index) in formFields" :key="index">
          <v-text-field
            v-if="field.type === 'text'"
            :label="field.label"
            v-model="store[field.model]"
            :required="field.required"
          />
          <v-textarea
            v-if="field.type === 'textarea'"
            :label="field.label"
            v-model="store[field.model]"
            :required="field.required"
          />
          <v-select
            v-if="field.type === 'select'"
            :label="field.label"
            :items="field.options"
            v-model="store[field.model]"
            :required="field.required"
          />
          <v-radio-group
            v-if="field.type === 'radio'"
            :label="field.label"
            v-model="store[field.model]"
            row
            :required="field.required"
          >
            <v-radio
              v-for="(option, idx) in field.options"
              :key="idx"
              :label="option"
              :value="option"
            />
          </v-radio-group>
          <v-file-input
            v-if="field.type === 'file' && field.label === 'Upload Image'"
            label="Upload Image"
            v-model="image"
            accept="image/png, image/jpeg"
            prepend-icon="mdi-camera"
            @change="handleImageChange"
          />
          <v-file-input
            v-if="
              field.type === 'file' && field.label === 'Upload Document (PDF)'
            "
            label="Upload Document (PDF)"
            v-model="store.documentation"
            accept="application/pdf"
            prepend-icon="mdi-file"
            @change="handlePdfChange"
          />
          <v-text-field
            v-if="field.type === 'date'"
            :label="field.label"
            type="date"
            v-model="store[field.model]"
            :required="field.required"
          />
        </div>

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

        <v-radio-group label="Status" v-model="store.status" row>
          <v-radio label="Assigned" value="assigned" />
          <v-radio label="Completed" value="completed" />
        </v-radio-group>

        <v-btn type="submit" color="primary">
          <v-icon>mdi-check-circle-outline</v-icon>
        </v-btn>
        <ButtonBack />
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { computed, ref, onMounted } from "vue";
import { useInspectionStore } from "@/stores/InspectionStore";
import { useRouter, useRoute } from "vue-router";
import ButtonBack from "./buttons/ButtonBack.vue";

export default {
  components: { ButtonBack },
  setup() {
    const store = useInspectionStore();
    const router = useRouter();
    const route = useRoute();
    const image = ref(null);

    const formFields = computed(() => store.formFields);

    const confirmSubmit = async () => {
      const requiredFields = formFields.value.filter((field) => field.required);
      const isValid = requiredFields.every((field) => !!store[field.model]);

      if (!isValid) {
        alert("Please fill out all required fields.");
        return;
      }

      try {
        await store.updateInspection({
          id: route.params.id,
          inspectionType: store.inspectionType,
          location: store.location,
          image: image.value,
          documentation: store.documentation,
          status: store.status,
        });

        alert("Settings saved successfully!");
        router.push("/assigned");
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Error submitting form. Please try again.");
      }
    };

    const updateFormFields = () => {
      store.selectedInspectionType = store.inspectionType;
    };

    onMounted(async () => {
      const inspection = await store.getInspection(route.params.id);
      if (inspection) {
        Object.assign(store, inspection);
        image.value = inspection.image || null;
      }
    });

    return {
      store,
      formFields,
      confirmSubmit,
      updateFormFields,
      image,
    };
  },
};
</script>
