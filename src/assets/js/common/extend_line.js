import SuperChart from "./super/super_chart"
import {
    chartTheme
} from "./theme"
export default class ExtendLine extends SuperChart {
    constructor() {
        super();
        this.xAxisData = [];
        this.seriesData = [];
        this.seriesData2 = [];
        this.xAxisData2 = [];
        this.seriesAvg = [];
        this.config = {
            id: "",
            axis:1, //几条轴线
            showType: "", //k线图里暂无属性
            title: "",
            chartType: [], //chart的类型
            xAxis: [{
                    show: false,
                    name: "时间"
                },
                {
                    show: true,
                    name: "时间"
                }
            ],
            yAxis: [{
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
        }
        // this.config = {
        //     id: "",
        //     axis: 1, //几条轴线
        //     showType: "", //多日叠加："overlay"，多日连续："continuous",默认："default"
        //     title: "",
        //     chartType: [], //chart的类型
        //     xAxis: {
        //         show: true,
        //         name: "时间"
        //     },
        //     yAxis: {
        //         show: true,
        //         name: ["出力（MW）", "千瓦(KW)"]
        //     },
        //     barWidth:"",
        //     stack:"",
        //     data: null,
        //     theme: null
        // }
    }
    //线图双轴
    line_biax(chartData) {
        //需要将数组清空，否则下次执行会在原来数据的基础上继续添加 
        this.xAxisData = [];
        this.seriesData = [];
        this.seriesForecast = [];
        this.seriesAvg = [];
        let length = null;
        if (chartData.forecastYA) {
            length = chartData.forecastYA.length;
        } else {
            length = chartData.yAxis.length;
        }
        if (chartData.yAxis) { //多日连续
            for (let i = 0; i < length; i++) {
                this.xAxisData = this.xAxisData.concat(chartData.xAxis);
                this.seriesData = this.seriesData.concat(chartData.yAxis[i]);
                this.seriesAvg = this.seriesAvg.concat(chartData.yAxisMa7[i]);
                if (chartData.forecastYA) {
                    this.seriesForecast = this.seriesForecast.concat(chartData.forecastYA[i]);
                }
            }
        } else { //分时
            for (let i = 0; i < length; i++) {
                this.xAxisData = this.xAxisData.concat(chartData.xAxis);
                this.seriesForecast = this.seriesForecast.concat(chartData.forecastYA[i]);
            }
        }
        this.option.series.push({
            name: '实际曲线',
            type: 'line',
            symbol: "none",
            lineStyle: {
                normal: {
                    width: 2,
                    color: chartTheme.chartColor[0]
                }
            },
            data: this.seriesData,
            smooth: true
        }, {
            name: '模拟曲线',
            type: 'line',
            symbol: "none",
            lineStyle: {
                normal: {
                    type: "dotted",
                    width: 2,
                    color: chartTheme.chartColor[1]
                }
            },
            data: this.seriesForecast,
            smooth: true
        }, {
            name: 'MA7',
            type: 'line',
            symbol: "none",
            lineStyle: {
                normal: {
                    width: 2,
                    color: chartTheme.chartColor[2]
                }
            },
            data: this.seriesAvg,
            smooth: true
        }, {
            type: 'bar',
            yAxisIndex: 1,
            xAxisIndex: 1,
            itemStyle: {
                color: "rgba(36,133,194,0.5)"
            },
            data: this.seriesData.concat(this.seriesForecast.slice(this.seriesData.length, this.seriesForecast.length))
        })
        this.option.legend.data.push("实际曲线", "模拟曲线", "MA7")
        this.option.legend.selected['MA7'] = false
        this.option.xAxis[0].data = this.xAxisData;
        this.option.xAxis[1].data = this.xAxisData;
    }
    //多日叠加
    line_overlay(chartData) {
        let count = 0;
        let length = null;
        if (chartData.forecastYA) {
            length = chartData.forecastYA.length
        } else {
            length = chartData.yAxis.length
        }
        for (let i = 0; i < length; i++) {
            this.option.series.push({
                    name: '实际曲线',
                    type: 'line',
                    symbol: "none",
                    lineStyle: {
                        width: 1,
                        color: chartTheme.chartColor[0]
                    },
                    data: [],
                    smooth: true
                }, {
                    name: '模拟曲线',
                    type: 'line',
                    symbol: "none",
                    lineStyle: {
                        width: 1,
                        color: chartTheme.chartColor[1]
                    },
                    data: [],
                    smooth: true
                },

                {
                    name: 'MA7',
                    type: 'line',
                    symbol: "none",
                    lineStyle: {
                        width: 1,
                        color: chartTheme.chartColor[2]
                    },
                    data: [],
                    smooth: true
                }
            )
            this.option.series[count].data = chartData.yAxis[i];
            if (chartData.forecastYA) {
                this.option.series[count + 1].data = chartData.forecastYA[i];
            }
            this.option.series[count + 2].data = chartData.yAxisMa7[i];
            count = count + 3;
        }
        this.option.legend.data.push("实际曲线", "模拟曲线", "MA7")
        this.option.legend.selected['MA7'] = false
        this.option.xAxis[0].data = chartData.xAxis;
        this.option.xAxis[1].data = chartData.xAxis;
    }
    //线图或柱状图单轴
    line_monaxial(config) {
        config.data.data.forEach((val, index) => {
            this.option.series.push({
                name: val.name,
                type: config.chartType[index], //todo 这块需要chartType
                itemStyle: {
                    color: chartTheme.chartColor[index]
                },
                barWidth: config.barWidth,
                stack: config.stack,
                smooth:true,
                data: val.value
            })
        })
        this.option.xAxis[0].data = config.data.xAxis;
    }

    chartBar(config) {
        this.option.series.push({
            type: config.chartType[0], //todo 这块需要chartType
            radius: '60%',
            center: ['50%', '50%'],
            data: config.data.data
        })
    }

    showChart(config) {
        if (this.chart != null) {
            this.chart.clear();
        }
        this.init(config);
        if (config.axis == 1) { //进入单轴图表
            switch (config.showType) {
                case "line":
                    this.line_monaxial(config)
                break;
                case "bar":
                    this.line_monaxial(config)
                    break;
                case "line&bar":
                    this.line_monaxial(config)
                    break;
                case 'pie':
                    this.chartBar(config)
                    break;
            }
        } else { //进入双轴图表
            if (config.showType == "continuous") { //多日连续
                this.line_biax(config.data);
            } else if (config.showType == "overlay") { //多日叠加
                this.line_overlay(config.data)
            }
        }
        this.changeTheme(config.theme);
        this.chart.setOption(this.option);
    }
}