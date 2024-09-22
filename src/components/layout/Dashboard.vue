<template>
  <div>
    <v-app-bar class="gradient-app-bar white-icons" app>
      <v-container fluid>
        <v-row align="center" justify="space-between">
          <v-col cols="12" md="auto" class="d-flex flex-column align-center">
            <v-container class="pa-0 text-center">
              <h1 class="text-h5">Real Estate Care</h1>
              <p class="font-weight-thin letter-spacing-custom">
                Caring is in our nature
              </p>
            </v-container>
          </v-col>

          <v-spacer></v-spacer>

          <v-img
            src="@/assets/real_estate_care_logo.png"
            alt="logo"
            contain
            max-height="50"
            class="logo"
          ></v-img>

          <v-spacer></v-spacer>

          <v-col cols="12" md="auto" class="d-flex justify-center">
            <p v-if="currentUser" class="font-weight-bold">
              Welcome, {{ currentUser.username }}!
            </p>
          </v-col>

          <v-col cols="12" md="auto" class="d-flex justify-center">
            <v-btn to="/assigned" icon>
              <v-icon>mdi-file-document</v-icon>
            </v-btn>
            <v-btn to="/completed" icon>
              <v-icon>mdi-check-circle</v-icon>
            </v-btn>
            <v-btn to="/documentation" icon>
              <v-icon>mdi-book</v-icon>
            </v-btn>
            <v-btn to="/settings" icon>
              <v-icon>mdi-cog</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
import { computed } from "vue";
import { useUserStore } from "@/stores/UserStore";

export default {
  setup() {
    const userStore = useUserStore();
    const currentUser = computed(() => userStore.currentUser);

    return {
      currentUser,
    };
  },
};
</script>
