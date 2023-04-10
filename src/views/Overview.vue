<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <div>
    <!-- nav-bar /-->
    <div class="overview">
      <div class="container">
        <el-tabs type="card" tabPosition="left">
          <el-tab-pane
            v-for="(label, index) in labelOptions" :key="index"
          >
            <template #label>
              <span class="custom-tabs-label">
                <div class="icon-box">
                  <img :src="label.icon" alt="volcano type icon" class="vType-icon"/>
                </div>
                <span class="tab-title">{{ label.type }}</span>
              </span>
            </template>
            <overview-board :index="index" />
          </el-tab-pane>
        </el-tabs>

        <div class="viewMore" @click="goFor">
          <div>View More</div>
          <div><img :src="arrowRight" alt="view more"/></div>
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
    };
  },
  methods: {
    goFor() {
      this.$router.push({ path: '/Volcano', query: { type: this.type } });
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
    //position: relative;
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
  //display: none;
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
      line-height: 166px;
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

.viewMore {
  position: absolute;
  bottom: hCalc(60);
  right: wCalc(120);
  display: flex;
  flex-direction: row;
  column-gap: 10px;
  cursor: pointer;
  z-index: 90;

  color: white;
  font-family: union_regular;
  font-size: 32px;
}
</style>
