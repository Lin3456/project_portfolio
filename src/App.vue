<template>
  <div id="app">
    <NavBar />
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from '@/views/header/navBar.vue';

export default {
  name: 'App',
  components: {
    NavBar,
  }
}
</script>

<style scoped>
</style>
