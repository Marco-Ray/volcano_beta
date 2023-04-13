<!--
  This component is the **count proportion ** placed in the **Home** tab.
  It is used to display the **the proportion of different vocalno types**.
-->
<template>
  <div ref="chartContainer" :style="{ width: '100%', height: '100%' }"></div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import { autoType } from 'd3-dsv';

export default {
  name: 'CountProportion',
  props: {
    chartTitle: {
      type: String,
      default: 'The proportion of different vocalno types',
    },
  },
  data() {
    return {
      chartData: [
        { Type: 'Stratovolcano', Count: 461 },
        { Type: 'Shield', Count: 162 },
        { Type: 'Caldera', Count: 106 },
        { Type: 'PyroclasticCone', Count: 104 },
        { Type: 'Others', Count: 113 },
      ],
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    // Convert hex color to rgba color
    hexToRgba(hex, opacity) {
      return (
        `rgba(${
          parseInt(`0x${hex.slice(1, 3)}`)
        },${
          parseInt(`0x${hex.slice(3, 5)}`)
        },${
          parseInt(`0x${hex.slice(5, 7)}`)
        },${
          opacity
        })`
      );
    },
    // Initialize the chart
    initChart() {
      const chart = echarts.init(this.$refs.chartContainer);

      const backgroundColor = 'transparent';
      const radius = ['60%', '68%'];
      const color = ['#361914', '#994935', '#c67149', '#deb293', '#f6eade', '#ffffff'];

      const icons = [
        // stratovolcano
        'path://M122.01,1.81 L119.72,20.67 L106.01,50.38 L58.58,99.53 L1.44,144.67 L252.87,144.67 L261.44,144.67 L207.72,105.81 L156.3,52.67 L140.3,17.81 L137.06,0.86 L131.72,4.67 L125.44,5.05 L122.01,1.81',
        // shield volcano
        'path://M1,125.82l273-.63L214.18,60.41l-47.8-44L145.63.66l-4.41,4.4h-6.28l-5-3.14L119.21,9.47,87.14,34,43.74,74.88,9.46,115.14l-5.34,6.28Z',
        // caldera
        'path://M53.1 3.67L45.1 13.67L32.1 45.67L22.1 62.67L1.1 86.67L183.1 86.67L161.1 60.67L149.1 44.67L139.1 14.67L131.1 0.67L105.1 14.67L89.1 19.67L74.1 12.67L53.1 3.67',
        // Pyroclastic cone
        'path://M441.1,211.93a318.17,318.17,0,0,0-52-44c-37.56-25.4-53.85-24.58-74-48-6.61-7.68-15.07-24.78-32-59,0,0-16.07-32.47-41-54-3.1-2.67-9.76-8-15-6-3.78,1.43-4.4,5.74-10,8a17.16,17.16,0,0,1-8,1c-9.1-.57-12.85-6-17-7-11.67-2.69-27.22,30.09-47,61-9.1,14.22-22.2,34.49-42,55-18.15,18.81-25.61,20.91-51,43a526.53,526.53,0,0,0-51,51h417Z',
        'triangle', 'path://M 179.11 1.5 L 1.11 202.5 L 386.11 202.5 L 232.11 0.51 L 179.11 1.5', 'circle', 'rect', 'roundRect', 'diamond', 'pin', 'arrow'];

      const color1 = [];
      const color2 = [];
      const color3 = []; // The color of the three rings of the chart

      color.forEach((item) => {
        color1.push(item, 'transparent'); // The color of the first ring of the chart
        color2.push(this.hexToRgba(item, 0.7), 'transparent'); // The color of the second ring of the chart
        color3.push(this.hexToRgba(item, 0.4), 'transparent'); // The color of the third ring of the chart
      }); // set to gradient color

      const data1 = [];
      let sum = 0;
      this.chartData.forEach((item) => {
        sum += Number(item.Count);
      }); // iterate the chartData to get the sum of the data

      this.chartData.forEach((item) => {
        if (item.value !== 0) {
          data1.push({
            name: item.Type,
            value: item.Count,
          }, {
            name: '',
            value: sum / 60, //
            labelLine: {
              show: false,
              lineStyle: {
                color: 'transparent',
              },
            },
            itemStyle: {
              color: 'transparent',
            },
          });
        }
      }); // iterate the chartData (item) to get the data of the first ring of the chart

      const radius2 = [`${Number(radius[1].split('%')[0]) + 0}%`, `${Number(radius[1].split('%')[0]) + 8}%`];
      // The radius of the second ring of the chart
      const radius3 = [`${Number(radius[1].split('%')[0]) + 8}%`, `${Number(radius[1].split('%')[0]) + 20}%`];
      // The radius of the third ring of the chart

      const option = {
        backgroundColor,
        grid: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          containLabel: true,
        }, // The grid of the chart
        legend: {
          width: '100%',
          show: true,
          orient: 'horizontal',
          left: 'center',
          bottom: 'auto',
          padding: [5, 10, 5, 10],
          itemGap: 10,
          type: 'plain',
          top: 'auto',
          itemWidth: 40,
          textStyle: {
            color: '#fff',
            fontSize: autoType === 'auto' ? 8 : 16,
          },
          data: [
            { name: 'Stratovolcano', icon: icons[0] },
            { name: 'Shield', icon: icons[1] },
            { name: 'Caldera', icon: icons[2] },
            { name: 'PyroclasticCone', icon: icons[3] },
            { name: 'Others', icon: icons[4] },
          ],
        },
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: (params) => {
            if (params.seriesIndex === 0) { // 只处理 seriesIndex 为 0 的情况，避免重复显示
              const dataIndex = Math.floor(params.dataIndex / 2);
              const { name } = this.chartData[dataIndex];
              if (name !== '') {
                return `${params.marker}${params.name} : ${params.value}\n(${params.percent}%)`;
              }
            }
          },
          backgroundColor: 'rgba(190,94,63,0.5)',
          borderWidth: 0,
          textStyle: {
            color: '#fff',
          },
        },
        series: [
          // outside ring
          {
            type: 'pie',
            radius: radius3,
            center: ['50%', '50%'], // The center of the chart
            hoverAnimation: true,
            startAngle: 90,
            selectedMode: 'single',
            selectedOffset: 0,
            itemStyle: {
              normal: {
                color: (params) => color1[params.dataIndex],
              },
            },

            label: {
              show: false,
            },
            labelLine: {
              show: false,
              length: 15,
              length2: 60,
              lineStyle: {
                color: '#fff',
                width: 2,
              },
            },
            data: data1,
            z: 667,
            zlevel: 667,
          },
          // middle ring
          {
            type: 'pie',
            silent: true,
            radius: radius2,
            center: ['50%', '50%'],
            hoverAnimation: false,
            startAngle: 90,
            selectedMode: 'single',
            selectedOffset: 0,
            itemStyle: {
              normal: {
                color: (params) => color2[params.dataIndex],
              },
            },
            label: {
              show: false,
              formatter: '{b}' + ' ' + '{c}',
            },
            data: data1,
            z: 667,
            zlevel: 667,
          },
          // inside ring
          {
            type: 'pie',
            silent: true,
            radius,
            center: ['50%', '50%'],
            hoverAnimation: false,
            startAngle: 90,
            selectedMode: 'single',
            selectedOffset: 0,
            itemStyle: {
              normal: {
                color: (params) => color3[params.dataIndex],
              },
            },
            label: {
              show: false,
              formatter: '{b}' + ' ' + '{c}',
            },
            data: data1,
            z: 667, // The z value, ensure that the third ring of the chart is displayed on the top
            zlevel: 667,
          },
        ],
      };
      chart.setOption(option);

      window.addEventListener('resize', () => {
        chart.resize();
      });
    },
  },
};

</script>
