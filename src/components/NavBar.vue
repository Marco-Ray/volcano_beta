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
               @select="setActiveRouter"
      >
        <el-menu-item index="1" :route="{ path: '/' }">Home</el-menu-item>
        <el-menu-item index="2" :route="{ path: '/overview'}">Overview</el-menu-item>
        <el-sub-menu index="3" :teleported="false">
          <template #title>Volcanoes</template>
          <el-menu-item index="3-1" :route="{ path: '/Volcano/Stratovolcano' }">Stratovolcano</el-menu-item>
          <el-menu-item index="3-2" :route="{ path: '/Volcano/Shield' }">Shield</el-menu-item>
          <el-menu-item index="3-3" :route="{ path: '/Volcano/Caldera' }">Caldera</el-menu-item>
          <el-menu-item index="3-4" :route="{ path: '/Volcano/Pyroclastic+cone' }">Pyroclastic cone</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="4">Learn More</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import Logo from '@/assets/Welcome/Logo.png';

export default {
  name: 'NavBar',
  data() {
    return {
      Logo: Logo,
    };
  },
  methods: {
    goHome() {
      this.$router.push('/');
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
  z-index: 999;
}

.logo-box {
  width: hCalc(60);
  height: hCalc(60);
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
  background: transparent !important;
}

::v-deep .el-menu--horizontal {
  border-bottom: unset !important;
}
</style>
