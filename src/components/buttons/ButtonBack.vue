<template>
  <v-btn @click="goBack" color="secondary">
    <v-icon>mdi-arrow-left-thin-circle-outline</v-icon>
  </v-btn>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const goBack = () => {
      router.go(-1);
    };

    return { goBack };
  },
};
</script>
