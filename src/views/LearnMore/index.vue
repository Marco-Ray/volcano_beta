<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <div>
    <div class="learn-more">
      <div class="container">
        <el-scrollbar>
          <router-view
            v-slot="{ Component, route }"
          >
            <transition
              :name="route.meta.transitionName"
            >
              <component
                :is="Component"
                :key="route.path"
                :graphsList="graphsList"
              />
            </transition>
          </router-view>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import { getGraphs } from '@/api/data';

export default {
  name: 'LearnMore',
  data() {
    return {
      graphsList: [],
    };
  },
  methods: {
    async getGraphs() {
      await getGraphs()
        .then((res) => {
          this.graphsList = res.data;
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            message: 'Oops, something goes wrong',
            type: 'error',
            center: true,
          });
        });
    },
  },
  created() {
    this.getGraphs();
  },
};
</script>

<style scoped lang="scss">
.learn-more {
  height: 100vh;
  width: 100vw;
  backdrop-filter: blur(14px);
  display: flex;
  justify-content: center;
  align-items: end;
  .container {
    margin: hCalc(76) wCalc(61);
    width: calc(100vw - wCalc(122));
    height: calc(100% - hCalc(250));
    border-top: 1px solid white;
    overflow: hidden;
    ::v-deep .el-scrollbar {
      width: 100%;
      .el-scrollbar__wrap {
        margin-top: hCalc(20);
      }
      .el-scrollbar__view {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
    }
  }
}
</style>
