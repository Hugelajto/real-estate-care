<template>
  <div v-if="inspection">
    <h2>Inspection Details</h2>
    <p><strong>Date:</strong> {{ inspection.date }}</p>
    <p><strong>Location:</strong> {{ inspection.location }}</p>
    <p><strong>Description:</strong> {{ inspection.description }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  inspection: {
    type: Object,
    required: true
  }
});
</script>
