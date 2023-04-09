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
      <div id="btt-start" @click="start">START</div>

      <!-- video -->
<!--      <video-player v-if="isShowVideo"-->
<!--                    src="bg-video.mp4"-->
<!--                    poster="bg-video-poster.png"-->
<!--                    :loop="true"-->
<!--                    :volume="0.6"-->
<!--                    :autoplay="true"-->
<!--                    :muted="true"-->
<!--                    @error="closeVideo"-->
<!--                    class="volcano-player"-->
<!--      />-->
      <video autoplay muted loop id="myVideo">
        <source src="bg-video.mp4" type="video/mp4">
      </video>

  </div>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css';
import IconVideo from '@/assets/Welcome/icon-video.png';

export default {
  name: 'HomeView',
  components: {
  },
  data() {
    return {
      isShowVideo: true,
      IconVideo: IconVideo,
    };
  },
  methods: {
    start() {
      this.$router.push('/Statistics');
    },
    closeVideo() {
      this.isShowVideo = false;
    },
  },
};
</script>

<style scoped lang="scss">
.home {
  width: 100vw;
  .container {
    margin-top: hCalc(166);
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

#btt-start {
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
    color: red;
    border-color: red;
  }
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
