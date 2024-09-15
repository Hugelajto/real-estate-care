<template>
  <v-app-bar class="gradient-app-bar" prominent>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="text-white"></v-app-bar-nav-icon>
    <v-toolbar-title class="text-white">Menu</v-toolbar-title>
    <v-spacer></v-spacer>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'bottom' : 'start'" temporary>
    <v-list>
      <v-list-item-group v-model="selectedItem">
        <v-list-item v-for="item in items" :key="item.title" @click="selectItem(item)">
          <v-list-item-content>
            <v-list-item-title>
              <v-icon>{{ item.icon }}</v-icon>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-list>
      <v-list-item-group v-for="inspection in inspections" :key="inspection.id">
        <v-list-item @click="selectInspection(inspection)">
          <v-list-item-content>
            <v-list-item-title>{{ inspection.date }} - {{ inspection.location }}</v-list-item-title>
            <v-list-item-subtitle>{{ inspection.description }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>

  <v-main v-if="selectedInspection">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-card>
            <InspectionDetails :inspection="selectedInspection" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchInspections } from '../services/InspectionService';
import InspectionDetails from './InspectionDetails.vue';

const inspections = ref([]);
const selectedInspection = ref(null);

const drawer = ref(false);
const selectedItem = ref(null);

const items = [
  { title: 'Assigned reports', icon: 'mdi-file-document' },
  { title: 'Completed reports', icon: 'mdi-check-circle' },
  { title: 'Documentation', icon: 'mdi-book' },
  { title: 'Settings', icon: 'mdi-cog' },
];

const selectItem = (item) => {
  selectedItem.value = item;
};

const selectInspection = (inspection) => {
  selectedInspection.value = inspection;
};

onMounted(async () => {
  try {
    const data = await fetchInspections();
    if (data && data.inspections) {
      inspections.value = data.inspections.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  } catch (error) {
    console.error('Error fetching inspections:', error);
  }
});
</script>

<style scoped>
.gradient-app-bar {
  background: linear-gradient(to right, rgba(71, 94, 108), rgba(20, 27, 31));
}

.v-icon {
  color: rgba(41, 52, 57, 0.5);
}

.v-list-item-title {
  color: rgba(41, 52, 57);
  font-size: 16px;
}

</style>
