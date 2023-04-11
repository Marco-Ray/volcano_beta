<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <div class="article">
    <div class="back-box" @click="goBack">
      <div class="back-icon-box">
        <img :src="iconBack" alt="back" class="back-icon"/>
      </div>
      <div class="back">Back</div>
    </div>
    <el-scrollbar v-if="selectedGraph">
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
          <count-eruption-chart :rawData="CountEruptionData"
                              chartTitle="The eruption of Stratovolcanoes in the last 2 centuries">
          </count-eruption-chart>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import IconBack from '@/assets/LearnMore/icon-back.png';
import CountEruptionChart from '@/components/LearnMore/CountEruptionChart.vue';

export default {
  name: 'ArticleViews',
  props: {
    graphsList: Array,
  },
  components: {
    CountEruptionChart,
  },
  data() {
    return {
      iconBack: IconBack,
      index: this.$route.query.index,
      CountEruptionData:[
        { Type: "Stratovolcano", Year: "1810-1820", EruptionCount: 60 },
        { Type: "Stratovolcano", Year: "1821-1830", EruptionCount: 96 },
        { Type: "Stratovolcano", Year: "1831-1840", EruptionCount: 84 },
        { Type: "Stratovolcano", Year: "1841-1850", EruptionCount: 120 },
        { Type: "Stratovolcano", Year: "1851-1860", EruptionCount: 133 },
        { Type: "Stratovolcano", Year: "1861-1870", EruptionCount: 136 },
        { Type: "Stratovolcano", Year: "1871-1880", EruptionCount: 116 },
        { Type: "Stratovolcano", Year: "1881-1890", EruptionCount: 161 },
        { Type: "Stratovolcano", Year: "1891-1900", EruptionCount: 137 },
        { Type: "Stratovolcano", Year: "1901-1910", EruptionCount: 181 },
        { Type: "Stratovolcano", Year: "1911-1920", EruptionCount: 154 },
        { Type: "Stratovolcano", Year: "1921-1930", EruptionCount: 201 },
        { Type: "Stratovolcano", Year: "1931-1940", EruptionCount: 177 },
        { Type: "Stratovolcano", Year: "1941-1950", EruptionCount: 147 },
        { Type: "Stratovolcano", Year: "1951-1960", EruptionCount: 203 },
        { Type: "Stratovolcano", Year: "1961-1970", EruptionCount: 189 },
        { Type: "Stratovolcano", Year: "1971-1980", EruptionCount: 199 },
        { Type: "Stratovolcano", Year: "1981-1990", EruptionCount: 211 },
        { Type: "Stratovolcano", Year: "1991-2000", EruptionCount: 227 },
        { Type: "Stratovolcano", Year: "2001-2010", EruptionCount: 234 },
        { Type: "Stratovolcano", Year: "2011-2020", EruptionCount: 182 },
        { Type: "Shield", Year: "1810-1820", EruptionCount: 17 },
        { Type: "Shield", Year: "1821-1830", EruptionCount: 14 },
        { Type: "Shield", Year: "1831-1840", EruptionCount: 9 },
        { Type: "Shield", Year: "1841-1850", EruptionCount: 18 },
        { Type: "Shield", Year: "1851-1860", EruptionCount: 17 },
        { Type: "Shield", Year: "1861-1870", EruptionCount: 17 },
        { Type: "Shield", Year: "1871-1880", EruptionCount: 29 },
        { Type: "Shield", Year: "1881-1890", EruptionCount: 17 },
        { Type: "Shield", Year: "1891-1900", EruptionCount: 33 },
        { Type: "Shield", Year: "1901-1910", EruptionCount: 43 },
        { Type: "Shield", Year: "1911-1920", EruptionCount: 22 },
        { Type: "Shield", Year: "1921-1930", EruptionCount: 28 },
        { Type: "Shield", Year: "1931-1940", EruptionCount: 30 },
        { Type: "Shield", Year: "1941-1950", EruptionCount: 29 },
        { Type: "Shield", Year: "1951-1960", EruptionCount: 44 },
        { Type: "Shield", Year: "1961-1970", EruptionCount: 36 },
        { Type: "Shield", Year: "1971-1980", EruptionCount: 31 },
        { Type: "Shield", Year: "1981-1990", EruptionCount: 17 },
        { Type: "Shield", Year: "1991-2000", EruptionCount: 20 },
        { Type: "Shield", Year: "2001-2010", EruptionCount: 33 },
        { Type: "Shield", Year: "2011-2020", EruptionCount: 24 },
        { Type: "Caldera", Year: "1810-1820", EruptionCount: 8 },
        { Type: "Caldera", Year: "1821-1830", EruptionCount: 20 },
        { Type: "Caldera", Year: "1831-1840", EruptionCount: 11 },
        { Type: "Caldera", Year: "1841-1850", EruptionCount: 7 },
        { Type: "Caldera", Year: "1851-1860", EruptionCount: 18 },
        { Type: "Caldera", Year: "1861-1870", EruptionCount: 5 },
        { Type: "Caldera", Year: "1871-1880", EruptionCount: 11 },
        { Type: "Caldera", Year: "1881-1890", EruptionCount: 16 },
        { Type: "Caldera", Year: "1891-1900", EruptionCount: 13 },
        { Type: "Caldera", Year: "1901-1910", EruptionCount: 24 },
        { Type: "Caldera", Year: "1911-1920", EruptionCount: 22 },
        { Type: "Caldera", Year: "1921-1930", EruptionCount: 26 },
        { Type: "Caldera", Year: "1931-1940", EruptionCount: 35 },
        { Type: "Caldera", Year: "1941-1950", EruptionCount: 38 },
        { Type: "Caldera", Year: "1951-1960", EruptionCount: 47 },
        { Type: "Caldera", Year: "1961-1970", EruptionCount: 32 },
        { Type: "Caldera", Year: "1971-1980", EruptionCount: 36 },
        { Type: "Caldera", Year: "1981-1990", EruptionCount: 24 },
        { Type: "Caldera", Year: "1991-2000", EruptionCount: 28 },
        { Type: "Caldera", Year: "2001-2010", EruptionCount: 28 },
        { Type: "Caldera", Year: "2011-2020", EruptionCount: 20 },
        { Type: "PyroclasticCone", Year: "1810-1820", EruptionCount: 0 },
        { Type: "PyroclasticCone", Year: "1821-1830", EruptionCount: 0 },
        { Type: "PyroclasticCone", Year: "1831-1840", EruptionCount: 0 },
        { Type: "PyroclasticCone", Year: "1841-1850", EruptionCount: 2 },
        { Type: "PyroclasticCone", Year: "1851-1860", EruptionCount: 0 },
        { Type: "PyroclasticCone", Year: "1861-1870", EruptionCount: 2 },
        { Type: "PyroclasticCone", Year: "1871-1880", EruptionCount: 1 },
        { Type: "PyroclasticCone", Year: "1881-1890", EruptionCount: 2 },
        { Type: "PyroclasticCone", Year: "1891-1900", EruptionCount: 4 },
        { Type: "PyroclasticCone", Year: "1901-1910", EruptionCount: 3 },
        { Type: "PyroclasticCone", Year: "1911-1920", EruptionCount: 3 },
        { Type: "PyroclasticCone", Year: "1921-1930", EruptionCount: 4 },
        { Type: "PyroclasticCone", Year: "1931-1940", EruptionCount: 2 },
        { Type: "PyroclasticCone", Year: "1941-1950", EruptionCount: 5 },
        { Type: "PyroclasticCone", Year: "1951-1960", EruptionCount: 6 },
        { Type: "PyroclasticCone", Year: "1961-1970", EruptionCount: 6 },
        { Type: "PyroclasticCone", Year: "1971-1980", EruptionCount: 3 },
        { Type: "PyroclasticCone", Year: "1981-1990", EruptionCount: 1 },
        { Type: "PyroclasticCone", Year: "1991-2000", EruptionCount: 3 },
        { Type: "PyroclasticCone", Year: "2001-2010", EruptionCount: 0 },
        { Type: "PyroclasticCone", Year: "2011-2020", EruptionCount: 0 },
      ],
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
  margin: hCalc(60) wCalc(100) 0 wCalc(100);
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
  width: 100%;
  margin-top: hCalc(40);
  padding-top: hCalc(40);
  height: hCalc(700);
  text-align: center;
  background-color: rgba(72, 72, 73, 0.7);
}
</style>
