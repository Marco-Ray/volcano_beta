<template>
  <div ref="chartContainer" style="width: 100%; height: 100%;"></div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue';
import * as echarts from 'echarts';
import 'echarts/map/js/world.js';

const icons = [
  // stratovolcano
  'path://M122.01,1.81 L119.72,20.67 L106.01,50.38 L58.58,99.53 L1.44,144.67 L252.87,144.67 L261.44,144.67 L207.72,105.81 L156.3,52.67 L140.3,17.81 L137.06,0.86 L131.72,4.67 L125.44,5.05 L122.01,1.81',
  // shield volcano
  'path://M1,125.82l273-.63L214.18,60.41l-47.8-44L145.63.66l-4.41,4.4h-6.28l-5-3.14L119.21,9.47,87.14,34,43.74,74.88,9.46,115.14l-5.34,6.28Z',
  // caldera
  'path://M53.1 3.67L45.1 13.67L32.1 45.67L22.1 62.67L1.1 86.67L183.1 86.67L161.1 60.67L149.1 44.67L139.1 14.67L131.1 0.67L105.1 14.67L89.1 19.67L74.1 12.67L53.1 3.67',
  // Pyroclastic cone
  'path://M441.1,211.93a318.17,318.17,0,0,0-52-44c-37.56-25.4-53.85-24.58-74-48-6.61-7.68-15.07-24.78-32-59,0,0-16.07-32.47-41-54-3.1-2.67-9.76-8-15-6-3.78,1.43-4.4,5.74-10,8a17.16,17.16,0,0,1-8,1c-9.1-.57-12.85-6-17-7-11.67-2.69-27.22,30.09-47,61-9.1,14.22-22.2,34.49-42,55-18.15,18.81-25.61,20.91-51,43a526.53,526.53,0,0,0-51,51h417Z',
  'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'];

const defaultOption = {
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(190,94,63,0.9)',
    borderWidth: 0,
    textStyle: {
      color: '#fff',
      fontSize: 8,
    },
    formatter: (params) => {
      const { name } = params;
      if (name !== '') {
        return `${params.marker}\nName : ${params.name}<br>Number: ${params.value}`;
      }
    },
  },
  legend: {
    textStyle: { color: '#fff' },
    selectedMode: 'single',
    selected: {
      Stratovolcano: true,
      Shield: false,
      Caldera: false,
      PyroclasticCone: false,
    },
    data: [
      { name: 'Stratovolcano', icon: icons[0], itemStyle: { color: '#632a24' } },
      { name: 'Shield', icon: icons[1], itemStyle: { color: '#923b2b' } },
      { name: 'Caldera', icon: icons[2], itemStyle: { color: '#d1884e' } },
      { name: 'PyroclasticCone', icon: icons[3], itemStyle: { color: '#e6c5a1' } },
    ],
  },
  title: {
    show: false,
    text: 'Distribution of Volcanoes by Type',
    left: 'center',
    top: 'top',
  },
  visualMap: {
    type: 'continuous',
    calculable: true,
    min: 0,
    max: 61,
    inRange: {
      color: ['#f0e7d1', '#d3ad71', '#9c6332', '#693d2a', '#341b14'],
    },
  },
  // Set the toolbox
  toolbox: {
    show: true,
    orient: 'vertical',
    right: 'auto',
    top: 'center',
    itemSize: 20,
    emphasis: {
      iconStyle: {
        borderColor: '#bf5f40', // 设置边框颜色
        borderWidth: 2, // 设置边框宽度
        color: '#7c3c30', // 设置图标颜色
        shadowBlur: 5, // 设置阴影模糊度
        shadowColor: '#d08c67', // 设置阴影颜色
        shadowOffsetX: 0, // 设置阴影水平偏移
        shadowOffsetY: 0, // 设置阴影垂直偏移
      },
    },
    iconStyle: {
      borderColor: '#fff',
    },
    feature: {
      mark: {
        show: true,
        title: {
          mark: 'Mark',
          markUndo: 'Undo Mark',
          markClear: 'Clear Mark',
        },
      },
      restore: {
        show: true,
        title: 'Restore',
      },
      saveAsImage: {
        show: true,
        title: 'Save as Image',
      },
      // Share to Twitter
      myTool: {
        show: true,
        title: 'Share to Twitter',
        icon: 'path://M22.23,5.211c0.774,0.352,1.421,0.774,1.983,1.4c-0.607-0.37-1.166-0.607-1.725-0.813c-0.607-0.214-1.214-0.352-1.822-0.429C20.023,5.023,18.878,5,17.733,5c-2.112,0-3.943,0.774-5.488,2.322c-1.545,1.547-2.318,3.377-2.318,5.489c0,0.352,0.016,0.703,0.053,1.054c-2.641-0.137-5.028-0.964-7.165-2.476c-0.293-0.214-0.673-0.496-1.139-0.845c0,0.021,0,0.053,0,0.073c0,1.955,0.786,3.65,2.357,5.102c-0.704-0.023-1.365-0.23-1.983-0.583v0.053c0,2.737,1.973,5.021,4.595,5.547c-0.47,0.137-0.96,0.186-1.45,0.186c-0.363,0-0.725-0.037-1.088-0.105c0.725,2.262,2.835,3.916,5.315,3.97c-1.949,1.525-4.4,2.439-7.079,2.439c-0.469,0-0.938-0.026-1.396-0.079c2.519,1.617,5.513,2.566,8.508,2.566c10.214,0,15.814-8.451,15.814-15.788l-0.018-0.725c1.054-0.774,1.983-1.71,2.732-2.798z', // Use a custom icon path
        onclick: () => {
          const text = encodeURIComponent('Check out the awesome volcano data!');
          const url = encodeURIComponent(window.location.href);
          const twitterURL = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
          window.open(twitterURL, '_blank');
        },
      },
    },
  },
  series: [
    // Set the startovolcano data
    {
      type: 'map',
      map: 'world',
      roam: true,
      name: 'Stratovolcano',
      itemStyle: {
        normal: {
          areaColor: 'rgba(251,246,239,0.3)',
          borderColor: '#fff',
          borderWidth: 0.5,
          color: '#361914',
        },
        emphasis: {
          areaColor: '#f3e3d2',
          borderColor: '#fff',
          borderWidth: 0.5,
        },
      },
      data: [
        { name: 'Japan', value: 60 },
        { name: 'United States', value: 41 },
        { name: 'Indonesia', value: 65 },
        { name: 'Russia', value: 33 },
        { name: 'Chile', value: 40 },
        { name: 'Mexico', value: 8 },
        { name: 'Papua New Guinea', value: 10 },
        { name: 'Iceland', value: 12 },
        { name: 'Ethiopia', value: 10 },
        { name: 'Philippines', value: 19 },
        { name: 'Ecuador', value: 11 },
        { name: 'Guatemala', value: 12 },
        { name: 'Canada', value: 2 },
        { name: 'Antarctica', value: 6 },
        { name: 'New Zealand', value: 5 },
        { name: 'Nicaragua', value: 7 },
        { name: 'El Salvador', value: 10 },
        { name: 'Argentina', value: 6 },
        { name: 'Italy', value: 6 },
        { name: 'Vanuatu', value: 7 },
        { name: 'United Kingdom', value: 8 },
        { name: 'Portugal', value: 9 },
        { name: 'France', value: 7 },
        { name: 'Costa Rica', value: 8 },
        { name: 'Yemen', value: 1 },
        { name: 'China', value: 1 },
        { name: 'Spain', value: 2 },
        { name: 'Colombia', value: 6 },
        { name: 'Peru', value: 5 },
        { name: 'Turkey', value: 4 },
        { name: 'Tanzania', value: 4 },
        { name: 'Dominica', value: 3 },
        { name: 'Armenia', value: 2 },
        { name: 'Honduras', value: 2 },
        { name: 'Greece', value: 2 },
        { name: 'Uganda', value: 1 },
        { name: 'Eritrea', value: 2 },
        { name: 'Chad', value: 2 },
        { name: 'DR Congo', value: 3 },
        { name: 'Solomon Islands', value: 3 },
        { name: 'Cameroon', value: 2 },
        { name: 'Grenada', value: 1 },
        { name: 'Norway', value: 1 },
        { name: 'Saint Kitts and Nevis', value: 2 },
        { name: 'Georgia', value: 1 },
        { name: 'Australia', value: 1 },
        { name: 'South Korea', value: 1 },
        { name: 'Netherlands', value: 2 },
        { name: 'Saint Vincent and the Grenadines', value: 1 },
        { name: 'Panama', value: 1 },
        { name: 'Cape Verde', value: 1 },
        { name: 'Burma (Myanmar)', value: 1 },
        { name: 'Iran', value: 1 },

      ],
    },
    // Set the shieldvolcano data
    {
      type: 'map',
      map: 'world',
      roam: true,
      name: 'Shield',
      itemStyle: {
        normal: {
          areaColor: 'rgba(251,246,239,0.3)',
          borderColor: '#fff',
          borderWidth: 0.5,
          color: '#994935',
        },
        emphasis: {
          areaColor: '#f3e3d2',
          borderColor: '#fff',
          borderWidth: 0.5,
        },
      },
      data: [
        {
          name: 'Japan',
          value: 8,
        },
        {
          name: 'United States',
          value: 20,
        },
        {
          name: 'Russia',
          value: 20,
        },
        {
          name: 'Chile',
          value: 1,
        },
        {
          name: 'Mexico',
          value: 3,
        },
        {
          name: 'Iceland',
          value: 1,
        },
        {
          name: 'Ethiopia',
          value: 6,
        },
        {
          name: 'Ecuador',
          value: 9,
        },
        {
          name: 'Canada',
          value: 2,
        },
        {
          name: 'Antarctica',
          value: 8,
        },
        {
          name: 'New Zealand',
          value: 1,
        },
        {
          name: 'Nicaragua',
          value: 2,
        },
        {
          name: 'Kenya',
          value: 10,
        },
        {
          name: 'Argentina',
          value: 1,
        },
        {
          name: 'Italy',
          value: 1,
        },
        {
          name: 'Vanuatu',
          value: 1,
        },
        {
          name: 'United Kingdom',
          value: 2,
        },
        {
          name: 'Portugal',
          value: 1,
        },
        {
          name: 'France',
          value: 2,
        },
        {
          name: 'Yemen',
          value: 3,
        },
        {
          name: 'Spain',
          value: 1,
        },
        {
          name: 'Colombia',
          value: 1,
        },
        {
          name: 'Turkey',
          value: 1,
        },
        {
          name: 'Tonga',
          value: 1,
        },
        {
          name: 'Greece',
          value: 1,
        },
        {
          name: 'DR Congo',
          value: 1,
        },
        {
          name: 'South Africa',
          value: 2,
        },
        {
          name: 'Norway',
          value: 1,
        },
        {
          name: 'Fiji',
          value: 1,
        },
        {
          name: 'Samoa',
          value: 2,
        },
        {
          name: 'Comoros',
          value: 1,
        },
        {
          name: 'North Korea',
          value: 1,
        },
      ],
    },
    // set the calderavolcano data
    {
      type: 'map',
      map: 'world',
      roam: true,
      name: 'Caldera',
      itemStyle: {
        normal: {
          areaColor: 'rgba(251,246,239,0.3)',
          borderColor: '#fff',
          borderWidth: 0.5,
          color: '#c67149',
        },
        emphasis: {
          areaColor: '#f3e3d2',
          borderColor: '#fff',
          borderWidth: 0.5,
        },
      },
      data: [
        {
          name: 'Japan',
          value: 12,
        },
        {
          name: 'United States',
          value: 4,
        },
        {
          name: 'Indonesia',
          value: 12,
        },
        {
          name: 'Russia',
          value: 7,
        },
        {
          name: 'Chile',
          value: 4,
        },
        {
          name: 'Mexico',
          value: 2,
        },
        {
          name: 'Papua New Guinea',
          value: 3,
        },
        {
          name: 'Iceland',
          value: 2,
        },
        {
          name: 'Ethiopia',
          value: 4,
        },
        {
          name: 'Philippines',
          value: 2,
        },
        {
          name: 'Ecuador',
          value: 3,
        },
        {
          name: 'Canada',
          value: 1,
        },
        {
          name: 'Antarctica',
          value: 1,
        },
        {
          name: 'New Zealand',
          value: 4,
        },
        {
          name: 'Nicaragua',
          value: 1,
        },
        {
          name: 'El Salvador',
          value: 2,
        },
        {
          name: 'Turkey',
          value: 1,
        },
        {
          name: 'Tanzania',
          value: 1,
        },
        {
          name: 'Tonga',
          value: 1,
        },
        {
          name: 'Saint Lucia',
          value: 1,
        },
      ],
    },
    // set the pyroclasticcone data
    {
      type: 'map',
      map: 'world',
      roam: true,
      name: 'PyroclasticCone',
      itemStyle: {
        normal: {
          areaColor: 'rgba(251,246,239,0.3)',
          borderColor: '#fff',
          borderWidth: 0.5,
          color: '#c67149',
        },
        emphasis: {
          areaColor: '#deb293',
          borderColor: '#fff',
          borderWidth: 0.5,
        },
      },
      data: [
        { name: 'Japan', value: 2 },
        { name: 'United States', value: 6 },
        { name: 'Indonesia', value: 2 },
        { name: 'Russia', value: 7 },
        { name: 'Chile', value: 7 },
        { name: 'Mexico', value: 8 },
        { name: 'Iceland', value: 1 },
        { name: 'Ethiopia', value: 3 },
        { name: 'Ecuador', value: 1 },
        { name: 'Guatemala', value: 1 },
        { name: 'Canada', value: 4 },
        { name: 'Antarctica', value: 2 },
        { name: 'New Zealand', value: 1 },
        { name: 'Nicaragua', value: 1 },
        { name: 'El Salvador', value: 1 },
        { name: 'Kenya', value: 1 },
        { name: 'Argentina', value: 2 },
        { name: 'Portugal', value: 1 },
        { name: 'China', value: 6 },
        { name: 'Spain', value: 2 },
        { name: 'Peru', value: 1 },
        { name: 'Turkey', value: 2 },
        { name: 'Tanzania', value: 1 },
        { name: 'Armenia', value: 1 },
        { name: 'Honduras', value: 1 },
        { name: 'Sudan', value: 3 },
        { name: 'Madagascar', value: 2 },
        { name: 'Mongolia', value: 1 },
        { name: 'Cameroon', value: 1 },
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
        chartInstance.setOption(defaultOption); // 设置 ECharts option
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
