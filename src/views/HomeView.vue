<template>
  <div class="home">
    <div id="welcome" class="container">
      <div>
        <div id="title">
          <div>
            Explore
          </div>
          <div :style="{color: 'rgb(191, 95, 64)'}">
            The Volcanoes
          </div>
        </div>
        <div class="description">
          <p>
            This popular science website presents dynamic data on four
            volcanoes types and respectively volcanoes,
            aiming to give you a glimpse of the charm of the volcanoes and our unique Earth.
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
      <div class="chart-container">
        <div class="description">
          As you can see in the chart below. Stratovolcanos, Shield, Caldera and Pyroclastic
          Cone arethe four most common types of volcano,
          with around 90% of the world's volcanoes being of these four types.
        </div>
        <count-proportion />
        <div class="description">
          Therefore, we will focus on these four types of volcanoes on this website.
          In Overview you can get basic information on the four types of volcanoes;
        </div>
      </div>

      <div class="claim">
        <div>* Data source: <a href="https://volcano.si.edu/" target="_blank">https://volcano.si.edu/</a></div>
      </div>

      <div id="btt-start" @click="start">START</div>
    </div>
  </div>
</template>

<script>
import IconScrolldown from '@/assets/Welcome/icon-scrolldown.svg';
import CountProportion from '@/components/LearnMore/CountProportion.vue';

export default {
  name: 'HomeView',
  components: {
    CountProportion,
  },
  data() {
    return {
      isShowVideo: true,
      IconScrolldown: IconScrolldown,
      chartTitle: 'As you can see in the chart below. Stratovolcanos, Shield, Caldera and Pyroclastic Cone arethe four most common types of volcano, with around 90% of the world\'s volcanoes being of these four types.',
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
      document.getElementById('welcome').scrollIntoView({ behavior: 'smooth' });
    },
  },
};
</script>

<style scoped lang="scss">
.home {
  height: 100vh;
  width: 100vw;
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  .container {
    position: relative;
    scroll-snap-align: center;
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
      //background: url('@/assets/Welcome/bg-video-poster.png') no-repeat center;
      z-index: -1;
    }
  }
  .scroll-down-btt {
    position: absolute;
    bottom: hCalc(50);
    left: 50%;
    transform: translateX(calc(-50% - wCalc(61)));
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
  //width: wCalc(858);

  font-family: Roboto-Black;
  text-align: start;
  color: white;
  font-size: fSizeCalc(82);
}

.description {
  width: wCalc(600);

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
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .scroll-up-btt {
    //position: absolute;
    //top: hCalc(182);
    //left: 50%;
    transform: rotate(180deg);
    margin-top: hCalc(140);
    width: hCalc(57);
    height: hCalc(57);
    cursor: pointer;
    z-index: 889;
    .icon {
      width: 100%;
      height: 100%;
    }
  }
  .chart-container {
    margin: hCalc(40) 0;
    padding: hCalc(20) 0;
    width: 70%;
    height: calc(100% - hCalc(239));
    background-color: rgb(72, 72, 73, 0.7);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .description {
      width: 80%;
      text-align: center;
      &:nth-child(1) {
        margin-bottom: hCalc(20);
      }
      &:nth-child(2) {
        margin-top: hCalc(20);
      }
    }
  }

  .claim {
    position: absolute;
    bottom: hCalc(100);
    left: wCalc(300);
    color: white;
    z-index: 90;
    font-family: union_regular;
    font-size: fSizeCalc(20);
    a {
      color: white;
      &:hover {
        color: rgb(191, 95, 64);
      }
    }
  }

  #btt-start {
    //position: absolute;
    //left: 50%;
    //bottom: hCalc(50);
    //transform: translateX(-50%);
    margin-bottom: hCalc(20);
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

// mobile
@media screen and (max-width: 414px) {
  #welcome {
    margin: 0 wCalcM(14);
  }

  #title {
    font-size: fSizeCalc(26);
    text-align: center;
  }

  .description {
    width: 100%;
    font-size: fSizeCalc(12);
    text-align: center;
    margin-top: hCalc(100);
  }

  .home {
    .scroll-down-btt {
      width: hCalcM(28);
      height: hCalcM(28);
      transform: translateX(-50%);
    }
  }

  #conclusion {
    .scroll-up-btt {
      width: hCalcM(28);
      height: hCalcM(28);
    }
    .claim {
      font-size: fSizeCalc(10);
      left: hCalcM(60);
      bottom: hCalcM(70);
    }
    #btt-start {
      width: wCalcM(80);
      height: wCalcM(41);
      line-height: wCalcM(41);
      font-size: fSizeCalc(16);
    }
    .chart-container {
      margin-top: hCalc(10);
      .description {
        width: 100%;
        margin-top: 0;
      }
    }
  }

}
</style>
