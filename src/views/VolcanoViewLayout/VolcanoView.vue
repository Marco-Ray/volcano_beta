<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <div>
    <div class="volcano">
      <div class="container">
        <div class="back" @click="goBack">
          <div><img :src="iconBack" alt="go back" class="icon-back" /></div>
          <div>Back</div>
        </div>
        <div class="session-l">
          <div class="vType">
            <div class="tag-box">
              <img :src="iconTag" alt="type" class="tag">
            </div>
            <span style="border-bottom: 1px solid white;
            text-transform: uppercase">
              {{ type }}
            </span>
          </div>
          <div class="vName">{{ current_volcano.volcano_name }}</div>
          <el-scrollbar>
            <div class="vDescription">{{ current_volcano.Description }}</div>
          </el-scrollbar>
          <div class="location" v-if="LatLng.lat && LatLng.lng">
            <l-map
              ref="map" v-model:zoom="zoom"
                   :center="LatLng">
              <l-tile-layer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                layer-type="base"
                name="OpenStreetMap"
              ></l-tile-layer>
              <l-marker :lat-lng="LatLng" ></l-marker>
            </l-map>
          </div>
        </div>
        <div class="session-r">
          <div class="vPhoto_box">
            <img :src="current_volcano.image" alt="volcano photo" class="vPhoto"/>
          </div>
          <div class="tool-bar">
            <div class="like">
              <div v-if="!liked"
                class="like-box" @click="debounceMethods(likeVolcano, current_volcano.id, 2000)">
                <el-popover
                  placement="top-start"
                  :width="200"
                  trigger="hover"
                  content="Think useful? Give it a like!"
                  popper-class="useful-popper"
                >
                  <template #reference>
                    <img :src="iconUsefulInactive" alt="like" class="like-icon" />
                  </template>
                </el-popover>
              </div>
              <div v-else
                class="like-box"  @click="debounceMethods(dislikeVolcano, current_volcano.id, 2000)">
                <img :src="iconUseful" alt="liked" class="like-icon" />
              </div>
              <div class="like-num">{{ current_volcano.likes }}</div>
            </div>
            <div class="report" @click="dialogVisible=true">
              <img :src="iconReport" alt="report" class="icon-report"/>
            </div>
          </div>
        </div>
      </div>

      <side-board class="side_board" :volcano_json="volcano_json" :type="type"
                  @setVolcano="setVolcano" />
    </div>

    <el-dialog v-model="dialogVisible" align-center width="40%">
      <template #header="{ titleId, titleClass }">
        <div class="my-header">
          <div :id="titleId" :class="titleClass">
            <div class="dialog-title">
              <div class="icon-error-box">
                <img :src="iconError" alt="error" class="icon-error" />
              </div>
              <span>Report Error</span>
            </div>
          </div>
        </div>
      </template>
      <el-form :model="form" :label-position="'top'" :rules="rules" status-icon>
        <el-form-item label="Volcano Name" prop="vName">
          <el-input v-model="form.vName" autocomplete="off" maxlength="50" />
        </el-form-item>
        <el-form-item label="Error Description" prop="eDesc">
          <el-input v-model="form.eDesc" type="textarea" autocomplete="off" :rows="5"  maxlength="200" show-word-limit />
        </el-form-item>
        <el-form-item label="Your email address" prop="email">
          <el-input v-model="form.email" autocomplete="off" maxlength="50" />
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="submitForm">
          Confirm
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import IconBack from '@/assets/Volcano/icon-back.png';
import IconTag from '@/assets/Volcano/icon-tag.png';
import IconUseful from '@/assets/Volcano/useful-active.png';
import IconUsefulInactive from '@/assets/Volcano/useful-inactive.png';
import IconReport from '@/assets/Volcano/icon-report.png';
import IconError from '@/assets/Volcano/icon-error.png';
import { getVolcano, likeVolcano, dislikeVolcano, submitForm } from '@/api/data';
import SideBoard from '@/components/Volcanoes/SideBoard.vue';
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'VolcanoView',
  components: {
    SideBoard,
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      iconBack: IconBack,
      iconTag: IconTag,
      iconUseful: IconUseful,
      iconUsefulInactive: IconUsefulInactive,
      iconReport: IconReport,
      iconError: IconError,
      current_volcano: {},
      volcano_json: [],
      type: this.$route.params.type,
      liked: false,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      zoom: 8,
      LatLng: {},
      dialogVisible: false,
      form: {
        vName: '',
        eDesc: '',
        email: '',
      },
      rules: {
        vName: [{ required: true, message: 'Please input Volcano\'s name', trigger: 'blur' }],
        eDesc: [{ required: true, trigger: 'blur' }],
        email: [{ required: true, trigger: 'blur' }],
      },
    };
  },
  methods: {
    goBack() {
      this.$router.push('/overview');
    },
    async getVolcano(type) {
      await getVolcano(type)
        .then((res) => {
          if (res.data) {
            this.volcano_json = res.data;
            // eslint-disable-next-line
            this.current_volcano = res.data[0];
            this.LatLng.lat = parseFloat(this.current_volcano.latitude);
            this.LatLng.lng = parseFloat(this.current_volcano.longitude);
          } else {
            this.volcano_json = [];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setVolcano(index) {
      this.current_volcano = this.volcano_json[index];
      this.liked = false;
      this.LatLng = {};
      this.LatLng.lat = parseFloat(this.current_volcano.latitude);
      this.LatLng.lng = parseFloat(this.current_volcano.longitude);
    },
    async likeVolcano(index) {
      await likeVolcano(index)
        .then((res) => {
          // eslint-disable-next-line
          this.current_volcano['likes'] = res.data.likes;
          this.liked = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async dislikeVolcano(index) {
      await dislikeVolcano(index)
        .then((res) => {
          // eslint-disable-next-line
          this.current_volcano['likes'] = res.data.likes;
          this.liked = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async submitForm() {
      this.dialogVisible = false;
      const formData = new FormData();
      Object.keys(this.form).forEach((key) => {
        formData.append(key, this.form[key]);
      });
      console.log(formData.get('vName'));
      await submitForm(formData)
        .then((res) => {
          this.$message({
            message: res.data.description,
            type: 'success',
            center: true,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getVolcano(this.type);
  },
  watch: {
    // 监听路由是否变化
    '$route' (to, from) {
      if(to.query.type != from.query.type){
        this.type = to.query.type; // 把最新id赋值给定义在data中的id
        this.$router.go(0); // 重新调用加载数据方法
      }
    },
  },
};
</script>

<style scoped lang="scss">
.volcano {
  backdrop-filter: blur(14px);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: end;
  .container {
    position: relative;
    width: calc(100% - wCalc(244));
    height: calc(100% - hCalc(150));
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    column-gap: 92px;
  }
}

.back {
  position: absolute;
  top: 0;
  left: hCalc(-36);
  display: flex;
  column-gap: 10px;
  cursor: pointer;

  font-family: union_regular;
  font-size: fSizeCalc(28);
  color: white;
  z-index: 90;
  .icon-back {
    width: hCalc(25);
    height: hCalc(24);
  }
}

.session-l {
  position: relative;
  margin-top: hCalc(79);
  width: wCalc(704);
  height: calc(100% - hCalc(79));
  color: white;
  text-align: start;
  .vType {
    position: absolute;
    top: hCalc(-79);
    right: 0;
    display: flex;
    column-gap: 18px;
    font-family: Roboto-Black;
    font-size: fSizeCalc(32);
    line-height: fSizeCalc(43);
    .tag-box {
      width: hCalc(43);
      height: hCalc(43);
    }
    .tag {
      width: 100%;
      height: 100%;
    }
  }
  .vName {
    width: 100%;
    //height: 60px;
    font-family: Roboto-Black;
    font-size: fSizeCalc(48);
  }
  ::v-deep .el-scrollbar{
    height: hCalc(150);
    min-height: hCalc(100);
    margin: hCalc(28) 0 hCalc(73) 0;
  }
  .vDescription {
    padding-bottom: hCalc(15);
    width: 100%;
    font-family: union_regular;
    font-size: hCalc(20);
    line-height: hCalc(31);
  }
  .location {
    width: 100%;
    height: hCalc(339);
    display: flex;
    flex-direction: column;
    margin-top: hCalc(34);
  }
}

.session-r {
  width: wCalc(866);
  height: 100%;
  .vPhoto_box {
    width: 100%;
    height: hCalc(729);
    background-color: #000;
    .vPhoto {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .tool-bar {
    display: flex;
    flex-direction: row;
    column-gap: hCalc(10);
    .like {
      margin-top: hCalc(10);
      display: flex;
      column-gap: hCalc(10);
      .like-box {
        width: hCalc(27);
        height: hCalc(27);
        cursor: pointer;
        .like-icon {
          width: 100%;
          height: 100%;
        }
      }
      .like-num {
        font-family: union_regular;
        font-size: fSizeCalc(16);
        line-height: fSizeCalc(27);
        color: white;
      }
    }
    .report {
      margin-top: hCalc(10);
      width: hCalc(30);
      height: hCalc(30);
      cursor: pointer;
      .icon-report {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.side_board {
  position: absolute;
  bottom: 0;
  left: wCalc(121);
  z-index: 99;
}

.leaflet-container {
  z-index: 90;
}

::v-deep .el-dialog {
  border-radius: 20px;
  .my-header {
    .dialog-title {
      display: flex;
      flex-direction: row;
      font-family: Roboto-Black;
      font-size: fSizeCalc(38);
      line-height: hCalc(55);
      letter-spacing: fSizeCalc(-0.48);
      text-align: center;
      .icon-error-box {
        width: hCalc(55);
        height: hCalc(55);
        .icon-error {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .el-dialog__headerbtn {
    top: 10px !important;
    right: 10px !important;
    width: hCalc(40) !important;
    height: hCalc(40) !important;
    .el-dialog__close {
      width: 100% !important;
      height: 100% !important;
      svg {
        width: 100% !important;
        height: 100% !important;
      }
    }
    &:hover {
      --el-color-primary: rgb(191, 95, 64) !important;
    }
  }
  .el-form-item {
    .el-form-item__label {
      font-family: union_regular;
      font-size: fSizeCalc(22);
    }
    .el-form-item__content {
      //width: 100%;
    }
  }
  .el-input, .el-textarea {
    --el-border-color: #484849 !important;
    --el-border-color-hover: #484849 !important;
    --el-color-primary: #484849 !important;
  }
}

@media screen and (max-width: 1400px) {
  .session-l {
    .vType {
      position: unset;
      margin-bottom: hCalc(20);
    }
  }
}

//@media screen and (max-width: 1000px) {
//  .volcano {
//    .container {
//      flex-direction: column;
//      justify-content: center;
//      align-items: center;
//    }
//  }
//}
</style>