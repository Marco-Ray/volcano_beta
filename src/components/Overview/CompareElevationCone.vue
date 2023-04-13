<!--
  This component is used for comparing the elevation of different volcanoes.
  To display the chart correctly, you have to load the assets.

-->
<template>
  <div ref="chartContainer" :style="{width: '100%', height: '100%'}"></div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue';
import * as echarts from 'echarts';
// load the assets
import Kunlun from '@/assets/Overview/elevation/cone/Kunlun.png';
import Andahua from '@/assets/Overview/elevation/cone/Andahua.png';
import Michoacan from '@/assets/Overview/elevation/cone/Michoacan.png';
import SanQuintin from '@/assets/Overview/elevation/cone/SanQuintin.png';
import Hainan from '@/assets/Overview/elevation/cone/Hainan.png';
import Utlia from '@/assets/Overview/elevation/cone/Utlia.png';
// chart options
const defaultOption = {
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(190,94,63,0.9)',
    borderWidth: 0,
    textStyle: {
      color: '#fff',
    },
    formatter: (params) => {
      const { name } = params;
      if (name !== '') {
        return `${params.marker}\nName : ${params.name}<br>Elevation : ${params.value}\nm <br>Country : ${params.data.country}`;
      }
    },
  },
  legend: {
    textStyle: { color: '#fff' },
    selectedMode: 'single',
    selected: {
      'Top 3 Highest Volcanoes': true,
      'Top 3 Lowest Volcanoes': false,
    },
  },
  xAxis: [
    {
      data: ['1st', '2nd', '3rd'],
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: {
        margin: 20,
        color: '#fff',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
      },
    },
  ],
  yAxis: {
    splitLine: { show: false },
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: { show: false },
  },
  markLine: {
    z: 9,
    silent: false,
  },
  animationEasing: 'elasticOut',
  series: [
    // Highest volcanoes
    {
      type: 'pictorialBar',
      name: 'Top 3 Highest Volcanoes',
      emphasis: {
        scale: true,
      },
      label: {
        show: true,
        position: 'top',
        formatter: '{c} m',
        fontSize: 10,
        color: '#fff',
        fontWeight: 'bold',
        borderWidth: 5,
        align: 'center',
        verticalAlign: 'middle',
        backgroundColor: '#994835',
        borderColor: '#994835',
        borderRadius: 2,
      },
      itemStyle: {
        color: '#c67049',
        shadowBlur: 10,
        shadowColor: '#c67049',
        shadowOffsetX: 1,
        shadowOffsetY: 1,
      },
      symbolOffset: [0, '-0.5%'],
      data: [
        {
          value: 5808,
          name: 'Kunlun Volcanic Group',
          country: 'China',
          symbol: `image://${Kunlun}`,
          symbolSize: ['170%', '95%'],
          symbolPosition: 'start',
          z: 12,
        },
        {
          value: 4713,
          name: 'Andahua-Orcopampa',
          country: 'Peru',
          symbol:
            `image://${Andahua}`,
          symbolSize: ['170%', '95%'],
          symbolPosition: 'start',
          z: 11,
        },
        {
          value: 3860,
          name: 'Michoacan-Guanajuato',
          country: 'Mexico',
          symbol:
            `image://${Michoacan}`,
          symbolSize: ['170%', '95%'],
          symbolPosition: 'start',
          z: 10,
        },
      ],
    },
    // Lowest volcanoes
    {
      name: 'Top 3 Lowest Volcanoes',
      type: 'pictorialBar',
      barGap: '-80%',
      symbol: 'circle',
      itemStyle: {
        color: '#64332a',
        shadowBlur: 40,
        shadowColor: '#64332a',
        shadowOffsetX: 5,
        shadowOffsetY: 5,
      },
      emphasis: {
        scale: true,
      },
      label: {
        show: true,
        position: 'top',
        formatter: '{c} m',
        fontSize: 10,
        color: '#fff',
        fontWeight: 'bold',
        borderWidth: 5,
        align: 'center',
        verticalAlign: 'middle',
        backgroundColor: '#64332a',
        borderColor: '#64332a',
        borderRadius: 2,
      },
      silent: false,
      symbolOffset: [0, 0],
      z: 11,
      data: [
        {
          value: 74,
          name: 'Utlia Island',
          country: 'Honduras',
          symbol:
            `image://${Utlia}`,
          symbolSize: ['180%', '100%'],
          symbolPosition: 'start',
          z: 15,
        },
        {
          value: 196,
          name: 'Hainan Volcanic Field',
          country: 'China',
          symbol:
            `image://${Hainan}`,
          symbolSize: ['180%', '100%'],
          symbolPosition: 'start',
          z: 14,
        },
        {
          value: 260,
          name: 'San Quintin Volcanic Field',
          country: 'Mexico',
          symbol:
            `image://${SanQuintin}`,
          symbolSize: ['180%', '100%'],
          symbolPosition: 'start',
          z: 13,
        },
      ],
    },

  ],
};

export default {
  setup() {
    const chartContainer = ref(null);
    let chartInstance = null;

    const initChart = () => {
      if (chartContainer.value) {
        chartInstance = echarts.init(chartContainer.value);
        chartInstance.setOption(defaultOption);
      }
    };

    const onResize = () => {
      if (chartInstance) {
        chartInstance.resize();
      }
    };

    onMounted(() => {
      initChart();
      window.addEventListener('resize', onResize);
    });
    onUnmounted(() => {
      window.removeEventListener('resize', onResize);
    });

    return {
      chartContainer,
    };
  },

};
</script>
