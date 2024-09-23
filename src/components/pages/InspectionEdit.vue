<template>
  <v-container>
    <v-card>
      <v-form ref="form" @submit.prevent="openConfirmationDialog">
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
          <v-text-field
            v-if="field.type === 'date'"
            :label="field.label"
            type="date"
            v-model="store[field.model]"
            :required="field.required"
          />
        </div>

        <v-row class="mb-4">
          <v-col cols="4" class="text-h6 font-weight-bold"
            >Uploaded Image:</v-col
          >
          <v-col cols="8">
            <v-img
              v-if="store.image"
              :src="store.image"
              max-width="200"
              alt="Uploaded image"
            ></v-img>
            <span v-else>No Image attached</span>
          </v-col>
        </v-row>
        <v-row class="mb-4">
          <v-col cols="4" class="text-h6 font-weight-bold">Attached PDF:</v-col>
          <v-col cols="8">
            <v-btn
              v-if="store.documentation"
              color="secondary"
              @click="navigateToDocumentation"
            >
              View PDF file
            </v-btn>
            <span v-else>No PDF attached</span>
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

        <v-snackbar
          v-model="snackbar.show"
          :color="snackbar.color"
          timeout="3000"
        >
          {{ snackbar.message }}
          <template #action="{ attrs }">
            <v-btn text v-bind="attrs" @click="snackbar.show = false"
              >Close</v-btn
            >
          </template>
        </v-snackbar>

        <v-dialog v-model="confirmationDialog" width="300">
          <v-card>
            <v-card-title class="headline">Confirm Changes</v-card-title>
            <v-card-text
              >Are you sure you want to change the information?</v-card-text
            >
            <v-card-actions>
              <v-spacer />
              <v-btn text @click="confirmationDialog = false">Cancel</v-btn>
              <v-btn color="primary" @click="submitForm">Yes, Submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { computed, ref, onMounted } from "vue";
import { useInspectionStore } from "@/stores/InspectionStore";
import { useRouter, useRoute } from "vue-router";
import ButtonBack from "../buttons/ButtonBack.vue";

export default {
  components: { ButtonBack },
  setup() {
    const store = useInspectionStore();
    if (!store) {
      console.error("Store is not defined");
      return;
    }
    const router = useRouter();
    const route = useRoute();
    const image = ref(null);
    const snackbar = ref({ show: false, message: "", color: "" });
    const confirmationDialog = ref(false);
    const loading = ref(true);

    const formFields = computed(() => store.formFields || []);

    const openConfirmationDialog = () => {
      confirmationDialog.value = true;
    };

    const submitForm = async () => {
      const requiredFields = formFields.value.filter((field) => field.required);
      const isValid = requiredFields.every((field) => !!store[field.model]);

      if (!isValid) {
        showSnackbar("Please fill out all required fields.", "error");
        confirmationDialog.value = false;
        return;
      }

      try {
        await store.updateInspection({
          id: route.params.id,
          inspectionType: store.inspectionType,
          location: store.location,
          image: image.value,
          status: store.status,
        });

        router.push("/assigned");
      } catch (error) {
        showSnackbar("Error submitting form. Please try again.", "error");
      } finally {
        confirmationDialog.value = false;
      }
    };

    const showSnackbar = (message, color) => {
      snackbar.value = { show: true, message, color };
    };

    const updateFormFields = () => {
      store.selectedInspectionType = store.inspectionType;
    };

    onMounted(async () => {
      await store.loadInspections();
      const inspection = await store.getInspection(route.params.id);

      if (inspection) {
        Object.assign(store, inspection);
        image.value = inspection.image || null;
        loading.value = false;
      } else {
        showSnackbar("Inspection not found.", "error");
      }
    });
    const navigateToDocumentation = () => {
      router.push({
        name: "documentation",
        params: { id: store.id },
      });
    };

    return {
      store,
      formFields,
      openConfirmationDialog,
      submitForm,
      updateFormFields,
      image,
      snackbar,
      confirmationDialog,
      loading,
      navigateToDocumentation,
    };
  },
};
</script>
