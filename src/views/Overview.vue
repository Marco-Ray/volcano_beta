<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <div>
    <!-- nav-bar /-->
    <div class="overview">
      <div class="container">
        <el-tabs type="card" :tabPosition="isMobile ? 'top' : 'left'"
                 v-model="type"
        >
          <el-tab-pane
            v-for="(label, index) in labelOptions" :key="index"
            :name="label.type"
          >
            <template #label>
              <span class="custom-tabs-label">
                <div class="icon-box">
                  <img :src="label.icon" alt="volcano type icon" class="vType-icon"/>
                </div>
                <span class="tab-title">{{ label.type }}</span>
              </span>
            </template>
            <overview-board :key="index" :index="index" :data="EruptionData[index]" />
          </el-tab-pane>
        </el-tabs>

        <div class="claim">
          <div>* Data source: <a href="https://volcano.si.edu/" target="_blank">https://volcano.si.edu/</a></div>
        </div>

        <div class="viewMore" @click="goFor">
          <div>View Volcanoes</div>
          <div class="icon-box"><img :src="arrowRight" alt="view volcanoes" class="icon" /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import NavBar from '@/components/NavBar.vue';
import OverviewBoard from '@/components/Overview/OverviewBoard.vue';
import ArrowRight from '@/assets/Overview/arrow-right.png';
import ShieldIcon from '@/assets/Overview/Shield.svg';
import Caldera from '@/assets/Overview/Caldera.svg';
import Stratovolcano from '@/assets/Overview/Stratovolcano.svg';
import PyroclasticCones from '@/assets/Overview/PyroclasticCones.svg';

export default {
  name: 'OverView',
  components: {
    // NavBar,
    OverviewBoard,
  },
  data() {
    return {
      arrowRight: ArrowRight,
      labelOptions: [
        {
          type: 'Stratovolcano',
          icon: Stratovolcano,
        },
        {
          type: 'Shield',
          icon: ShieldIcon,
        },
        {
          type: 'Caldera',
          icon: Caldera,
        },
        {
          type: 'Pyroclastic cone',
          icon: PyroclasticCones,
        }],
      type: 'Stratovolcano',
      EruptionData: [
        [
          { Year: '1810-1820', EruptionCount: 60 },
          { Year: '1820-1830', EruptionCount: 96 },
          { Year: '1830-1840', EruptionCount: 84 },
          { Year: '1840-1850', EruptionCount: 120 },
          { Year: '1850-1860', EruptionCount: 133 },
          { Year: '1860-1870', EruptionCount: 136 },
          { Year: '1870-1880', EruptionCount: 116 },
          { Year: '1880-1890', EruptionCount: 161 },
          { Year: '1890-1900', EruptionCount: 137 },
          { Year: '1900-1910', EruptionCount: 181 },
          { Year: '1910-1920', EruptionCount: 154 },
          { Year: '1920-1930', EruptionCount: 201 },
          { Year: '1930-1940', EruptionCount: 177 },
          { Year: '1940-1950', EruptionCount: 147 },
          { Year: '1950-1960', EruptionCount: 203 },
          { Year: '1960-1970', EruptionCount: 189 },
          { Year: '1970-1980', EruptionCount: 199 },
          { Year: '1980-1990', EruptionCount: 211 },
          { Year: '1990-2000', EruptionCount: 227 },
          { Year: '2000-2010', EruptionCount: 234 },
          { Year: '2010-2020', EruptionCount: 182 },
        ],
        [
          { Year: '1810-1820', EruptionCount: 17 },
          { Year: '1820-1830', EruptionCount: 14 },
          { Year: '1830-1840', EruptionCount: 9 },
          { Year: '1840-1850', EruptionCount: 18 },
          { Year: '1850-1860', EruptionCount: 17 },
          { Year: '1860-1870', EruptionCount: 17 },
          { Year: '1870-1880', EruptionCount: 29 },
          { Year: '1880-1890', EruptionCount: 17 },
          { Year: '1890-1900', EruptionCount: 33 },
          { Year: '1900-1910', EruptionCount: 43 },
          { Year: '1910-1920', EruptionCount: 22 },
          { Year: '1920-1930', EruptionCount: 28 },
          { Year: '1930-1940', EruptionCount: 30 },
          { Year: '1940-1950', EruptionCount: 29 },
          { Year: '1950-1960', EruptionCount: 44 },
          { Year: '1960-1970', EruptionCount: 36 },
          { Year: '1970-1980', EruptionCount: 31 },
          { Year: '1980-1990', EruptionCount: 17 },
          { Year: '1990-2000', EruptionCount: 20 },
          { Year: '2000-2010', EruptionCount: 33 },
          { Year: '2010-2020', EruptionCount: 24 },
        ],
        [
          { Year: '1810-1820', EruptionCount: 8 },
          { Year: '1820-1830', EruptionCount: 20 },
          { Year: '1830-1840', EruptionCount: 11 },
          { Year: '1840-1850', EruptionCount: 7 },
          { Year: '1850-1860', EruptionCount: 18 },
          { Year: '1860-1870', EruptionCount: 5 },
          { Year: '1870-1880', EruptionCount: 11 },
          { Year: '1880-1890', EruptionCount: 16 },
          { Year: '1890-1900', EruptionCount: 13 },
          { Year: '1900-1910', EruptionCount: 24 },
          { Year: '1910-1920', EruptionCount: 22 },
          { Year: '1920-1930', EruptionCount: 26 },
          { Year: '1930-1940', EruptionCount: 35 },
          { Year: '1940-1950', EruptionCount: 38 },
          { Year: '1950-1960', EruptionCount: 47 },
          { Year: '1960-1970', EruptionCount: 32 },
          { Year: '1970-1980', EruptionCount: 36 },
          { Year: '1980-1990', EruptionCount: 24 },
          { Year: '1990-2000', EruptionCount: 28 },
          { Year: '2000-2010', EruptionCount: 28 },
          { Year: '2010-2020', EruptionCount: 20 },
        ],
        [
          { Year: '1810-1820', EruptionCount: 0 },
          { Year: '1820-1830', EruptionCount: 0 },
          { Year: '1830-1840', EruptionCount: 0 },
          { Year: '1840-1850', EruptionCount: 2 },
          { Year: '1850-1860', EruptionCount: 0 },
          { Year: '1860-1870', EruptionCount: 2 },
          { Year: '1870-1880', EruptionCount: 1 },
          { Year: '1880-1890', EruptionCount: 2 },
          { Year: '1890-1900', EruptionCount: 4 },
          { Year: '1900-1910', EruptionCount: 3 },
          { Year: '1910-1920', EruptionCount: 3 },
          { Year: '1920-1930', EruptionCount: 4 },
          { Year: '1930-1940', EruptionCount: 2 },
          { Year: '1940-1950', EruptionCount: 5 },
          { Year: '1950-1960', EruptionCount: 6 },
          { Year: '1960-1970', EruptionCount: 6 },
          { Year: '1970-1980', EruptionCount: 3 },
          { Year: '1980-1990', EruptionCount: 1 },
          { Year: '1990-2000', EruptionCount: 3 },
          { Year: '2000-2010', EruptionCount: 0 },
          { Year: '2010-2020', EruptionCount: 0 },
        ],
      ],
      isMobile: this.$store.state.isMobile,
    };
  },
  methods: {
    goFor() {
      this.$router.push({ name: 'Volcano', params: { type: this.type } });
    },
  },
};
</script>

<style scoped lang="scss">
.overview {
  backdrop-filter: blur(14px);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .container {
    position: relative;
    width: calc(100% - wCalc(244));
    height: calc(100% - hCalc(300));
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    row-gap: 100px;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.44), rgba(219, 219, 219, 0.08));
  }
}

.el-tabs {
  height: 100%;
  ::v-deep .el-tabs__nav-wrap {
    padding: 0 !important;
    .el-tabs__nav {
      border: unset !important;
      &.is-left {
        height: 100%;
        justify-content: space-between;
      }
    }
    .el-tabs__item {
      //margin: 5px 0 ;
      width: hCalc(176);
      height: hCalc(176);
      background-color: rgb(151, 151, 151);
      text-align: center;
      line-height: hCalc(166);
      font-family: union_regular;
      font-size: fSizeCalc(15);
      color: white;
      border: unset !important;
      &:hover {
        color: red;
      }
    }
    .is-active {
      background-color: rgb(72, 72, 73);
    }
  }
}

.custom-tabs-label {
  position: relative;
  width: 100%;
  height: 100%;
  .icon-box {
    width: 100%;
    height: 100%;
    .vType-icon {
      width: 100%;
    }
  }
  .tab-title {
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
}

.claim {
  position: absolute;
  bottom: hCalc(-60);
  left: wCalc(120);
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

.viewMore {
  position: absolute;
  bottom: hCalc(-60);
  right: 0;
  height: hCalc(25);
  display: flex;
  flex-direction: row;
  column-gap: 10px;
  cursor: pointer;
  z-index: 90;

  color: white;
  font-family: union_regular;
  font-size: fSizeCalc(32);
  .icon-box {
    height: 100%;
    .icon {
      height: 100%;
    }
  }
}

// mobile
@media screen and (max-width: 414px) {
  .el-tabs {
    width: 100%;
    ::v-deep .el-tabs__header {
      height: unset;
    }
    ::v-deep .el-tabs__nav-wrap {
      .el-tabs__nav {
        border: unset !important;
        &.is-top {
          width: 100%;
          justify-content: space-between;
        }
      }
      .el-tabs__item {
        width: hCalcM(70);
        height: hCalcM(70);
        padding: 0 !important;
        line-height: unset;
      }
    }
  }

  .custom-tabs-label {
    .icon-box {
      .vType-icon {
        width: 100%;
        height: 100%;
      }
    }
    .tab-title {
      display: none;
    }
  }

  .claim {
    font-size: fSizeCalc(10);
    left: 0;
    bottom: hCalcM(-70);
  }

  .viewMore {
    bottom: hCalc(-50);
    font-size: fSizeCalc(16);
  }
}
</style>
