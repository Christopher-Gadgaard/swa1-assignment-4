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
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script lang="ts">
import { userService } from "@/services/userService";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const username = ref("User");
    const showUpdate = ref(false);
    const newPassword = ref("");
    const message = ref("");
    const fetchUserData = async () => {
      try {
        const userId = store.state.user.user.id;
        const token = store.state.user.token;

        if (userId && token) {
          const userData = await userService.getUserById(userId, token);
          username.value = userData.username;
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    onMounted(fetchUserData);

    const showUpdateField = () => {
      showUpdate.value = true;
    };

    const updatePassword = async () => {
      try {
        const userId = store.state.user.user.id;
        const token = store.state.user.token;

        if (userId && token && newPassword.value) {
          const updatedUserData = { password: newPassword.value };
          await userService.updateUser(userId, updatedUserData, token);
          message.value = "Password updated successfully!";
          newPassword.value = "";
          showUpdate.value = false;
        } else {
          message.value = "Missing user ID, token, or new password.";
        }
      } catch (error) {
        console.error("Failed to update password:", error);
        message.value = "Failed to update password. Please try again.";
      }
    };

    const cancelUpdate = () => {
      showUpdate.value = false;
      newPassword.value = "";
    };

    return {
      username,
      showUpdate,
      newPassword,
      message,
      showUpdateField,
      updatePassword,
      cancelUpdate,
    };
  },
};
</script>
