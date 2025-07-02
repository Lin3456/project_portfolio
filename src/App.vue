<template>
  <div id="app">
    <NavBar/>
    <div class="pt-4">
      <router-view />
    </div>
    <Footer/>
  </div>
</template>

<script>
import NavBar from '@/views/header/navBar.vue';
import Footer from '@/views/footer/index.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    Footer,
  }
}
</script>

<style scoped>
</style>
