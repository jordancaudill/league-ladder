<script setup lang="ts">

import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper bg-blue-600">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/signup">Sign Up</RouterLink>
        <RouterLink to="/login">Log In</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
</style>
