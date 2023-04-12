<template>
  <div ref="chartDom" style="width: 100%; height: 100%;"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'VolTest',
  data() {
    return {
      chart: null,
      labelOption: {
        show: false,
        position: 'insideBottom',
        distance: 15,
        align: 'left',
        verticalAlign: 'middle',
        rotate: 90,
        formatter: '{c}',
        fontSize: 10,
        rich: {
          name: {},
        },
      },
    };
  },
  mounted() {
    this.createChart();
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    resizeChart() {
      if (this.chart) {
        this.chart.resize();
        this.updateAxisLabelFontSize();
      }
    }, // resizeChart,调整图表大小
    updateAxisLabelFontSize() {
      const { chartDom } = this.$refs;
      const chartWidth = chartDom.clientWidth;
      const fontSize = chartWidth < 900 ? 6 : 9; // adjust the font size as needed
      this.chart.setOption({
        xAxis: {
          axisLabel: {
            fontSize,
          },
        },
      });
    },
    optionToContent(opt) {
      const { series } = opt;
      let table = `
      <div style="display: flex; justify-content: center; background-color: #f0f0f0; padding: 16px;">
        <table style="width:500px; text-align:center; background-color: #fff; border-collapse: separate; border-spacing: 10px 0px;">
          <tbody>
            <tr>`;
      table += '<th>Country</th>';
      for (const serie of series) {
        table += `<th>${serie.name}</th>`;
      }
      table += '</tr>';

      const countries = opt.xAxis[0].data;
      const numOfCountries = countries.length;
      for (let i = 0; i < numOfCountries; i++) {
        table += '<tr>';
        table += `<td>${countries[i]}</td>`;
        for (const serie of series) {
          table += `<td>${serie.data[i]}</td>`;
        }
        table += '</tr>';
      }
      table += '</tbody></table>';
      return table;
    }, // optionToContent,将数据转换为表格
    contentToOption(container, opt) {
      const table = container.querySelector('table');
      const rows = table.querySelectorAll('tr');
      const numOfRows = rows.length;
      const numOfCols = opt.series.length;
      for (let i = 1; i < numOfRows; i++) {
        const cells = rows[i].querySelectorAll('td');
        for (let j = 1; j <= numOfCols; j++) {
          const value = parseFloat(cells[j].innerText);
          if (!isNaN(value)) {
            opt.series[j - 1].data[i - 1] = value;
          }
        }
      }
    }, // contentToOption,将表格转换为数据
    createChart() {
      const { chartDom } = this.$refs;
      this.chart = echarts.init(chartDom);
      const icons = [
        // stratovolcano
        'path://M122.01,1.81 L119.72,20.67 L106.01,50.38 L58.58,99.53 L1.44,144.67 L252.87,144.67 L261.44,144.67 L207.72,105.81 L156.3,52.67 L140.3,17.81 L137.06,0.86 L131.72,4.67 L125.44,5.05 L122.01,1.81',
        // shield volcano
        'path://M1,125.82l273-.63L214.18,60.41l-47.8-44L145.63.66l-4.41,4.4h-6.28l-5-3.14L119.21,9.47,87.14,34,43.74,74.88,9.46,115.14l-5.34,6.28Z',
        // caldera
        'path://M53.1 3.67L45.1 13.67L32.1 45.67L22.1 62.67L1.1 86.67L183.1 86.67L161.1 60.67L149.1 44.67L139.1 14.67L131.1 0.67L105.1 14.67L89.1 19.67L74.1 12.67L53.1 3.67',
        // Pyroclastic cone
        'path://M441.1,211.93a318.17,318.17,0,0,0-52-44c-37.56-25.4-53.85-24.58-74-48-6.61-7.68-15.07-24.78-32-59,0,0-16.07-32.47-41-54-3.1-2.67-9.76-8-15-6-3.78,1.43-4.4,5.74-10,8a17.16,17.16,0,0,1-8,1c-9.1-.57-12.85-6-17-7-11.67-2.69-27.22,30.09-47,61-9.1,14.22-22.2,34.49-42,55-18.15,18.81-25.61,20.91-51,43a526.53,526.53,0,0,0-51,51h417Z',
        'triangle', 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'];
      const CountryIcon = {
        Japan: require('@/assets/LearnMore/country/Japan.png'),
        UnitedStates: require('@/assets/LearnMore/country/UnitedStates.png'),
        Indonesia: require('@/assets/LearnMore/country/Indonesia.png'),
        Russia: require('@/assets/LearnMore/country/Russia.png'),
        Chile: require('@/assets/LearnMore/country/Chile.png'),
        Mexico: require('@/assets/LearnMore/country/Mexico.png'),
        PNG: require('@/assets/LearnMore/country/PNG.png'),
        Iceland: require('@/assets/LearnMore/country/Iceland.png'),
        Ethiopia: require('@/assets/LearnMore/country/Ethiopia.png'),
        Philippines: require('@/assets/LearnMore/country/Philippines.png'),
      };
      const color = ['#361914', '#994935', '#c67149', '#deb293', '#f6eade', '#ffffff'];
      const option = {
        title: {
          text: '10 Countries with the Most Volcanoes',
          subtext: 'Data from Global Volcanism Program',
          left: 'center',
          textStyle: {
            color: '#fff',
            fontSize: 20,
          },
          subtextStyle: {
            color: '#fff',
            fontSize: 14,
          },
        },
        color,
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(255,255,255,0.7)',
          axisPointer: {
            show: true,
            type: 'cross',
          },
        },
        legend: {
          data: [
            { name: 'Stratovolcano', icon: icons[0] },
            { name: 'Shield', icon: icons[1] },
            { name: 'Caldera', icon: icons[2] },
            { name: 'PyroclasticCone', icon: icons[3] },
            { name: 'Others', icon: icons[4] },
          ],
          top: 'bottom',
          textStyle: {
            color: '#fff',
            fontSize: 12,
          },
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          itemSize: 25,
          emphasis: {
            iconStyle: {
              borderColor: '#bf5f40', // 设置边框颜色
              borderWidth: 2, // 设置边框宽度
              color: '#ffffff', // 设置图标颜色
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
            mark: { show: true },
            dataView: {
              show: true,
              title: 'Data View',
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
              title: {
                line: 'Line Chart',
                bar: 'Bar Chart',
                stack: 'Stacked Chart',
                tiled: 'Tiled Chart',
              },
              type: ['line', 'bar', 'stack'],
              default: 'stack',
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
        backgroundColor: 'transparent',
        xAxis: [
          {
            name: 'Country',
            type: 'category',
            axisTick: { show: true },
            axisPointer: {
              type: 'shadow',
              shadowstyle: {
                color: 'rgba(255,255,255,0.3)',
              },
              label: {
                show: false,
                backgroundColor: 'rgba(255,255,255,0.3)',
                color: '#000',
                shadowBlur: 0,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                fontSize: 0,
              },
            },
            data: [
              'Japan',
              'UnitedStates',
              'Indonesia',
              'Russia',
              'Chile',
              'Mexico',
              'PNG',
              'Iceland',
              'Ethiopia',
              'Philippines',
            ],
            axisLine: {
              lineStyle: {
                color: '#fff',
              },
            },
            axisLabel: {
              interval: 0, // X轴显示完全
              fontSize: 9,
              textStyle: {
                color: '#fff',
              },
              rotate: 0,
              formatter(value) {
                return `{${value}| }\n{value|${value}}`; // value是坐标轴的值
              },
              margin: 5,
              rich: { // 富文本样式
                value: {
                  lineHeight: 25, // 行高
                  align: 'center', // 文字居中
                  fontSize: 11,
                },
                Japan: {
                  width: 20,
                  height: 15,
                  align: 'center',
                  backgroundColor: {
                    image: CountryIcon.Japan,
                  },
                },
                UnitedStates: {
                  width: 20,
                  height: 15,
                  align: 'center',
                  backgroundColor: {
                    image: CountryIcon.UnitedStates,
                  },
                },
                Indonesia: {
                  width: 20,
                  height: 15,
                  align: 'center',
                  backgroundColor: {
                    image: CountryIcon.Indonesia,
                  },
                  bordercolor: 'black',
                  borderWidth: 1,
                },
                Russia: {
                  width: 20,
                  height: 15,
                  align: 'center',
                  backgroundColor: {
                    image: CountryIcon.Russia,
                  },
                  bordercolor: 'black',
                  borderWidth: 1,
                },
                Chile: {
                  width: 20,
                  height: 15,
                  align: 'center',
                  backgroundColor: {
                    image: CountryIcon.Chile,
                  },
                  bordercolor: 'black',
                  borderWidth: 1,
                },
                Mexico: {
                  width: 20,
                  height: 15,
                  align: 'center',
                  backgroundColor: {
                    image: CountryIcon.Mexico,
                  },
                  bordercolor: 'black',
                  borderWidth: 1,
                },
                PNG: {
                  width: 20,
                  height: 15,
                  align: 'center',
                  backgroundColor: {
                    image: CountryIcon.PNG,
                  },
                  bordercolor: 'black',
                  borderWidth: 1,
                },
                Iceland: {
                  width: 20,
                  height: 15,
                  align: 'center',
                  backgroundColor: {
                    image: CountryIcon.Iceland,
                  },
                  bordercolor: 'black',
                  borderWidth: 1,
                },
                Ethiopia: {
                  width: 20,
                  height: 15,
                  align: 'center',
                  backgroundColor: {
                    image: CountryIcon.Ethiopia,
                  },
                  bordercolor: 'black',
                  borderWidth: 1,
                },
                Philippines: {
                  width: 20,
                  height: 15,
                  align: 'center',
                  backgroundColor: {
                    image: CountryIcon.Philippines,
                  },
                  bordercolor: 'black',
                  borderWidth: 1,
                },
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              fontSize: 12,
              textStyle: {
                color: '#fff',
              },
            },
            axisPointer: {
              snap: true, // 坐标轴指示器是否自动吸附到点上
              show: true,
              type: 'line',
              lineStyle: {
                color: '#fff',
                width: 1,
                type: 'dashed',
              },
              label: {
                show: true,
                backgroundColor: 'rgba(255,255,255,0.3)',
                color: 'white',
                fontSize: 14,
                padding: 5,
                formatter: (params) => Math.round(params.value),
              },
            },
          },
        ],
        series: [
          {
            name: 'Stratovolcano',
            type: 'bar',
            stack: 'total',
            label: this.labelOption,
            emphasis: {
              focus: 'series',
            },
            data: [60.0, 41.0, 65.0, 33.0, 40.0, 8.0, 10.0, 12.0, 10.0, 19.0],
          },
          {
            name: 'Shield',
            type: 'bar',
            stack: 'total',
            label: this.labelOption,
            emphasis: {
              focus: 'series',
            },
            data: [8.0, 20.0, 0.0, 20.0, 1.0, 3.0, 0.0, 1.0, 6.0, 0.0],
          },
          {
            name: 'Caldera',
            type: 'bar',
            stack: 'total',
            label: this.labelOption,
            emphasis: {
              focus: 'series',
            },
            data: [12.0, 4.0, 12.0, 7.0, 4.0, 2.0, 3.0, 2.0, 4.0, 2.0],
          },
          {
            name: 'PyroclasticCone',
            type: 'bar',
            stack: 'total',
            label: this.labelOption,
            emphasis: {
              focus: 'series',
            },
            data: [2.0, 6.0, 2.0, 7.0, 7.0, 8.0, 0.0, 1.0, 3.0, 0.0],
          },
          {
            name: 'Others',
            type: 'bar',
            stack: 'total',
            label: this.labelOption,
            emphasis: {
              focus: 'series',
            },
            data: [22.0, 28.0, 16.0, 12.0, 6.0, 8.0, 15.0, 12.0, 5.0, 6.0],
          },
        ],
      };
      this.chart.setOption(option);
      this.updateAxisLabelFontSize();

      window.addEventListener('resize', () => {
        this.chart.resize();
      });
    },
  },
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

</style>
