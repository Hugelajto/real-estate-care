<template>
      <v-bottom-navigation
        class="gradient-app-bar"
        horizontal
      >
        <v-btn>
          <v-icon>mdi-file-document</v-icon>
        </v-btn>
  
        <v-btn>
          <v-icon>mdi-check-circle</v-icon>
        </v-btn>
  
        <v-btn>
          <v-icon>mdi-book</v-icon>
        </v-btn>

        <v-btn>
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </v-bottom-navigation>
  </template>

<style scoped>
  .gradient-app-bar {
    background: linear-gradient(to right, rgba(71, 94, 108), rgba(20, 27, 31));
  }
  .v-icon {
    color: #ffffff;
  }
</style>