<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <div class="article">
    <div class="back-box" @click="goBack">
      <div class="back-icon-box">
        <img :src="iconBack" alt="back" class="back-icon"/>
      </div>
      <div class="back">Back</div>
    </div>
<!--    <el-scrollbar v-if="selectedGraph">-->
    <div v-if="selectedGraph">
      <div class="title">
        {{ selectedGraph.title }}
      </div>
      <div class="content">
        <div class="g_content">
          {{ selectedGraph.content }}
        </div>
<!--        <iframe :src="selectedGraph.graph"-->
<!--                :title="index" class="chart">-->
<!--        </iframe>-->
        <div class="chart-container">
          <component :is="chartName[index]" />
        </div>
      </div>
<!--    </el-scrollbar>-->
    </div>
  </div>
</template>

<script>
import IconBack from '@/assets/LearnMore/icon-back.png';
import CountEruptionChart from '@/components/LearnMore/CountEruptionChart.vue';
import CountProportion from '@/components/LearnMore/CountProportion.vue';
import CountHeight from '@/components/LearnMore/CountHeight.vue';

export default {
  name: 'ArticleViews',
  props: {
    graphsList: Array,
  },
  components: {
    CountEruptionChart,
    CountProportion,
    CountHeight,
  },
  data() {
    return {
      iconBack: IconBack,
      index: this.$route.query.index,
      chartName: ['CountProportion', 'CountEruptionChart', 'CountHeight', 'CountEruptionChart'],
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
  computed: {
    selectedGraph() {
      if (this.graphsList) {
        return this.graphsList[this.index];
      }
      return {};
    },
  },
};
</script>

<style scoped lang="scss">
.article {
  width: 100%;
  color: white;
}

.back-box {
  position: absolute;
  top: hCalc(5);
  display: flex;
  z-index: 90;
  align-items: center;
  cursor: pointer;
  .back-icon-box {
    width: hCalc(25);
    height: hCalc(24);
    margin-right: wCalc(5);
    .back-icon {
      width: 100%;
    }
  }
  .back {
    font-family: union_regular;
    font-size: fSizeCalc(28);
  }
}

.title {
  margin-top: hCalc(50);
  font-family: Roboto-Black;
  font-size: fSizeCalc(42);
}
.content {
  //margin: hCalc(60) wCalc(100) 0 wCalc(100);
  margin-top: hCalc(60);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .g_content {
    font-family: union_regular;
    width: 80%;
    font-size: fSizeCalc(24);
    text-align: start;
  }
  .chart {
    margin-top: hCalc(20);
    min-width: wCalc(720);
    min-height: hCalc(420);
  }
}

.chart-container {
  width: 70%;
  margin: hCalc(40) 0;
  padding: hCalc(40) 0;
  height: hCalc(700);
  text-align: center;
  background-color: rgba(72, 72, 73, 0.7);
}

@media screen and (max-width: 414px) {
  .back-box {
    top: hCalcM(15);
    .back-icon-box {
      margin-right: wCalcM(5);
    }
    .back {
      font-size: fSizeCalc(16);
    }
  }

  .title {
    margin-top: hCalcM(50);
    font-size: fSizeCalc(20);
  }

  .content {
    .g_content {
      width: 90%;
      font-size: fSizeCalc(14);
    }
  }

  .chart-container {
    margin-top: hCalcM(60);
    margin-bottom: 0;
    width: 90%;
  }
}
</style>
