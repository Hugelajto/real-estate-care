<template>
  <v-container>
    <v-card>
      <v-form ref="form" @submit.prevent="submit">
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
          <v-text-field
            v-if="field.type === 'date'"
            :label="field.label"
            type="date"
            v-model="store[field.model]"
            :required="field.required"
          />
        </div>

        <v-file-input
          label="Upload Image"
          v-model="store.image"
          accept="image/png, image/jpeg"
          prepend-icon="mdi-camera"
          @change="handleImageChange"
        />

        <v-row v-if="imageUrl" class="mt-4">
          <v-col>
            <v-img :src="imageUrl" max-width="200" alt="Uploaded image"></v-img>
          </v-col>
        </v-row>

        <v-file-input
          v-if="
            store.inspectionType === 'Technical' ||
            store.inspectionType === 'Modifications'
          "
          label="Upload Document (PDF)"
          v-model="store.documentation"
          accept="application/pdf"
          prepend-icon="mdi-file"
          @change="handlePdfChange"
        />

        <v-btn @click="submit" :disabled="isSubmitting" color="primary">
          Submit
        </v-btn>
        <BackButton />
        <v-spinner v-if="isSubmitting" />
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { computed, ref, onBeforeMount } from "vue";
import { useInspectionStore } from "@/stores/InspectionStore";
import { useRouter } from "vue-router";
import BackButton from "../buttons/ButtonBack.vue";

export default {
  components: { BackButton },
  setup() {
    const store = useInspectionStore();
    const router = useRouter();
    const isSubmitting = ref(false);
    const form = ref(null);

    onBeforeMount(() => {
      store.resetStoreState();
    });

    const formFields = computed(() => store.formFields);

    const imageUrl = computed(() => {
      return store.image instanceof File
        ? URL.createObjectURL(store.image)
        : null;
    });

    const handleImageChange = (event) => {
      const files = event.target.files || event;
      if (files && files.length > 0) {
        store.image = files[0];
      } else {
        store.image = null;
      }
    };

    const handlePdfChange = (event) => {
      const files = event.target.files || event;
      if (files && files.length > 0) {
        store.documentation = files[0];
      } else {
        store.documentation = null;
      }
    };

    const resetForm = () => {
      store.inspectionType = "";
      store.location = "";
      store.image = null;
      store.documentation = "";
      store.damageType = "";
      store.maintenanceType = "";
      store.urgent = "";
      store.cost = "";
      store.remarks = "";
      store.performedBy = "";
      store.action = "";
      store.description = "";
      store.damageDate = "";
      store.new = "";

      if (form.value) {
        form.value.reset();
      }
    };

    const submit = async () => {
      const requiredFields = formFields.value.filter((field) => field.required);
      const isValid = requiredFields.every((field) => !!store[field.model]);

      if (!isValid) {
        alert("Please fill out all required fields.");
        return;
      }

      const inspectionData = {
        inspectionType: store.inspectionType,
        location: store.location,
        image: store.image,
        documentation: store.documentation,
        new: store.new,
        urgent: store.urgent,
        cost: store.cost,
        action: store.action,
        remarks: store.remarks,
        damageType: store.damageType,
        damageDate: store.damageDate,
        description: store.description,
        performedBy: store.performedBy,
        maintenanceType: store.maintenanceType,
      };

      try {
        isSubmitting.value = true;
        await store.addInspection(inspectionData);
        resetForm();
        router.push("/assigned");
      } catch (error) {
        alert("Error submitting form. Please try again.");
      } finally {
        isSubmitting.value = false;
      }
    };

    return {
      store,
      formFields,
      submit,
      handleImageChange,
      isSubmitting,
      handlePdfChange,
      imageUrl,
      form,
      resetForm,
    };
  },
};
</script>
