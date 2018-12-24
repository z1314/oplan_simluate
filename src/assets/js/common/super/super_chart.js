import echarts from "echarts";
import { chartTheme } from "../theme";
export default class SuperChart {
  constructor() {
    this.chart = null;
    this.option = null;
    this.originalData = null;
  }
  init(config) {
    this.chart = echarts.init(document.getElementById(config.id));
    if (config.axis == 1) {
      this.monaxialOptions(config);
    } else {
      this.biaxOptions(config);
    }
  }
  resize() {
    this.chart.resize();
  }
  //单轴调用
  monaxialOptions(config) {
    this.option = {
      color: chartTheme.chartColor,
      title: {
        text: config.title,
        top: "2%",
        left: "42%",
        textStyle: {
          color: "#000000"
        }
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          animation: false,
          label: {
            backgroundColor: "#505765"
          }
        }
      },
      legend: {
        textStyle: {
          color: "#000000"
        },
        bottom: "4%",
        selected: {}
      },
      grid: {
        left: "8%",
        right: "8%",
        top: "15%",
        bottom: "18%"
      },
      textStyle: {
        color: "#000000"
      },
      xAxis: [
        {
          type: "category",
          show: config.xAxis[0].show,
          name: config.xAxis[0].name,
          gridIndex: 0,
          nameTextStyle: {
            // padding: 10
          },
          axisLine: {
            lineStyle: {
              color: "#000000"
            }
          },
          triggerEvent: true,
          splitLine: {
            //去掉网格线
            show: false
          },
          data: []
        }
      ],
      yAxis: [
        {
          type: "value",
          show: config.yAxis[0].show,
          name: config.yAxis[0].name,
          gridIndex: 0,
          nameTextStyle: {
            color: "#000000"
          },
          axisLine: {
            lineStyle: {
              color: "#000000"
            }
          },
          splitLine: {
            //去掉网格线
            show: false
          }
        }
      ],
      dataZoom: [
        {
          //区域缩放
          type: "inside", //内置坐标轴内，不显示拖动条
          show: true,
          start: 0,
          end: 100,
          // xAxisIndex: [0, 1],
          orient: "horizontal"
        }
      ],
      series: []
    };
  }
  //双轴调用
  biaxOptions(config) {
    this.option = {
      color: chartTheme.chartColor,
      animation: false,
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          animation: false,
          label: {
            backgroundColor: "#505765"
          }
        }
      },
      axisPointer: {
        link: { xAxisIndex: "all" },
        label: {
          backgroundColor: "#777"
        }
      },
      legend: {
        textStyle: {
          color: "#000000"
        },
        top: "0",
        right: "5%",
        data: [],
        selected: {}
      },
      grid: [
        {
          top: "10%",
          bottom: "40%",
          left: "8%",
          right: "5%",
          height: "55%"
        },
        {
          top: "65%",
          bottom: 0,
          left: "8%",
          right: "5%",
          height: "28%"
        }
      ],
      textStyle: {
        color: "#000000"
      },
      xAxis: [
        {
          type: "category",
          show: config.xAxis[0].show,
          name: config.xAxis[0].name,
          gridIndex: 0,
          nameTextStyle: {
            padding: 10
          },
          axisLine: {
            lineStyle: {
              color: "#000000"
            }
          },
          triggerEvent: true,
          splitLine: {
            //去掉网格线
            show: false
          },
          data: []
        },
        {
          type: "category",
          show: config.xAxis[1].show,
          name: config.xAxis[1].name,
          gridIndex: 1,
          nameTextStyle: {
            padding: 10
          },
          axisLine: {
            lineStyle: {
              color: "#000000"
            }
          },
          triggerEvent: true,
          splitLine: {
            //去掉网格线
            show: false
          },
          data: []
        }
      ],
      yAxis: [
        {
          type: "value",
          show: config.yAxis[0].show,
          name: config.yAxis[0].name,
          gridIndex: 0,
          nameTextStyle: {
            color: "#000000"
          },
          nameLocation: "center",
          nameGap: 50,
          axisLine: {
            lineStyle: {
              color: "#000000"
            }
          },
          splitLine: {
            //去掉网格线
            show: false
          }
        },
        {
          type: "value",
          show: config.yAxis[1].show,
          name: config.yAxis[1].name,
          gridIndex: 1,
          nameTextStyle: {
            color: "#000000"
          },
          nameLocation: "center",
          nameGap: 50,
          axisLine: {
            lineStyle: {
              color: "#000000"
            }
          },
          splitLine: {
            //去掉网格线
            show: false
          }
        }
      ],
      dataZoom: [
        {
          //区域缩放
          type: "inside", //内置坐标轴内，不显示拖动条
          show: true,
          start: 0,
          end: 10,
          xAxisIndex: [0, 1],
          orient: "horizontal"
        }
      ],
      series: []
    };
  }

  themeFn(theme) {
    this.option.textStyle.color = theme;
    this.option.legend.textStyle.color = theme;
    this.option.xAxis.forEach(val => {
      val.axisLine.lineStyle.color = theme;
      val.nameTextStyle.color = theme;
    });
    this.option.yAxis.forEach(val => {
      val.axisLine.lineStyle.color = theme;
      val.nameTextStyle.color = theme;
    });
  }
  changeTheme(theme) {
    let light = chartTheme.axisColor[0];
    let dark = chartTheme.axisColor[1];
    if (theme === "dark") {
      this.themeFn(dark);
    } else if (theme === "light") {
      this.themeFn(light);
    }
    this.chart.setOption(this.option);
  }
}
