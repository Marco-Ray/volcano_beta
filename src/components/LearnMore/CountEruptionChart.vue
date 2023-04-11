<template>
  <div ref="chartContainer" :style="{width: '100%', height: '100%'}"></div>
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
  // The lifecycle hook of the component
  mounted() {
    this.initChart(); // Initialize the chart
  },
  computed: {
    // Sort the data by the year
    sortedRawData() {
      return [...this.rawData].sort((a, b) => a.Year.localeCompare(b.Year));
    },
    // Group the data by the type of the volcano
    dataByType() {
      return this.sortedRawData.reduce((groups, item) => {
        if (!groups[item.Type]) {
          groups[item.Type] = [];
        } // The data of the series
        groups[item.Type].push(item);
        return groups;
      }, {});
    },
    // Get the unique years, which will be used as the x-axis, exact all exiested years
    uniqueYears() {
      return [...new Set(this.sortedRawData.map((item) => item.Year))];
    },
  },
  methods: {
    // Group the data by the type of the volcano
    // Generate the series data
    initChart() {
      const chart = echarts.init(this.$refs.chartContainer);
      const colors = ['#361914', '#994935', '#c67149', '#deb293']; // The colors of the series
      const icons = [
        // stratovolcano
        'path://M122.01,1.81 L119.72,20.67 L106.01,50.38 L58.58,99.53 L1.44,144.67 L252.87,144.67 L261.44,144.67 L207.72,105.81 L156.3,52.67 L140.3,17.81 L137.06,0.86 L131.72,4.67 L125.44,5.05 L122.01,1.81',
        // shield volcano
        'path://M1,125.82l273-.63L214.18,60.41l-47.8-44L145.63.66l-4.41,4.4h-6.28l-5-3.14L119.21,9.47,87.14,34,43.74,74.88,9.46,115.14l-5.34,6.28Z',
        // caldera
        'path://M53.1 3.67L45.1 13.67L32.1 45.67L22.1 62.67L1.1 86.67L183.1 86.67L161.1 60.67L149.1 44.67L139.1 14.67L131.1 0.67L105.1 14.67L89.1 19.67L74.1 12.67L53.1 3.67',
        // Pyroclastic cone
        'path://M441.1,211.93a318.17,318.17,0,0,0-52-44c-37.56-25.4-53.85-24.58-74-48-6.61-7.68-15.07-24.78-32-59,0,0-16.07-32.47-41-54-3.1-2.67-9.76-8-15-6-3.78,1.43-4.4,5.74-10,8a17.16,17.16,0,0,1-8,1c-9.1-.57-12.85-6-17-7-11.67-2.69-27.22,30.09-47,61-9.1,14.22-22.2,34.49-42,55-18.15,18.81-25.61,20.91-51,43a526.53,526.53,0,0,0-51,51h417Z',
        'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow']; // The icons of the series
      const series = Object.keys(this.dataByType).map((type, index) => // Generate the series data
        ({
          /*
          For each volcano type, iterates through all years to find if the current year exists in the data for that volcano type.
          If it does, the EruptionCount corresponding to that year is returned, otherwise 0 is returned.
          */
          data: this.uniqueYears.map((year) => {
            const dataPoint = this.dataByType[type].find((item) => item.Year === year);
            return dataPoint ? dataPoint.EruptionCount : 0;
          }),
          name: type,
          type: 'line',
          smooth: true, // The smoothness of the line
          color: colors[index % colors.length],
          // the symbol of the data point setting
          showSymbol: true,
          symbol: 'circle',
          symbolSize: 8,
          symbolKeepAspect: true,
          itemStyle: {
            color: colors[index % colors.length],
            areaStyle: {
              color: colors[index % colors.length], // The color of the area
            },
          },
          legendHoverLink: true, // Whether to highlight the series when hovering the legend
          lineStyle: {
            color: colors[index % colors.length],
            width: 5,
            type: 'solid',
          },
          markPoint: {
            show: false,
            data: [
              { type: 'max', name: 'max', label: { overlap: true } },
              { type: 'min', name: 'min' },
              // {type:'average',name:'Average'}
            ],
            label: {
              show: true,
              formatter: '{b}',
              fontSize: 10,
              textStyle: {
                color: '#fff',
                fontweight: 'bold',
                fontSize: 15,
              },
            },
            symbolSize: 40,
            itemStyle: {
              color: colors[index % colors.length],
            },
            textStyle: {
              color: '#fff',
              fontweight: 'bold',
              fontSize: 10,
            },
            offset: [0, -20],

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
        }));

      const option = { // The option of the chart
        animationDuration: 5000,
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
        legend: {
          type: 'scroll',
          itemWidth: 40,
          itemHeight: 40,
          show: true,
          textStyle: {
            color: '#fff',
            fontSize: 14,
          },
          data: [
            { name: 'Stratovolcano', icon: icons[0] },
            { name: 'Shield', icon: icons[1] },
            { name: 'Caldera', icon: icons[2] },
            { name: 'PyroclasticCone', icon: icons[3] },
          ],
        },
        // Set the toolbox
        toolbox: {
          show: true,
          orient: 'vertical',
          left: '5%',
          top: 'center',
          itemSize: 30,
          /* textStyle: {
            color: '#fff',
            fontSize: 50,
          }, */
          iconStyle: {
            borderColor: '#fff',
          },
          feature: {
            mark: { show: true },
            dataView: {
              show: true,
              readOnly: false,
              optionToContent: this.optionToContent,
              contentToOption: this.contentToOption,
              /* textStyle: {
                color: '#fff',
                fontSize: 14,
              }, */
            },
            magicType: {
              show: true,
              type: ['bar', 'stack'],
              default: 'stack',
            },
            restore: { show: true },
            saveAsImage: { show: true },
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
            fontSize: 20,
          },
          axisLabel: {
            color: '#fff',
            interval: 5,
            textStyle: {
              color: '#fff',
              fontSize: 16, // ***The font size of the x-axis label***
            },
          },
          data: this.uniqueYears,
        },
        yAxis: {
          show: true,
          name: ' ',
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: '#fff',
            textStyle: {
              fontSize: 16, // ***The font size of the y-axis label***
            },
          },
        },
        grid: {
          // right: 140, // The right margin of the grid is 140
          show: false,
        },
        series, // The series data
      };
      chart.setOption(option);

      window.addEventListener('resize', () => {
        chart.resize();
      });
    },
  },
};
</script>
