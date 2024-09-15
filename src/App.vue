<template>
  <v-app>
    <DashBoard />
    <v-main>
      <HomePage />
    </v-main>
    <FooterNavigation />
  </v-app>
</template>

<script setup>
import DashBoard from './components/DashBoard.vue';
import HomePage from './components/HomePage.vue';
import FooterNavigation from './components/FooterNavigation.vue'
</script>


<style>
.v-main {
background-color: rgba(0, 170, 162);
}
</style>