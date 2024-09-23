import { defineStore } from "pinia";

export const inspection_types = {
  DAMAGE: "Damage",
  MAINTENANCE: "Maintenance",
  TECHNICAL: "Technical",
  MODIFICATIONS: "Modifications",
};

const formFieldDefinitions = {
  [inspection_types.DAMAGE]: [
    { type: "text", label: "Location", model: "location", required: true },
    {
      type: "radio",
      label: "New Damage",
      options: ["Yes", "No"],
      model: "new",
      required: true,
    },
    {
      type: "select",
      label: "Type of Damage",
      options: ["Intentional", "Wear", "Violence", "Normal Use", "Other"],
      model: "damageType",
    },
    {
      type: "date",
      label: "Date of Damage",
      model: "damageDate",
      required: true,
    },
    { type: "radio", label: "Urgent", options: ["Yes", "No"], model: "urgent" },
    {
      type: "textarea",
      label: "Description",
      model: "description",
      required: true,
    },
    { type: "file" },
  ],
  [inspection_types.MAINTENANCE]: [
    { type: "text", label: "Location", model: "location", required: true },
    {
      type: "select",
      label: "Type of Maintenance",
      options: ["Painting", "Wood Rot", "Electrical", "Plumbing", "Glazing"],
      model: "maintenanceType",
    },
    { type: "radio", label: "Urgent", options: ["Yes", "No"], model: "urgent" },
    {
      type: "radio",
      label: "Estimated cost",
      options: ["€0-500", "€500-1500", "€1.500+"],
      model: "cost",
    },
    { type: "file" },
  ],
  [inspection_types.TECHNICAL]: [
    { type: "text", label: "Location", model: "location", required: true },
    {
      type: "select",
      label: "Type of Maintenance",
      options: ["Cooler", "Heater", "Air-flow", "Electric", "Safety"],
      model: "maintenanceType",
    },
    { type: "textarea", label: "Reported Malfunctions", model: "description" },
    {
      type: "radio",
      label: "Approved",
      options: ["Yes", "No"],
      model: "urgent",
    },
    { type: "textarea", label: "Remarks", model: "remarks" },
    { type: "file", model: "documentation" },
  ],
  [inspection_types.MODIFICATIONS]: [
    { type: "text", label: "Location", model: "location", required: true },
    {
      type: "select",
      label: "Performed by",
      options: ["Tenant", "Contractor", "Unknown"],
      model: "performedBy",
    },
    { type: "textarea", label: "Description", model: "description" },
    {
      type: "radio",
      label: "Action to be taken",
      options: [
        "Accept",
        "Have it inspected",
        "Have it removed",
        "Have it adjusted",
      ],
      model: "action",
    },
    { type: "textarea", label: "Remarks", model: "remarks" },
    { type: "file", model: "documentation" },
  ],
};

export const useInspectionStore = defineStore("inspectionStore", {
  state: () => ({
    inspections: [],
    loading: false,
    error: null,
    inspectionType: inspection_types.DAMAGE,
    location: "",
    damageType: "",
    maintenanceType: "",
    urgent: "",
    cost: "",
    remarks: "",
    performedBy: "",
    action: "",
    description: "",
    damageDate: "",
    new: "",
    documentation: "",
    image: "",
  }),

  getters: {
    completedInspections() {
      return this.inspections.filter((i) => i.status === "completed");
    },
    assignedInspections() {
      return this.inspections.filter((i) => i.status === "assigned");
    },
    inspectionTypes() {
      return Object.values(inspection_types);
    },
    formFields() {
      return formFieldDefinitions[this.inspectionType] || [];
    },
  },
  actions: {
    async loadInspections() {
      this.loading = true;
      this.error = null;

      try {
        const response = await fetch("http://localhost:3000/inspections");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        this.inspections = data;
      } catch (error) {
        this.error = "Failed to load inspections";
      } finally {
        this.loading = false;
      }
    },

    async readImage(imageFile) {
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(imageFile);
      });
    },

    resetStoreState() {
      this.inspectionType = inspection_types.DAMAGE;
      this.location = "";
      this.image = null;
      this.documentation = null;
      this.damageType = "";
      this.maintenanceType = "";
      this.urgent = "";
      this.cost = "";
      this.remarks = "";
      this.performedBy = "";
      this.action = "";
      this.description = "";
      this.damageDate = "";
      this.new = "";
    },

    async addInspection(inspection) {
      inspection.status = "assigned";

      if (this.documentation instanceof File) {
        inspection.document = await this.readFile(this.documentation);
      }

      if (this.image instanceof File) {
        inspection.image = await this.readFile(this.image);
      }

      await this.saveToDatabase(inspection);
    },

    async saveToDatabase(inspection) {
      const res = await fetch("http://localhost:3000/inspections", {
        method: "POST",
        body: JSON.stringify(inspection),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("Failed to save inspection to database");
      }

      const newInspection = await res.json();
      this.inspections.push(newInspection);
    },

    async readFile(file) {
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    },

    async getInspection(id) {
      const inspection = this.inspections.find((i) => i.id === id);
      return inspection || null;
    },

    async deleteReport(id) {
      const res = await fetch(`http://localhost:3000/inspections/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete the inspection");
      }

      this.inspections = this.inspections.filter((i) => i.id !== id);
    },

    async updateInspection(updatedInspection) {
      const index = this.inspections.findIndex(
        (i) => i.id === updatedInspection.id
      );

      if (index !== -1) {
        const res = await fetch(
          `http://localhost:3000/inspections/${updatedInspection.id}`,
          {
            method: "PUT",
            body: JSON.stringify(updatedInspection),
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to update inspection in the database");
        }

        this.inspections[index] = {
          ...this.inspections[index],
          ...updatedInspection,
        };
      }
    },
  },
});
