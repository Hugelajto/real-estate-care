<template>
  <v-bottom-navigation class="gradient-app-bar white-icons" horizontal>
    <v-btn to="/assigned">
      <v-icon>mdi-file-document</v-icon>
    </v-btn>

    <v-btn to="/completed">
      <v-icon>mdi-check-circle</v-icon>
    </v-btn>

    <v-btn to="/documentation">
      <v-icon>mdi-book</v-icon>
    </v-btn>

    <v-btn to="/settings">
      <v-icon>mdi-cog</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
