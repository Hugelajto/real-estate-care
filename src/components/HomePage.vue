<template>
    <v-container
      fluid
      class="d-flex align-center justify-center fill-height"
    >
      <v-col
        cols="auto"
        class="text-center styled-container"
      >
        <v-img
          src="/real_estate_care_logo.png"
          alt="logo"
          contain
          class="mx-auto"
          max-height="150"
        ></v-img>
        <v-text class="mt-4" large>
          <h1>Real Estate Care</h1>
          <p class="font-weight-thin letter-spacing-custom">
            Caring is in our nature
          </p>
        </v-text>
      </v-col>
    </v-container>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .fill-height {
    height: 100vh; 
  }
  
  .styled-container {
    background-color: white;
    border: 1px solid rgba(128, 128, 128, 0.542); 
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); 
    padding: 50px;
    border-radius: 8px; 
  }
  
  h1 {
    font-size: 4rem;
    color: rgba(41, 52, 57);
    margin: 0; 
  }
  
  p {
    font-size: 2rem;
    color: rgba(0, 170, 162);
    margin: 0; 
  }
  
  .letter-spacing-custom {
    letter-spacing: 5px;
  }
  </style>
  