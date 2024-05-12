
<script setup>
// import LoginForm from './components/Login.vue'
import { RouterView } from 'vue-router';

</script>
<template>
<main>
 <RouterView />
</main>
</template>


<style>
 @tailwind base;
@tailwind components;
@tailwind utilities;
#app {
  
  background-color: #eef2f6 !important;
  min-height: 150vh !important;
  margin: 0 !important;
  padding: 0 !important;
}
</style>
