<template>
  <v-card>
    <v-card-title>Login</v-card-title>
    <v-divider class="my-4"></v-divider>
    <v-text-field v-model="username" label="Username" />
    <v-text-field v-model="password" label="Password" type="password" />

    <v-checkbox v-model="rememberMe" label="Remember Me" />

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
    const rememberMe = ref(false);
    const notificationMessage = ref("");
    const router = useRouter();
    const userStore = useUserStore();

    onMounted(() => {
      const savedUsername = localStorage.getItem("username");
      if (savedUsername) {
        username.value = savedUsername;
        rememberMe.value = true;
      }
    });

    const login = async () => {
      const user = userStore.authenticate(username.value, password.value);

      if (user) {
        if (rememberMe.value) {
          localStorage.setItem("username", username.value);
        } else {
          localStorage.removeItem("username");
        }
        router.push({ name: "assigned" });
      } else {
        notificationMessage.value = "Invalid credentials.";
      }
    };

    return {
      username,
      password,
      rememberMe,
      login,
      notificationMessage,
    };
  },
};
</script>
