<!-- 负荷管理总页面 -->
<template>
  <div class="oraitTable-wrap">
    <div class="scroll-wrap">
        <div class="iconfont icon-gengshang" style="position:absolute;top:40px;" @click="prePage()"></div>
        <div class="iconfont icon-shang" style="position:absolute;top:60px;" @click="preRow()"></div>
        <div class="iconfont icon-xia" style="position:absolute;bottom:60px;" @click="nextRow()"></div>
        <div class="iconfont icon-gengxia" style="position:absolute;bottom:40px;" @click="nextPage()"></div>
      </div>
    <vue-scroll>
      <div class="data-wrap">
        <div class="table-header" v-if="tableData != null">
          <div class="item-data" v-if="tableData.index">
            <!-- <img src="../../../public/img/wpSimluate/表头.png" alt="" width="100%" height="60px" /> -->
            <canvas style="width:100%;height:60px;" id="myCanvas"></canvas>
          </div>
          <div class="item-data" v-for="item in tableData.header" :key="item">
            <p>{{ item }}</p>
            <!-- 排序 -->
            <!-- <div class="paixun-icon" v-if="item">
              <i
                class="iconfont icon-paixushang"
                @click="orderUp(table_itemName.body_itemName[index], $event)"
              ></i>
              <i
                class="iconfont icon-paixuxia"
                @click="orderDown(table_itemName.body_itemName[index], $event)"
              ></i>
            </div> -->
          </div>
        </div>
        <div class="table-body" v-if="tableData != null">
          <input
            type="text"
            autofocus
            class="table-input"
            v-show="showInput"
            v-model="inputVal"
            @blur="submitInput(0)"
            @keydown="submitInput($event)"
          />
          <div
            :class="{ 'item-wrap': true, checked: nowChecked == index }"
            v-for="(item, index) in tableData.data"
            :key="index"
            @click="getdetailData(item, index)"
          >
            <div class="item-data" v-if="tableData.index">{{ tableData.index[index] }}</div>
            <div
              :class="{'item-data':true,'checked-anomaly':val.status==1,'checked-bad':val.status==2}"
              v-for="(val, valIndex) in item"
              :key="valIndex"
              @dblclick="set_inputVal($event, index, valIndex, val.value)"
            >
              {{ val.value }}
            </div>
          </div>
        </div>
      </div>
    </vue-scroll>
  </div>
</template>
<script>
import { changeTheme } from "../../assets/js/common/theme.js";
import { set_tableData } from "../../assets/service/wpSimluateService.js";
export default {
  props: {
    tableData: {
      //body数据
      type: Object
    }
  },
  data() {
    return {
      nowChecked: 0,
      beforeDom: null,
      inputVal: null,
      showInput: false,
      locationX: null,
      locationY: null
    };
  },
  methods: {
    getdetailData(item, index) {
      this.nowChecked = index;
      this.$emit("getdetailData", item, index);
    },
    set_inputVal(e, y, x, val) {
      let styles = this.$el.style;
      styles.setProperty("--inputTop", e.target.offsetTop + 5 + "px");
      styles.setProperty("--inputLeft", e.target.offsetLeft + "px");
      this.inputVal = val;
      this.showInput = true;
      this.locationX = x;
      this.locationY = y;
    },
    //修改表格的值
    set_tableData() {
      set_tableData(this.locationY, this.locationX, parseInt(this.inputVal)).then(res => {
        let result = JSON.parse(res);
        if (result.err_code == 0) {
          this.tableData.data[this.locationY][this.locationX].value = result.value;
        }
      });
    },
    //提交表格的修改
    submitInput(val) {
      if (val) {
        if (val.keyCode == 13) {
          this.showInput = false;
          this.set_tableData();
        }
      } else {
        this.showInput = false;
        this.set_tableData();
      }
    },
    //升序
    orderUp(arg, e) {
      if (this.beforeDom != null) {
        this.beforeDom.target.style.color = "rgba(208, 208, 208, 1)";
      }
      this.beforeDom = e;
      e.target.style.color = "rgba(255, 139, 97, 1)";
      let val = this.tableData.body_data;
      let temp = [];
      for (let i = 0; i < val.length - 1; i++) {
        for (let j = i + 1; j < val.length; j++) {
          if (val[i][arg] > val[j][arg]) {
            temp = val[i];
            val[i] = val[j];
            val[j] = temp;
          }
        }
      }
      this.tableData.body_data = [];
      this.tableData.body_data = val;
    },
    //降序
    orderDown(arg, e) {
      if (this.beforeDom != null) {
        this.beforeDom.target.style.color = "rgba(208, 208, 208, 1)";
      }
      this.beforeDom = e;
      e.target.style.color = "rgba(255, 139, 97, 1)";
      let val = this.tableData.body_data;
      let temp = [];
      for (let i = 0; i < val.length - 1; i++) {
        for (let j = i + 1; j < val.length; j++) {
          if (val[i][arg] < val[j][arg]) {
            temp = val[i];
            val[i] = val[j];
            val[j] = temp;
          }
        }
      }
      this.tableData.body_data = [];
      this.tableData.body_data = val;
    },
    prePage() {},
    preRow() {},
    nextPage() {},
    nextRow() {},
    line() {
      var myCanvas = document.getElementById("myCanvas");
      var width = myCanvas.width;
      var height = myCanvas.height;
      var ctx = myCanvas.getContext("2d");
      ctx.strokeStyle = "rgba(172, 172, 172, 1)";
      ctx.moveTo(0, 0);
      ctx.lineTo(width, height);
      ctx.stroke();
      ctx.font = "35px SourceHanSansSC-Medium";
      ctx.fillText("时段", width/3 * 1.8, height / 3);
      ctx.fillText("日期", width / 9, height/5 * 4);
    }
  },
  mounted() {
    setTimeout(() => {
      // console.log(this.tableData)
      changeTheme(this.$store.state.module_global.theme);
      let styles = this.$el.style;
      let length = this.tableData.header.length + 1;
      styles.setProperty("--optionWidth", 60 * length + "px");
      this.line();
    }, 200);
  }
};
</script>

<style lang="scss" scoped>
//表格栏
.oraitTable-wrap {
  width: 100%;
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  border: 2px solid rgba(172, 172, 172, 1);
  .scroll-wrap {
    width: 15px;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 99;
    background: #ffffff;
  }
  .data-wrap {
    width: var(--optionWidth);
    .table-header {
      width: 100%;
      height: 60px;
      line-height: 60px;
      display: flex;
      justify-content: space-between;
      font-family: "SourceHanSansSC-Medium";
      font-size: var(--FtSize_second);
      color: var(--titleColor);
      border-bottom: 1px solid rgba(172, 172, 172, 1);
      .item-data {
        width: 60px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-bottom: 1px dashed rgba(172, 172, 172, 1);
        border-right: 1px dashed rgba(172, 172, 172, 1);
        .paixun-icon {
          height: 60%;
          position: relative;
          i {
            width: 20px;
            height: 50%;
            font-size: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgba(208, 208, 208, 1);
          }
        }
      }
      .item-data:first-child {
        width: 100px;
      }
    }
    .table-body {
      height: 100%;
      width: 100%;
      font-size: 12px;
      .table-input {
        width: 60px;
        height: 20px;
        position: absolute;
        top: var(--inputTop);
        left: var(--inputLeft);
        border: 1px solid rgba(255, 139, 97, 1);
      }
      .item-wrap {
        width: 100%;
        height: 30px;
        line-height: 30px;
        display: flex;
        justify-content: space-around;
        font-size: var(--FtSize_three);
        color: var(--titleColor);
        &:hover {
          background-color: var(--hoverColor);
        }
        .item-data {
          width: 60px;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          border-bottom: 1px dashed rgba(172, 172, 172, 1);
          border-right: 1px dashed rgba(172, 172, 172, 1);
        }
        .item-data:first-child {
          width: 100px;
        }
        .checked-anomaly {
          background: rgba(255, 228, 55, 1);
        }
        .checked-bad {
          background: rgba(255, 139, 97, 1);
        }
      }
    }
  }
  .checked {
    background: var(--checkedColor);
  }
}
</style>
