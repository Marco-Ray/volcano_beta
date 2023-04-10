<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
 <div class="category">
   <!--el-scrollbar height="811px" -->
     <div class="card card-1">
       <div>
         <div class="title">Volcano Type and Ash Composition</div>
         <div class="features">{{ features }}</div>
       </div>
         <div class="title countries">Common Distribution Countries</div>
         <div class="countries-box">
           <div v-for="(countryImg, index) in countries[index]" :key="index">
             <img :src="countryImg" alt="country" class="icon-country" />
           </div>
         </div>
      </div>
      <!-- eslint-disable-next-line -->
     <div class="card card-2" @mouseover="showChart=true" @mouseleave="showChart=false">
      <div class="title">Emission Frequency</div>
      </div>
     <div class="card card-3">
      <div class="title">Volcano Elevation</div>
      </div>
     <div class="cPhoto-box">
        <img v-if='!showChart' :src="imgList[index][0]" alt="" class="cPhoto" />
        <img v-else :src="imgList[index][1]" alt="" class="cPhoto__chart" />
     </div>
   <!--/el-scrollbar -->
 </div>
</template>

<script>
import China from '@/assets/Overview/countries/011-china.png';
import Mexico from '@/assets/Overview/countries/033-mexico.png';
import Russia from '@/assets/Overview/countries/044-russia.png';
import Indonesia from '@/assets/Overview/countries/185-indonesia.png';
import US from '@/assets/Overview/countries/186-united states.png';
import Chile from '@/assets/Overview/countries/212-chile.png';
import Ecuador from '@/assets/Overview/countries/214-ecuador.png';
import NZ from '@/assets/Overview/countries/215-new zealand.png';
import Kenya from '@/assets/Overview/countries/234-kenya.png';
import Japan from '@/assets/Overview/countries/241-japan.png';

export default {
  name: 'OverviewBoard',
  props: {
    index: Number,
  },
  data() {
    return {
      features: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      imgList: [
        ['https://i.postimg.cc/zGZkGFQ7/1-2.png', 'https://i.postimg.cc/Nj6k9rqc/1-2.png'],
        ['https://i.postimg.cc/j5FH0HNz/2-2.png', 'https://i.postimg.cc/hjjL5yJD/2-2.png'],
        ['https://i.postimg.cc/2jtwPDFP/3-2.png', 'https://i.postimg.cc/pdkQkbLc/3-2.png'],
        ['https://i.postimg.cc/VLbRwVK5/4-2.png', 'https://i.postimg.cc/fbMjxTD0/4-2.png'],
      ],
      countries: [
        [Indonesia, Japan, US, Chile, Russia],
        [US, Russia, Kenya, Ecuador, Japan],
        [Japan, Indonesia, Russia, NZ, US],
        [Mexico, Russia, Chile, China, US],
      ],
      showChart: false,
    };
  },
  methods: {
  },
};
</script>

<style scoped lang="scss">
.category {
  display: grid;
  width: calc(100vw - wCalc(244) - hCalc(176) - 9px);
  height: calc(100vh - hCalc(300));
  grid-template-columns: repeat(3, 1fr);
  overflow: scroll;
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(100% - 1px);
    height: calc(100% - 5px);
    color: white;
    border-right: 1px solid rgb(151, 151, 151);
    border-top: 5px solid transparent;
    &:nth-child(-1) {
      border-right: unset;
    }
    &:hover {
      border-top-color: rgb(191, 95, 64);
    }
  }

  .title {
    margin-top: 37px;
    width: 438px;
    height: 112px;
    font-family: Roboto-Black;
    font-size: 35px;
    text-align: center;

    &.countries {
      padding-left: 40px;
      text-align: left;
    }
  }

  .features {
    padding: 0 40px;
    font-family: union_regular;
    font-size: 16px;
    line-height: 31px;
    text-align: start;
  }

  .countries-box {
    display: flex;
    flex-wrap: wrap;
    padding: 0 40px;
    column-gap: hCalc(66);
    row-gap: hCalc(10);
    .icon-country {
      width: hCalc(59);
      height: hCalc(59);
    }
  }
}

.cPhoto-box {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: hCalc(658);
  pointer-events: none;
  .cPhoto {
    width: 100%;
    height: 100%;
    object-fit: scale-down;
    object-position: 50% 100%;
  }
  .cPhoto__chart {
    width: 100%;
    height: 100%;
    object-fit: scale-down;
    object-position: 50% 100%;
    z-index: 100;
  }
}

//@media screen and (max-width: 900px) {
//  .category {
//    grid-template-columns: repeat(1, 1fr);
//    .card {
//      border-bottom: 1px solid rgb(151, 151, 151);
//      &:nth-child(-1) {
//        border-right: unset;
//      }
//      &:hover {
//        border-top: unset;
//        border-left: 5px solid white;
//      }
//    }
//  }
//}
</style>
