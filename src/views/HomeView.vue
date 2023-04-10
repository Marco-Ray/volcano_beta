<template>
  <div class="home">
    <div class="container">
      <div>
        <div id="title">
          <div>
            Explore
          </div>
          <div>
            The Volcanoes
          </div>
        </div>
        <div class="description">
          <p>
            The website presents dynamic data on four of
            the world's existing volcanoes and their specific volcanoes,
            with science as the main feature.
          </p>
        </div>
      </div>


      <div class="scroll-down-btt animate__animated animate__flash animate__infinite animate__slower"
           @click="scrollDown"
      >
        <img :src="IconScrolldown" alt="scroll down" class="icon scroll-down" />
      </div>
    </div>

    <div id="conclusion">
      <div class="scroll-up-btt animate__animated animate__flash animate__infinite animate__slower"
           @click="scrollUp"
      >
        <img :src="IconScrolldown" alt="scroll up" class="icon scroll-up" />
      </div>
      <div id="btt-start" @click="start">START</div>
    </div>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css';
import IconScrolldown from '@/assets/Welcome/icon-scrolldown.svg';

export default {
  name: 'HomeView',
  components: {
  },
  data() {
    return {
      isShowVideo: true,
      IconScrolldown: IconScrolldown,
    };
  },
  methods: {
    start() {
      this.$router.push('/overview');
    },
    scrollDown() {
      document.getElementById('conclusion').scrollIntoView({ behavior: 'smooth' });
    },
    scrollUp() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
};
</script>

<style scoped lang="scss">
.home {
  width: 100vw;
  .container {
    height: 100vh;
    margin-left: wCalc(122);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    row-gap: 100px;
    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url('@/assets/Welcome/bg-video-poster.png') no-repeat center;
      z-index: -1;
    }
  }
  .scroll-down-btt {
    position: absolute;
    bottom: hCalc(50);
    left: 50%;
    transform: translateX(-50%);
    width: hCalc(57);
    height: hCalc(57);
    cursor: pointer;
    .icon {
      width: 100%;
      height: 100%;
    }
  }
}

#title {
  width: 858px;

  font-family: Roboto-Black;
  text-align: start;
  color: white;
  font-size: fSizeCalc(82);
}

.description {
  width: 600px;

  font-family: union_regular;
  font-size: fSizeCalc(22);
  color: white;
  text-align: start;
  overflow-wrap: break-word;

  p {
    line-height: 33px;
  }
}

#conclusion {
  height: 100vh;
  backdrop-filter: blur(14px);
  position: relative;

  .scroll-up-btt {
    position: absolute;
    top: hCalc(182);
    left: 50%;
    transform: translateX(-50%) rotate(180deg);
    width: hCalc(57);
    height: hCalc(57);
    cursor: pointer;
    .icon {
      width: 100%;
      height: 100%;
    }
  }

  #btt-start {
    position: absolute;
    left: 50%;
    bottom: hCalc(50);
    transform: translateX(-50%);
    margin-bottom: 20px;
    width: wCalc(199);
    height: wCalc(69);
    border-radius: 12px;
    border-width: 2px;
    border-style: solid;
    border-color: white;
    cursor: pointer;

    line-height: fSizeCalc(69);
    font-family: union_regular;
    font-size: fSizeCalc(30);
    color: white;

    &:hover {
      color: rgb(191, 95, 64);
      border-color: rgb(191, 95, 64);
    }
  }
}
</style>
