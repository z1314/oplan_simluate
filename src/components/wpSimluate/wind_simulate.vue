<template>
  <div class="wind" id="wind">
    <div class="content_body">
      <div class="content_body_top">
        <!-- <div class="content_body_div">导入数据后可查看图表</div> -->
        <outputKline></outputKline>
      </div>

      <div class="content_body_bottom">
        <div class="content_body_b_div" v-show="tableData == null">
          <p class="content_body_b_font">请导入风电数据</p>
          <i class="iconfont icon-tianjia"></i>
        </div>
        <div class="table-wrap" v-show="tableData != null">
          <oraitTable :tableData="tableData" v-on:getdetailData="getdetailData"></oraitTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import outputKline from "../../components/common/outputKline";
import oraitTable from "../../components/common/oraitTable";
import { get_tableData } from "../../assets/service/wpSimluateService.js";
export default {
  data() {
    return {
      tableData: null
    }
  },
  methods: {
    zoom_click() {},
    //表点击后触发
		getdetailData(val) {
			console.log(val)
		}
  },
  mounted() {
    this.$nextTick(function(){
      get_tableData().then(res => {
        let result = JSON.parse(res);
        if (result.err_code == 0) {
          this.tableData = result.data;
        }
      });
    });
  },
  components: {
    outputKline,
    oraitTable
  }
};
</script>

<style scoped lang="scss">
.wind {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: column;
  .content_body {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 1);
    display: flex;
    flex-direction: column;
    .content_body_top {
      width: 100%;
      height: 50%;
    }
    .content_body_bottom {
      width: 100%;
      height: 49%;
      position: relative;
      .content_body_b_div {
        width: 150px;
        height: 150px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -75px;
        margin-left: -75px;
        .content_body_b_font {
          color: #cbc1bd;
          font-size: 20px;
          font-family: Source Han Sans CN;
        }
        .icon-tianjia {
          font-size: 32px;
          color: orange;
          position: absolute;
          top: 40px;
          left: 50px;
        }
      }
      //表格栏
      .table-wrap {
        width: 100%;
        height: 100%;
        padding: 0 20px;
        box-sizing: border-box;
      }
    }
  }
}
</style>
