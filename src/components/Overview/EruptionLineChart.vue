<template>
  <div ref="chartContainer" class="chart-container" />
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'EruptionLineChart',
  // The props of the component
  props: {
    chartTitle: {
      type: String,
      required: true,
      default: 'Eruption Frequency', // The default value is "Eruption Frequency"
    },
    rawData: {
      type: Array,
      required: true,
      default: () => [], // The default value is an empty array
    },
  },
  data() {
    return {
    };
  },
  // The lifecycle hook of the component
  mounted() {
    this.initChart(); // Initialize the chart
  },
  methods: {
    initChart() {
      const chart = echarts.init(this.$refs.chartContainer);

      const option = {
        animationDuration: 3000,
        backgroundColor: 'transparent',
        title: {
          text: this.chartTitle,
          show: false,
        },
        tooltip: {
          order: 'valueDesc', // The order of the tooltip is descending (for multiple series)
          trigger: 'axis',
          backgroundColor: 'rgba(190,94,63,0.5)',
          borderWidth: 0,
          textStyle: {
            color: '#fff',
          },
        },
        xAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          type: 'category',
          nameLocation: 'middle',
          textStyle: {
            color: 'rgba(74,71,71,)',
          },
          axisLabel: {
            color: '#fff',
            formatter: (value, index) => {
              if (index === 0 || index === this.rawData.length - 1) {
                return value;
              }
              return '';
            },
          },
          data: this.rawData.map((item) => item.Year),
        },
        yAxis: {
          show: false,
          name: 'value',

        },
        grid: {
          // right: 140, // The right margin of the grid is 140
          show: false,
        },
        series: [
          {
            data: this.rawData.map((item) => item.EruptionCount),
            type: 'line',
            smooth: true,
            // the symbol of the data point setting
            showSymbol: true,
            symbol: 'circle',
            symbolSize: 5,
            symbolKeepAspect: true,
            itemStyle: {
              color: 'rgba(131,68,42,0.9)',
              areaStyle: {
                color: 'rgba(131,68,42,0.9)',
              },
            },
            name: 'Eruption Count',
            legendHoverLink: true,
            lineStyle: {
              color: 'rgba(74,71,71,0.9)',
              width: 5,
              type: 'solid',
            },
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' },
                // {type:'average',name:'Average'}
              ],
              label: {
                show: true,
                formatter: '{b}',
              },
              symbolSize: 60,
              itemStyle: {
                color: 'rgba(74,71,71,0.9)',
              },
              textStyle: {
                color: '#fff',
                fontweight: 'bold',
                fontSize: 10,
              },
            },
            /* markLine:{
              data:[
                {type:'average',name:'Average'}
              ],
              label:{
                show:false,
                formatter:'{b}:{c}'
              },
            }, */
          },
        ],
      };
      chart.setOption(option);

      window.addEventListener('resize', () => {
        chart.resize();
      });
    },
  },
  beforeUnmount() {
  },
};
</script>

<style lang="scss" scoped>
.chart-container {
  width: 100%;
  height: 100%;
}
</style>
