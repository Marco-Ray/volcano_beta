<template>
  <nav-bar />
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transitionName" mode="out-in">
      <component :is="Component" :key="route.path"/>
    </transition>
  </router-view>
  <!-- video -->
  <video autoplay muted loop id="myVideo">
    <source :src="BgVideo" type="video/mp4">
  </video>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import BgVideo from '@/assets/bg-video.mp4';

export default {
  name: 'app',
  components: {
    NavBar,
  },
  data() {
    return {
      BgVideo: BgVideo,
    };
  },
  methods: {
    printCat() {
      console.log(' /\\_/\\');
      console.log('( o.o )');
      console.log(' > ^ <');
      console.log('');
    },
  },
  created() {
    this.printCat();
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

@media screen and (max-width: 414px) {
  html, body {
    font-size: 20px;
  }
}

// fade transition
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// slide-up transition
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.75s ease-out;
}

.slide-up-enter-to {
  position: absolute;
  bottom: 0;
}

.slide-up-enter-from {
  position: absolute;
  bottom: -100%;
}

.slide-up-leave-to {
  position: absolute;
  top: -100%;
}

.slide-up-leave-from {
  position: absolute;
  top: 0;
}
</style>
