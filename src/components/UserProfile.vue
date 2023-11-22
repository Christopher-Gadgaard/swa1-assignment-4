<!--UserProfile.vue-->
<template>
  <div>
    <p>Hello, {{ username }}</p>
    <button v-if="!showUpdate" @click="showUpdateField">Update Password</button>
    <div v-if="showUpdate">
      <input
        type="password"
        v-model="newPassword"
        placeholder="Enter new password"
      />
      <button @click="updatePassword">Save</button>
      <button @click="cancelUpdate">Cancel</button>
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { useStore } from "vuex";

export default {
  data() {
    return {
      username: "User", // Replace with dynamic data
      showUpdate: false,
      newPassword: "",
    };
  },
  setup() {
    const store = useStore();
    const playerId = store.state.user.id;

    console.log(store.state.user.token, "token");
    console.log(store.state.user.user.id, "id");
  },
  methods: {
    showUpdateField() {
      this.showUpdate = true;
    },
    updatePassword() {
      // Logic to update the password
      this.showUpdate = false;
      this.newPassword = "";
    },
    cancelUpdate() {
      this.showUpdate = false;
      this.newPassword = "";
    },
  },
};
</script>
