<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <div class="sideBoard">
    <div class="search-bar">
      <el-input v-model="vName4search"
                class="volcano-search"
                placeholder="Enter the name of the volcano you are interested in"
                :prefix-icon="Search"
                @change="searchVolcano"
      />
    </div>

    <el-scrollbar class="scroll-viewer">
      <div class="cards_grid">
        <div v-for="(v, index) in volcano_json" :key="index" class="brief_card"
             @click="debounceMethods(setVolcano, index, 2000)">
          <div class="v_pic-box">
            <img :src="'https://volcano.si.edu/'+v['img_link']" alt="volcano image" class="v_pic"/>
          </div>
          <div class="v_name">{{ v.volcano_name }}</div>
        </div>
      </div>
    </el-scrollbar>

    <div class="my-pagination">
      <el-pagination v-model:current-page="currentPage" layout="prev, pager, next" :total="totalNum" :page-size="10"/>
    </div>

    <div class="arrow-box">
      <div class="arrow"></div>
    </div>
  </div>
</template>

<script>
import { searchVolcano } from '@/api/data';
import { Search } from '@element-plus/icons-vue';

export default {
  name: 'SideBoard',
  props: {
    totalNum: Number,
    volcano_json: Array,
    type: String,
  },
  data() {
    return {
      vName4search: '',
      Search: Search,
      currentPage: 1,
    };
  },
  methods: {
    setVolcano(index) {
      this.$emit('setVolcano', index);
      this.$message({
        message: 'Success!',
        type: 'success',
        center: true,
      });
    },
    async searchVolcano() {
      const name = this.vName4search;
      await searchVolcano(name)
        .then(() => {
          this.$message(
            {
              message: 'Results found',
              type: 'success',
              center: true,
            },
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  watch: {
    currentPage(newPage) {
      this.$emit('updatePage', newPage);
    },
  },
};
</script>

<style scoped lang="scss">
.sideBoard {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: wCalc(704);
  height: 10px;
  background-color: rgb(143, 143, 143);
  transition: all .3s ease-out;
  color: white;
  .arrow-box {
    display: block !important;
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 70px;
    height: 20px;
    background-color: rgb(143, 143, 143);
    border-radius: 4px 4px 0 0;
  }
  .arrow {
    position: absolute;
    top: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border: 10px solid rgb(219, 219, 219);
    border-color: transparent transparent rgb(219, 219, 219) transparent ;
    transition: all .3s ease-out;
  }
  .search-bar {
    margin-top: hCalc(47);
    display: none;
    width: 70%;
    justify-content: center;
    align-items: center;
    font-family: Roboto-Black;
    font-size: 48px;
  }
  .cards_grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
    align-items: center;
    grid-row-gap: 36px;
    grid-column-gap: 36px;
  }
  .brief_card {
    display: none;
    cursor: pointer;
    height: 206px;
    border-bottom: 1px solid white;
    .v_pic-box {
      width: 240px;
      height: 136px;
      background-color: rgb(0, 0, 0);
      &:active {
        border: 5px solid black;
      }
      .v_pic {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .v_name {
      margin-top: 13px;
      font-family: union_regular;
      font-size: 16px;
      line-height: 31px;
      text-align: start;
    }
  }

  & > div {
    display: none;
  }

  &:hover {
    height: hCalc(800);
    .arrow {
      border-color: rgb(219, 219, 219) transparent transparent transparent;
    }

    .type, .brief_card {
      display: block;
    }
    & > div {
      display: block;
    }
  }
  ::v-deep .el-scrollbar__bar {
    right: 10px;
    --el-scrollbar-bg-color: white;
  }
}

.scroll-viewer {
  margin-top: 40px;
  height: hCalc(610);
}

.my-pagination {
  margin: 20px 0;
  ::v-deep .el-pagination {
    --el-pagination-hover-color: rgb(191, 64, 95) !important;
    --el-pagination-button-disabled-bg-color: transparent !important;
    --el-pagination-bg-color: transparent !important;
  }
}

@media screen and (max-width: 1650px) {
  .sideBoard {
    .cards_grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
