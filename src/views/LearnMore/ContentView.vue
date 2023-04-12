<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <div v-for="(graph, index) in graphsList" :key="index" class="item-box">
            <div class="item" @click="goArticle(index)">
              <div class="item-title">{{ graph.title }}</div>
              <div class="item-cover">
                <img :src="graph.image" alt="cover" class="graph_cover" />
              </div>
            </div>
            </div>
</template>

<script>
export default {
  name: 'MenuView',
  props: {
    graphsList: Array,
  },
  emits: ['setIndex'],
  data() {
    return {
    };
  },
  methods: {
    goArticle(index) {
      this.$emit('setIndex', index);
      this.$router.push({ path: '/Article', query: { index } });
    },
  },
};
</script>

<style scoped lang="scss">
.item-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: hCalc(800);
  height: hCalc(500);
  &:nth-child(2n-1) {
    border-right: 1px solid white;
  }
}
.item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto wCalc(50);
  width: calc(100% - wCalc(100));
  height: 100%;
  border-bottom: 1px solid white;
  color: white;
  cursor: pointer;
  .item-title {
    margin-bottom: hCalc(20);
    font-family: union_bold;
    font-size: fSizeCalc(26);
    letter-spacing: fSizeCalc(-0.33);
    text-align: center;
  }
  .item-cover {
    margin-bottom: hCalc(50);
    width: hCalc(500);
    height: hCalc(350);
    background-color: rgb(0, 0, 0);
    .graph_cover {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
