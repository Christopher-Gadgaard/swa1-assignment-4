<!--Navbar.vue-->
<template>
    <nav class="navbar">
        <router-link to="/" class="navbar-item">
            <i class="fa fa-home"></i> Home
        </router-link>
        <router-link to="/game" class="navbar-item">
            <i class="fa fa-gamepad"></i> Play Game
        </router-link>


        <!-- Dropdown for user-related links -->
        <div class="dropdown">
            <button class="dropbtn">User <i class="fa fa-user"></i> <i class="fa fa-caret-down"></i></button>
            <div class="dropdown-content">
                <router-link to="/profile" class="dropdown-item">
                    <i class="fa fa-user-circle"></i> Profile
                </router-link>
                <router-link to="/high-scores" class="navbar-item">
                    <i class="fa fa-list-ol"></i> High Scores
                </router-link>
                <!-- Add more dropdown links here if necessary -->
            </div>
        </div>
    </nav>
</template>
  
<script lang="ts">
export default {
    name: 'Navbar'
}
</script>
  
<style scoped>
.navbar {
  display: flex;
  justify-content: flex-end;
  background-color: #f5f5f5;
  padding: 1em;
  align-items: center; /* Align items vertically */
}

.navbar-item {
  text-decoration: none;
  color: #333;
  margin: 0 1em;
  display: flex;
  align-items: center; /* Align icon and text */
}

.navbar-item i {
  margin-right: 0.5em; /* Space between icon and text */
}

.dropbtn {
  background-color: #f5f5f5;
  color: #333;
  padding: 0.5em;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center; /* Align icon and text */
}

.dropdown {
  position: relative; /* For absolute positioning of dropdown-content */
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 0;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown-item {
  display: flex;
  align-items: center;
}

.dropdown-item i {
  margin-right: 0.5em;
}
</style>

  