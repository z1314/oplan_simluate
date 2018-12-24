//K线

import SuperChart from "./super/super_chart";
import { chartTheme } from "./theme";
export default class ExtendKline extends SuperChart {
  constructor() {
    super();
    this.xAxisData = [];
    this.seriesData = [];
    this.seriesData2 = [];
    this.xAxisData2 = [];
    this.seriesAvg = [];
    this.config = {
      id: "",
      axis: 1, //几条轴线
      showType: "", //k线图里暂无属性
      title: "",
      chartType: [], //chart的类型
      xAxis: [
        {
          show: false,
          name: "时间"
        },
        {
          show: true,
          name: "时间"
        }
      ],
      yAxis: [
        {
          show: true,
          name: "出力（MW）"
        },
        {
          show: true,
          name: "千瓦(KW)"
        }
      ],
      barWidth: "",
      stack: "",
      data: null,
      theme: null
    };
  }
  //双轴通用函数
  fnKline(chartData) {
    this.option.series = [];
    var upColor = ["#2485C2", "#F08B3F"];
    var upBorderColor = ["#2485C2", "#F08B3F"];
    var downColor = ["#2485C2", "#F08B3F"];
    var downBorderColor = ["#2485C2", "#F08B3F"];
    this.option.series.push(
      {
        name: "模拟K线",
        type: "candlestick",
        data: chartData.forecastYA,
        yAxisIndex: 0,
        xAxisIndex: 0,
        itemStyle: {
          normal: {
            color: upColor[1],
            color0: downColor[1],
            borderColor: upBorderColor[1],
            borderColor0: downBorderColor[1]
          }
        }
      },
      {
        name: "实际K线",
        type: "candlestick",
        data: chartData.yAxis,
        yAxisIndex: 0,
        xAxisIndex: 0,
        itemStyle: {
          normal: {
            color: upColor[0],
            color0: downColor[0],
            borderColor: upBorderColor[0],
            borderColor0: downBorderColor[0]
          }
        }
      },
      {
        name: "MA7",
        type: "line",
        symbol: "none",
        yAxisIndex: 0,
        xAxisIndex: 0,
        itemStyle: {
          color: chartTheme.axisColor[2]
        },
        data: chartData.yAxisMa7,
        smooth: true
      },
      {
        type: "bar",
        yAxisIndex: 1,
        xAxisIndex: 1,
        itemStyle: {
          color: "rgba(36,133,194,0.5)"
        },
        data: chartData.yElectricity
      }
    );
    this.option.legend.data.push("实际K线", "模拟K线", "MA7");
    this.option.legend.selected["MA7"] = false;
    this.option.xAxis[0].data = chartData.xAxis;
    this.option.xAxis[1].data = chartData.xAxis;
    this.chart.setOption(this.option, true);
  }

  showChart(config) {
    this.init(config);
    this.fnKline(config.data);
    this.changeTheme(config.theme);
    this.chart.setOption(this.option);
  }
}
