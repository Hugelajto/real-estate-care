import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    users: [],
    currentUser: null,
    loading: false,
    error: null,
  }),

  actions: {
    async loadUsers() {
      this.loading = true;
      this.error = null;

      try {
        const res = await fetch("http://localhost:3000/users");
        if (!res.ok) throw new Error("Failed to load users");
        this.users = await res.json();
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    authenticate(username, password) {
      const user = this.users.find(
        (u) => u.username === username && u.password === password
      );
      if (user) {
        this.currentUser = user;
        return user;
      }
      return null;
    },

    logout() {
      this.currentUser = null;
    },

    async updateUser(username, password) {
      const userIndex = this.users.findIndex(
        (u) => u.username === this.currentUser.username
      );
      if (userIndex !== -1) {
        this.users[userIndex].username = username;
        this.users[userIndex].password = password;

        const response = await fetch(
          `http://localhost:3000/users/${this.users[userIndex].id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          }
        );

        if (!response.ok)
          throw new Error("Failed to update user in the database");
      }
    },
  },
});
