<template>
    <div>
      <!-- App Bar -->
      <v-app-bar class="gradient-app-bar" prominent>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="text-white"></v-app-bar-nav-icon>
        <v-toolbar-title class="text-white">Menu</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar>
  
      <!-- Navigation Drawer -->
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
      </v-navigation-drawer>

      <footerNavigation />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
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
  