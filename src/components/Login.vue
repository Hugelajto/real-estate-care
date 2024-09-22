<template>
  <v-card>
    <v-card-title>Login</v-card-title>
    <v-divider class="my-4"></v-divider>
    <v-text-field v-model="username" label="Username" />
    <v-text-field v-model="password" label="Password" type="password" />
    <v-btn @click="login" color="primary">Login</v-btn>
    <p v-if="notificationMessage" class="login-notification">
      {{ notificationMessage }}
    </p>
  </v-card>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/UserStore";

export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const notificationMessage = ref("");
    const router = useRouter();
    const userStore = useUserStore();

    onMounted(async () => {
      await userStore.loadUsers();
    });

    const login = async () => {
      const user = userStore.authenticate(username.value, password.value);

      if (user) {
        router.push({ name: "assigned" });
      } else {
        notificationMessage.value = "Invalid credentials.";
      }
    };

    return {
      username,
      password,
      login,
      notificationMessage,
    };
  },
};
</script>
