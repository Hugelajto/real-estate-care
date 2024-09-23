<template>
  <div>
    <v-card>
      <div class="d-flex justify-center ma-2">
        <v-avatar color="black" size="x-large">
          <v-img alt="Avatar" src="@/assets/real_estate_care_logo.png"></v-img>
        </v-avatar>
      </div>

      <v-card-title>Settings</v-card-title>
      <v-divider class="my-4"></v-divider>

      <v-text-field
        v-model="username"
        label="Username"
        :disabled="!isUsernameEditable"
      />
      <v-checkbox v-model="isUsernameEditable" label="Edit Username" />
      <v-divider class="my-4"></v-divider>

      <v-text-field
        v-model="password"
        label="Password"
        :type="showPassword ? 'text' : 'password'"
        :disabled="!isPasswordEditable"
      />
      <v-checkbox v-model="isPasswordEditable" label="Edit Password" />
      <v-checkbox v-model="showPassword" label="Show Password" />
      <v-divider class="my-4"></v-divider>

      <v-switch v-model="notifications" label="Notifications" />
      <p v-if="successMessage" class="notification">{{ successMessage }}</p>

      <v-btn @click="updateSettings" color="primary">
        <v-icon>mdi-check-circle-outline</v-icon>
      </v-btn>
      <ButtonBack />
      <v-btn @click="logout" color="red">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-card>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/UserStore";
import ButtonBack from "./buttons/ButtonBack.vue";
import router from "@/router";

export default {
  components: { ButtonBack },
  setup() {
    const userStore = useUserStore();
    const currentUser = computed(() => userStore.currentUser);
    const username = ref(currentUser.value ? currentUser.value.username : "");
    const password = ref(currentUser.value ? currentUser.value.password : "");
    const notifications = ref(true);
    const showPassword = ref(false);
    const isUsernameEditable = ref(false);
    const isPasswordEditable = ref(false);
    const successMessage = ref("");

    const updateSettings = async () => {
      try {
        if (isUsernameEditable.value || isPasswordEditable.value) {
          await userStore.updateUser(
            isUsernameEditable.value
              ? username.value
              : currentUser.value.username,
            isPasswordEditable.value
              ? password.value
              : currentUser.value.password
          );
          successMessage.value = "Settings updated successfully!";
        }
      } catch (error) {
        successMessage.value = "";
      }
    };

    const logout = () => {
      userStore.logout();
      router.push({ name: "login" });
    };

    return {
      username,
      password,
      notifications,
      showPassword,
      isUsernameEditable,
      isPasswordEditable,
      successMessage,
      updateSettings,
      logout,
    };
  },
};
</script>
