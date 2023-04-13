<template>
  <div id="nav-bar">
    <div class="logo-box" @click="goHome">
      <img :src="Logo" alt="logo" class="logo" />
    </div>
    <div class="menu-box">
      <el-menu class="el-menu-demo" mode="horizontal" router
               background-color="transparent"
               text-color="white"
               active-text-color="white"
      >
        <el-menu-item index="1" :route="{ path: '/' }">Home</el-menu-item>
        <el-menu-item index="2" :route="{ path: '/overview'}">Overview</el-menu-item>
        <el-sub-menu index="3" :teleported="false">
          <template #title>Volcanoes</template>
          <el-menu-item index="3-1" :route="{ path: '/Volcano/Stratovolcano' }">Stratovolcano</el-menu-item>
          <el-menu-item index="3-2" :route="{ path: '/Volcano/Shield' }">Shield</el-menu-item>
          <el-menu-item index="3-3" :route="{ path: '/Volcano/Caldera' }">Caldera</el-menu-item>
          <el-menu-item index="3-4" :route="{ path: '/Volcano/Pyroclastic%20cone' }">Pyroclastic cone</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="4" :route="{ path: '/LearnMore' }">Learn More</el-menu-item>
        <div class="el-menu-item" index="5"><a href="" target="_blank" :style="{ 'text-decoration': 'none'}">Report</a></div>
      </el-menu>
    </div>

    <div class="mobile-menu">
      <div class="icon-menu-box" @click="triggerMobileMenu">
        <img :src="IconMenu" alt="menu" class="icon-menu"/>
      </div>

      <div class="mobile-menu__menu" v-show="isShowMobileMenu">
        <div style="margin: 0 16px">
          <div class="router-box about">
            <router-link :to="{ path: '/' }" class="router-title" @click.prevent="isShowMobileMenu = false">Home</router-link>
          </div>

          <div class="router-box about">
            <router-link :to="{ path: '/overview' }" class="router-title" @click.prevent="isShowMobileMenu = false">Overview</router-link>
          </div>

          <div class="router-box about">
            <div class="router-title showcase">Volcanoes</div>

            <div class="subtitle-box">
              <div class="router-box">
                <router-link :to="{ path: '/Volcano/Stratovolcano' }" class="router-subtitle" @click.prevent="isShowMobileMenu = false">Stratovolcano</router-link>
              </div>
              <div class="router-box">
                <router-link :to="{ path: '/Volcano/Shield' }" class="router-subtitle" @click.prevent="isShowMobileMenu = false">Shield</router-link>
              </div>
              <div class="router-box">
                <router-link :to="{ path: '/Volcano/Caldera' }" class="router-subtitle" @click.prevent="isShowMobileMenu = false">Caldera</router-link>
              </div>
              <div class="router-box">
                <router-link :to="{ path: '/Volcano/Pyroclastic%20cone' }" class="router-subtitle" @click.prevent="isShowMobileMenu = false">Pyroclastic cone</router-link>
              </div>
            </div>
          </div>

          <div class="router-box about">
            <router-link :to="{ path: '/LearnMore' }" class="router-title" @click.prevent="isShowMobileMenu = false">Learn More</router-link>
          </div>

          <div class="router-box about">
            <a href="" target="_blank" class="router-title">Report</a>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '@/assets/Welcome/Logo.svg';
import IconMenu from '@/assets/Nav/icon-menu.svg';

const preD = function (e) {
  e.preventDefault();
};

export default {
  name: 'NavBar',
  data() {
    return {
      Logo: Logo,
      IconMenu: IconMenu,
      isShowMobileMenu: false,
    };
  },
  methods: {
    goHome() {
      this.$router.push('/');
    },
    triggerMobileMenu() {
      this.isShowMobileMenu = !this.isShowMobileMenu;
    },
  },
  watch: {
    // 监听弹出框状态，控制是否禁止页面滑动
    isShowMobileMenu(flag) {
      if (flag) {
        document.body.style.overflow = 'hidden';
        document.addEventListener('touchmove', preD, { passive: false }); // 禁止页面滑动
      } else {
        document.body.style.overflow = ''; // 出现滚动条
        document.removeEventListener('touchmove', preD, { passive: false });
      }
    },

  },
};
</script>

<style scoped lang="scss">
#nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100% - 2*wCalc(122));
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: hCalc(43) wCalc(122);
  z-index: 888;
}

.logo-box {
  //width: hCalc(60);
  height: hCalc(70);
  cursor: pointer;
  .logo {
    width: 100%;
    height: 100%;
  }
}

.menu-box {
  width: wCalc(810);
  .el-menu-demo {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    border-bottom: unset;
    font-family: union_regular;
    --el-menu-item-font-size: fSizeCalc(22);
    letter-spacing: fSizeCalc(-0.28);
  }
}

::v-deep .el-sub-menu__title {
  font-size: fSizeCalc(22) !important;
  border-radius: 12px;
  border-bottom-color: transparent !important;
  &:hover {
    background-color: rgb(191, 95, 64) !important;
  }
}

.el-menu--popup {
  .el-menu-item {
    border-radius: 0;
    font-family: union_regular;
    font-size: fSizeCalc(22);
    text-decoration: underline;
    text-align: center;
  }
}

.el-menu-item {
  font-size: fSizeCalc(22);
  border-radius: 12px;
  &:hover {
    background-color: RGB(191, 95, 64) !important;
  }
  &.is-active {
    background-color: unset !important;
    border-bottom: unset !important;
    &:hover {
      background-color: RGB(191, 95, 64) !important;
    }
  }
}

::v-deep .el-popper {
  border-width: 2px;
  border-radius: 12px;
  border-color: RGB(191, 95, 64) !important;
  background: rgba(0, 0, 0, 0.7) !important;
}

::v-deep .el-menu--horizontal {
  border-bottom: unset !important;
}

.mobile-menu {
  display: none;
  .mobile-menu__menu {
    z-index: -1;
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    margin-top: hCalc(-41);
    margin-left: wCalc(-122);
    padding-top: hCalcM(130);
    background: rgb(191, 95, 64);
    .router-box {
      &.about {
        margin-bottom: hCalcM(40);
      }
      margin-bottom: hCalcM(4);
    }
    .router-title {
      font-family: Helvetica;
      font-size: fSizeCalc(28);
      font-weight: 400;
      line-height: fSizeCalc(28);
      color: white;
      text-decoration: none;
      &.showcase {
        margin-bottom: hCalcM(16);;
      }
    }
    .subtitle-box {
      display: flex;
      flex-direction: column;
    }
    .router-subtitle {
      font-family: Helvetica Light;
      font-size: fSizeCalc(18);
      font-weight: 400;
      line-height: fSizeCalc(28);
      color: white;
      text-decoration: none;
    }
    .social-media-box {
      position: absolute;
      bottom: hCalcM(62);
      .link {
        margin-bottom: hCalcM(7);
      }

    }
    .social-media-link {
      font-family: Helvetica;
      font-size: fSizeCalc(21);
      line-height: fSizeCalc(28);
      margin-bottom: hCalcM(20);
    }
    a {
      font-family: Helvetica Light;
      font-size: fSizeCalc(16);
      font-weight: 400;
      line-height: fSizeCalc(20);
      letter-spacing: fSizeCalc(-0.44);
      color: white;
      text-decoration: none;
    }
  }
}

// mobile
@media screen and (max-width: 414px) {
  .menu-box {
    display: none;
  }

  .mobile-menu {
    display: block;
  }

  ::v-deep .el-popper {
    &.is-light {
      background-color: transparent !important;
    }
  }

  ::v-deep .el-sub-menu__title {
    font-size: fSizeCalc(16) !important;
  }

  .el-menu--popup {
    .el-menu-item {
      font-size: fSizeCalc(16);
    }
  }

  .el-menu-item {
    font-size: fSizeCalc(16);
  }
}
</style>
