<template>
  <div>
    <p>Hello, {{ state.username }}</p>
    <button v-if="!state.showUpdate" @click="showUpdateField">Update Password</button>
    <div v-if="state.showUpdate">
      <input
        type="password"
        v-model="state.newPassword"
        placeholder="Enter new password"
      />
      <button @click="updatePassword">Save</button>
      <button @click="cancelUpdate">Cancel</button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const playerId = store.state.user.id;

    // Use reactive for an object holding multiple properties
    const state = reactive({
      username: "User", // Replace with dynamic data
      showUpdate: false,
      newPassword: "",
    });

    function showUpdateField() {
      state.showUpdate = true;
    }

    function updatePassword() {
      // Logic to update the password
      state.showUpdate = false;
      state.newPassword = "";
    }

    function cancelUpdate() {
      state.showUpdate = false;
      state.newPassword = "";
    }

    return { 
      state, 
      showUpdateField, 
      updatePassword, 
      cancelUpdate 
    };
  }
};
</script>
