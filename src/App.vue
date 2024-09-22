<template>
  <v-app>
    <DashBoard v-if="isAuthenticated" />

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>

    <FooterNavigation v-if="isAuthenticated" />
  </v-app>
</template>

<script>
import DashBoard from "./components/layout/Dashboard.vue";
import FooterNavigation from "./components/layout/FooterNavigation.vue";
import { computed } from "vue";
import { useUserStore } from "@/stores/UserStore";

export default {
  components: { DashBoard, FooterNavigation },
  setup() {
    const userStore = useUserStore();
    const isAuthenticated = computed(() => !!userStore.currentUser);

    return {
      isAuthenticated,
    };
  },
};
</script>
