<template>
  <nav-bar />
  <router-view />

  <!-- video -->
  <video autoplay muted loop id="myVideo">
    <source src="bg-video.mp4" type="video/mp4">
  </video>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'app',
  components: {
    NavBar,
  },
};
</script>

<style lang="scss">
@import '@/styles/mixin.scss';

html, body {
  margin: 0;
  padding: 0;
  font-size: wCalc(16);
  //overflow-x: hidden;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#myVideo {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  z-index: -1;
}
</style>
