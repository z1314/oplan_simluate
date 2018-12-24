<!-- 负荷预测K线图 -->
<template>
  <div class="wrapper">
    <div class="t-control-wrap">
      <div class="t-control-btn1">
        <div class="left-control-wrap">
          <el-date-picker
            v-model="dateValue"
            type="daterange"
            size="small"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            class="control-item-date"
            @change="changeDate"
          >
          </el-date-picker>
          <!-- <div style="width:120px;height:25px;line-height:25px;text-align:center;border:1px solid rgba(228,228,228,1);border-radius:5px;">{{start_date}}</div>
          <div style="width:40px;height:25px;line-height:25px;text-align:center;">至</div>
          <el-date-picker
            v-model="end_date"
            type="date"
            size="mini"
            style="width:120px;height:25px;line-height:25px;"
            placeholder="选择日期"
          >
          </el-date-picker> -->
          <div
            :class="{ 'control-btn': true, 'btn-checked': btn_disabled }"
            @click="startForecast"
            v-show="control_date == 0"
          >
            开始模拟
          </div>
          <div
            :class="{ 'control-btn': true, 'btn-checked': btn_disabled }"
            @click="startForecast"
            v-show="control_date != 0"
          >
            重新模拟
          </div>
        </div>
        <div class="right-control-wrap">
          <el-tooltip class="item" effect="dark" content="保存" placement="top">
            <div class="control-item iconfont icon-baocun"></div>
          </el-tooltip>

          <el-dropdown size="mini" trigger="click" @command="unitCommand">
            <span class="el-dropdown-link">
              <i class="control-item iconfont icon-gongju"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="0">叠加指标</el-dropdown-item>
              <el-dropdown-item command="1">画线工具</el-dropdown-item>
              <el-dropdown-item command="2">查看历史</el-dropdown-item>
              <el-dropdown-item command="3">导出数据</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-tooltip class="item" effect="dark" content="全屏" placement="top">
            <div class="control-item iconfont icon-quanping"></div>
          </el-tooltip>
          <el-dialog title="提示" :visible.sync="showDialog" width="30%">
            <el-date-picker
              v-model="dateValue"
              type="daterange"
              size="small"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              class="control-item-date"
              @change="changeDate"
            >
            </el-date-picker>
            <span slot="footer" class="dialog-footer">
              <el-button @click="showDialog = false">取 消</el-button>
              <el-button type="primary" @click="set_historyTime()"
                >确 定</el-button
              >
            </span>
          </el-dialog>
        </div>
      </div>
      <!-- 控制栏第二行 -->
      <div class="t-control-btn2">
        <div
          @click="showTimeshare(start_date, end_date)"
          :class="{ 'control-item': true, checked: ischecked == 0 }"
        >
          模拟曲线
        </div>
        <el-dropdown
          size="mini"
          trigger="click"
          :class="{ 'control-item': true, checked: ischecked == 1 }"
          @command="showContinuous"
        >
          <span class="el-dropdown-link">
            基准曲线<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="{ index: 3, chooseTime: 0 }"
              >3天</el-dropdown-item
            >
            <el-dropdown-item :command="{ index: 5, chooseTime: 0 }"
              >5天</el-dropdown-item
            >
            <el-dropdown-item :command="{ index: 10, chooseTime: 0 }"
              >10天</el-dropdown-item
            >
            <el-dropdown-item :command="{ index: 20, chooseTime: 0 }"
              >20天</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown
          size="mini"
          trigger="click"
          :class="{ 'control-item': true, checked: ischecked == 2 }"
          @command="showSuperposition"
        >
          <span class="el-dropdown-link">
            基准叠加<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="{ index: 3, chooseTime: 0 }"
              >3天</el-dropdown-item
            >
            <el-dropdown-item :command="{ index: 5, chooseTime: 0 }"
              >5天</el-dropdown-item
            >
            <el-dropdown-item :command="{ index: 10, chooseTime: 0 }"
              >10天</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
        <div
          @click="showDay(1)"
          :class="{ 'control-item': true, checked: ischecked == 3 }"
        >
          日K
        </div>
        <div
          @click="showWeek(1)"
          :class="{ 'control-item': true, checked: ischecked == 4 }"
        >
          周K
        </div>
        <div
          @click="showMonth(1)"
          :class="{ 'control-item': true, checked: ischecked == 5 }"
        >
          月K
        </div>
        <!-- 控制栏第二行右边 -->
        <div class="right-control-wrap">
          <el-dropdown
            size="mini"
            trigger="click"
            class="r-control-item"
            @command="timeCommand"
          >
            <span class="el-dropdown-link">
              时间周期<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="0">15分钟</el-dropdown-item>
              <el-dropdown-item command="1">30分钟</el-dropdown-item>
              <el-dropdown-item command="2">1小时</el-dropdown-item>
              <el-dropdown-item command="2">8小时</el-dropdown-item>
              <el-dropdown-item command="2">1天</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <!-- 控制栏第三行 -->
      <div class="b-control-btn3" v-show="show_powerInfo">
        <div class="control-btn3-item">
          {{ getkline ? getkline.windfarm_name : "暂无用户" }}
        </div>
        <div class="control-btn3-item">
          最大负荷：{{ getkline ? getkline.max_speed : 0 }}KW
        </div>
        <div class="control-btn3-item">
          最小负荷：{{ getkline ? getkline.min_speed : 0 }}MW
        </div>
        <div class="control-btn3-item">
          负荷总量：{{ getkline ? getkline.cut_in_speed : 0 }}MW
        </div>
        <div class="control-btn3-item">
          平均负荷：{{
            getkline ? (getkline.max_speed + getkline.min_speed) / 2 : 0
          }}MW
        </div>
      </div>
      <!-- 控制栏第四行 -->
      <!-- <div class="b-control-btn4">
        <div class="control-btn4-item">出力：11MW</div>
        <div class="control-btn4-item">MA7均线：11.2MW</div>
      </div> -->
    </div>
    <div class="Kline-chart" id="Kline-chart">暂无数据,请选择用户</div>
  </div>
</template>

<script>
import ExtendKline from "../../assets/js/common/extend_kLine.js";
import ExtendLine from "../../assets/js/common/extend_line.js";
import {
  startAnimation,
  chenckTime,
  sliceTimeOutput,
  seriesline,
  dayK,
  weekK,
  monthK
} from "../../assets/service/mainNetworkPalnService.js";
import { changeTheme } from "../../assets/js/common/theme.js";
export default {
  data() {
    return {
      manydayList: ["3天", "5天", "10天"],
      dateValue: null, //模拟时间或者历史时间的选择都传给这个
      start_date: null,
      end_date: null,
      ischecked: 0, //当前选择的按钮
      chooseTime: 0, //选择的是具体天数还是从时间选择框里选择的时间，这里0代表具体天数，1代表从时间选择框里选择时间
      index: 0, //多日连续和多日叠加选择的是哪一天
      loadKline: null, //实例化的对象
      ExtendLine: null, //实例化的对象
      showDialog: false,
      show_powerInfo: false, //显示风电场信息
      control_date: null, //控制开始模拟还是重新模拟
      btn_disabled: false, //开始模拟是否禁用，这个状态以后需要后台提供
      chartExist: false //图表是否已经初始化
    };
  },
  computed: {
    theme() {
      return this.$store.state.module_global.theme;
    },
    getkline() {
      // return this.$store.state.loadForecast.loadKline;
      return {
        cut_in_speed: 555,
        max_speed: 5643,
        min_speed: 254,
        windfarm_id: 3992,
        windfarm_name: "小五台风电场"
      }
    },
    htmlHeight() {
      return this.$store.state.module_global.htmlHeight;
    },
    htmlWidth() {
      return this.$store.state.module_global.htmlWidth;
    }
  },
  watch: {
    htmlHeight() {
      if (this.chartExist) {
        this.loadKline.resize();
      }
    },
    htmlWidth() {
      if (this.chartExist) {
        this.loadKline.resize();
      }
    },
    // 改变数据源时执行
    getkline(val) {
      chenckTime(val.windfarm_id).then(res => {
        this.control_date = res.data.sim;
        if (res.errCode == 0) {
          if (res.data.sim == 0) {
            this.ischecked = 1;
            this.start_date = this.addDate(res.data.real.end_date, -5);
            this.end_date = res.data.real.end_date;
            this.showContinuous({ index: 0, chooseTime: 1 });
            this.chartExist = true;
            this.$notify({
              title: "提示",
              dangerouslyUseHTMLString: true,
              duration: 8000,
              showClose: true,
              offset: 85,
              message: `<p>历史数据范围：<span style="color:rgba(255,119,62,1)">${
                res.data.real.start_date
              } 至 ${res.data.real.end_date}<span></p>`
            });
          } else {
            this.showTimeshare(
              this.addDate(res.data.sim.end_date, -5),
              res.data.sim.end_date
            );
            this.chartExist = true;
            this.start_date = this.addDate(res.data.sim.end_date, -5);
            this.end_date = res.data.sim.end_date;
            this.$notify({
              title: "提示",
              dangerouslyUseHTMLString: true,
              duration: 8000,
              showClose: true,
              offset: 85,
              message: `<p>历史数据范围：<span style="color:rgba(255,119,62,1)">${
                res.data.real.start_date
              } 至 ${res.data.real.end_date}<span></p>
			                        <p>模拟数据范围：<span style="color:rgba(255,119,62,1)">${
                                res.data.sim.start_date
                              } 至 ${res.data.sim.end_date}<span></p>`
            });
          }
        }
      });
    }
  },
  methods: {
    formatDate(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d;
    },
    addDate(date, days) {
      //计算起始日期的前几天或者后几天
      var d = new Date(date);
      d.setDate(d.getDate() + days);
      var month = d.getMonth() + 1;
      var day = d.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      var val = d.getFullYear() + "-" + month + "-" + day;
      return val;
    },
    changeDate() {
      this.start_date = this.formatDate(this.dateValue[0]);
      this.end_date = this.formatDate(this.dateValue[1]);
    },
    //选择历史时间
    set_historyTime() {
      this.showDialog = false;
      //菜单框选择时间传0，时间框进入chooseTime传1
      switch (this.ischecked) {
        case 0:
          //模拟曲线没有历史时间，直接跳到基准曲线
          this.ischecked = 1;
          this.showContinuous({ index: 0, chooseTime: 1 });
          break;
        case 1:
          this.showContinuous({ index: 0, chooseTime: 1 });
          break;
        case 2:
          this.showSuperposition({ index: 0, chooseTime: 1 });
          break;
        case 3:
          this.showDay(0); //1为模拟，0为历史
          break;
        case 4:
          this.showWeek(0);
          break;
        case 5:
          this.showMonth(0);
          break;
      }
    },
    //选择模拟时间，并开始模拟
    startForecast() {
      if (this.dateValue.length !== 0 && this.btn_disabled == false) {
        this.$message({
          message: "开始模拟,请稍等！",
          type: "info"
        });
        this.btn_disabled = true; //开始模拟禁用
        startAnimation(this.getkline.windfarm_id).then(res => {
          if (res.errCode == 0) {
            this.btn_disabled = false; //开始模拟解除禁用
            this.show_powerInfo = true;
            this.showTimeshare(this.start_date, this.end_date);
          }
        });
      } else if (this.dateValue.length == 0) {
        this.$message({
          message: "请选择模拟时间",
          type: "warning"
        });
      } else {
        this.$message({
          message: "模拟正在进行中,请稍后重试！",
          type: "warning"
        });
      }
    },
    showTimeshare(start_date, end_date) {
      //模拟曲线只有模拟时间，不会有历史时间
      this.ischecked = 0; //当前选择的按钮
      sliceTimeOutput(this.getkline.windfarm_id, start_date, end_date).then(
        res => {
          if (res.errCode == 0) {
            this.ExtendLine.config.id = "Kline-chart";
            this.ExtendLine.config.axis = 2;
            this.ExtendLine.config.data = res.data;
            this.ExtendLine.config.showType = "continuous";
            this.ExtendLine.config.theme = this.theme;
            this.ExtendLine.showChart(this.ExtendLine.config);
          }
        }
      );
    },
    showContinuous(command) {
      //多日连续
      this.ischecked = 1; //当前选择的按钮
      this.index = command.index; //当前按钮的对应的天数
      this.chooseTime = command.chooseTime; //选择的是固定天数还是范围天数
      seriesline(
        this.getkline.windfarm_id,
        this.index,
        this.start_date,
        this.end_date
      ).then(res => {
        if (res.errCode == 0) {
          this.ExtendLine.config.id = "Kline-chart";
          this.ExtendLine.config.axis = 2;
          this.ExtendLine.config.data = res.data;
          this.ExtendLine.config.showType = "continuous";
          this.ExtendLine.config.theme = this.theme;
          this.ExtendLine.showChart(this.ExtendLine.config);
        }
      });
    },
    showSuperposition(command) {
      //多日叠加
      this.ischecked = 2; //当前选择的按钮
      this.index = command.index; //当前按钮的对应的天数
      this.chooseTime = command.chooseTime; //选择的是固定天数还是范围天数
      seriesline(
        this.getkline.windfarm_id,
        this.index,
        this.start_date,
        this.end_date
      ).then(res => {
        if (res.errCode == 0) {
          this.ExtendLine.config.id = "Kline-chart";
          this.ExtendLine.config.axis = 2;
          this.ExtendLine.config.data = res.data;
          this.ExtendLine.config.showType = "overlay";
          this.ExtendLine.config.theme = this.theme;
          this.ExtendLine.showChart(this.ExtendLine.config);
        }
      });
    },
    showDay(number) {
      //日K
      this.ischecked = 3; //当前选择的按钮
      dayK(
        this.getkline.windfarm_id,
        this.start_date,
        this.end_date,
        number
      ).then(res => {
        if (res.errCode == 0) {
          this.loadKline.config.id = "Kline-chart";
          this.ExtendLine.config.axis = 2;
          this.loadKline.config.data = res.data;
          this.loadKline.config.theme = this.theme;
          this.loadKline.showChart(this.loadKline.config);
        }
      });
    },
    showWeek(number) {
      //周K
      this.ischecked = 4; //当前选择的按钮
      weekK(
        this.getkline.windfarm_id,
        this.start_date,
        this.end_date,
        number
      ).then(res => {
        if (res.errCode == 0) {
          this.loadKline.config.id = "Kline-chart";
          this.ExtendLine.config.axis = 2;
          this.loadKline.config.data = res.data;
          this.loadKline.config.theme = this.theme;
          this.loadKline.showChart(this.loadKline.config);
        }
      });
    },
    showMonth(number) {
      this.ischecked = 5; //当前选择的按钮
      monthK(
        this.getkline.windfarm_id,
        this.start_date,
        this.end_date,
        number
      ).then(res => {
        if (res.errCode == 0) {
          this.loadKline.config.id = "Kline-chart";
          this.ExtendLine.config.axis = 2;
          this.loadKline.config.data = res.data;
          this.loadKline.config.theme = this.theme;
          this.loadKline.showChart(this.loadKline.config);
        }
      });
    },
    unitCommand(command) {
      switch (command) {
        case "0":
          // this.showDialog = true;
          break;
        case "1":
          // this.showDialog = true;
          break;
        case "2":
          this.showDialog = true;
          break;
      }
    },
    timeCommand() {}
  },
  mounted() {
    this.loadKline = new ExtendKline();
    this.ExtendLine = new ExtendLine();
    changeTheme(this.$store.state.module_global.theme);
  },
  destroyed() {
    this.loadKline = null;
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/Kline.scss";
.btn-checked {
  background: var(--btnColor) !important;
}
.Kline-chart {
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ccd0d6;
}
</style>
