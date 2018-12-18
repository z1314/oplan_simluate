import echarts from "echarts";
import "echarts/dist/extension/bmap.min.js"
import {netWorkData} from "../server/mainNetworkPalnService"
export default class EchartMap {
    constructor() {
        this.originalData = null;
        this.chart = null;
        this.num = 0.3;
        this.lineData = [];
        this.line_500Data = [];
        this.line_220Data = [];
        this.line_800Data = [];
        this.point_101Data = [];
        this.point_102Data = [];
        this.point_103Data = []; //500kv变电站
        this.point_104Data = [];
        this.point_105Data = [];
        this.point_106Data = [];
        this.point_107Data = [];
        this.point_108Data = [];
        this.point_109Data = [];
        this.point_110Data = [];
        this.point_111Data = [];
        this.point_112Data = [];
        this.point_113Data = [];
        this.point_1000Data = [];
    }
    init(divId) {
        this.chart = echarts.init(document.getElementById(divId));
        this.initChartOption();
    }
    resize() {
        this.chart.resize();
    }
    async showChart() {
        let res = await netWorkData();
        if (res.errCode == 0) {
            this.originalData = res.data;
            this.analyzeData();
        } else {
            console.log(res.msg)
        }
        this.chart.setOption(this.option);
    }
    analyzeData(){
        for (let item of this.originalData) {
            //通过各种判断剥离出点坐标
            switch (item.from_station_type_id) {
                case 103:
                    this.point_103Data.push({
                        name: item[0].fromName,
                        value: item[0].coords[0]
                    });
                    break;
                case 105:
                    this.point_105Data.push({
                        name: item[0].fromName,
                        value: item[0].coords[0]
                    });
                    break;
                case 108:
                    this.point_108Data.push({
                        name: item[0].fromName,
                        value: item[0].coords[0]
                    });
                    break;
                case 109:
                    this.point_109Data.push({
                        name: item[0].fromName,
                        value: item[0].coords[0]
                    });
                    break;
            }
            switch (item.to_station_type_id) {
                case 103:
                    this.point_103Data.push({
                        name: item[0].toName,
                        value: item[0].coords[1]
                    });
                    break;
                case 105:
                    this.point_105Data.push({
                        name: item[0].toName,
                        value: item[0].coords[1]
                    });
                    break;
                case 108:
                    this.point_108Data.push({
                        name: item[0].toName,
                        value: item[0].coords[1]
                    });
                    break;
                case 109:
                    this.point_109Data.push({
                        name: item[0].toName,
                        value: item[0].coords[1]
                    });
                    break;
            }
            //通过各种判断剥离出线坐标
            for (let index in item) { //index为item的每个键名
                if (index.indexOf("_type") == -1 && index.includes('number') == false) {
                    if (item.line_number == 1) {
                        this.lineData.push(item[index]);
                    } else if (index.includes('0') == false) {
                        this.lineData.push(item[index]);
                    }

                }
                switch (item.line_type_id) {
                    case 4: //确定是500kv
                        if (index.indexOf("_type") == -1 && index.includes('number') == false) {
                            if (item.line_number == 1) {
                                this.line_500Data.push(item[index]);
                            } else if (index.includes('0') == false) {
                                this.line_500Data.push(item[index]);
                            }
                        }
                        break;
                    case 8:
                        if (index.indexOf("_type") == -1 && index.includes('number') == false) {
                            if (item.line_number == 1) {
                                this.line_220Data.push(item[index]);
                            } else if (index.includes('0') == false) {
                                this.line_220Data.push(item[index]);
                            }
                        }
                        break;
                    case 22:
                        if (index.indexOf("_type") == -1 && index.includes('number') == false) {
                            if (item.line_number == 1) {
                                this.line_800Data.push(item[index]);
                            } else if (index.includes('0') == false) {
                                this.line_800Data.push(item[index]);
                            }
                        }
                        break;
                }
            }
        }
    }
    startChart() {
        this.option.series[0].effect.show = true;
        this.chart.setOption(this.option);
    }
    stopChart() {
        this.option.series[0].effect.show = false;
        this.chart.setOption(this.option);
    }
    initChartOption() {
        // 得到的数据结构：{fromName: "大同", toName: "高石", coords: Array(2)}
        this.option = {
            bmap: {
                center: [112.528557, 37.752578],
                zoom: 8,
                roam: false,
                mapStyle: {
                    'styleJson': [{
                            'featureType': 'water',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#031628'
                            }
                        },
                        {
                            'featureType': 'land',
                            'elementType': 'geometry',
                            'stylers': {
                                'color': '#000102'
                            }
                        },
                        {
                            'featureType': 'highway',
                            'elementType': 'all',
                            'stylers': {
                                'visibility': 'off'
                            }
                        },
                        {
                            'featureType': 'arterial',
                            'elementType': 'geometry.fill',
                            'stylers': {
                                'color': '#000000'
                            }
                        },
                        {
                            'featureType': 'arterial',
                            'elementType': 'geometry.stroke',
                            'stylers': {
                                'color': '#0b3d51'
                            }
                        },
                        {
                            'featureType': 'local',
                            'elementType': 'geometry',
                            'stylers': {
                                'color': '#000000'
                            }
                        },
                        {
                            'featureType': 'railway',
                            'elementType': 'geometry.fill',
                            'stylers': {
                                'color': '#000000'
                            }
                        },
                        {
                            'featureType': 'railway',
                            'elementType': 'geometry.stroke',
                            'stylers': {
                                'color': '#08304b'
                            }
                        },
                        {
                            'featureType': 'subway',
                            'elementType': 'geometry',
                            'stylers': {
                                'lightness': -70
                            }
                        },
                        {
                            'featureType': 'building',
                            'elementType': 'geometry.fill',
                            'stylers': {
                                'color': '#000000'
                            }
                        },
                        {
                            'featureType': 'all',
                            'elementType': 'labels.text.fill',
                            'stylers': {
                                'color': '#857f7f'
                            }
                        },
                        {
                            'featureType': 'all',
                            'elementType': 'labels.text.stroke',
                            'stylers': {
                                'color': '#000000'
                            }
                        },
                        {
                            'featureType': 'building',
                            'elementType': 'geometry',
                            'stylers': {
                                'color': '#022338'
                            }
                        },
                        {
                            'featureType': 'green',
                            'elementType': 'geometry',
                            'stylers': {
                                'color': '#062032'
                            }
                        },
                        {
                            'featureType': 'boundary',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#465b6c'
                            }
                        },
                        {
                            'featureType': 'manmade',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#022338'
                            }
                        },
                        {
                            'featureType': 'label',
                            'elementType': 'all',
                            'stylers': {
                                'visibility': 'off'
                            }
                        }
                    ]
                }
            },
            title: {
                text: "山西电网规划图",
            },
            tooltip: {
                trigger: "item"
            },
            legend: {
                orient: "vertical",
                top: "bottom",
                left: "right",
                data: [],
                textStyle: {
                    color: "#fff"
                },
                selectedMode: "single"
            },
            series: [
                // 小球阴影
                {
                    // name: item[0] + " 电网规划图",
                    type: "lines",
                    coordinateSystem: 'bmap',
                    polyline: true,
                    zlevel: 1,
                    effect: {
                        show: true,
                        period: 6,
                        trailLength: 0.1,
                        color: "#fff",
                        symbolSize: 1.5
                    },
                    lineStyle: {
                        normal: {
                            color: "#35BBC0",
                            width: 0,
                            curveness: 0
                        }
                    },
                    data: this.lineData
                },

                //小球和线条
                {
                    // name: item[0] + " 电网规划图",
                    type: "lines",
                    coordinateSystem: 'bmap',
                    polyline: true,
                    zlevel: 3,
                    effect: {
                        show: false,
                        period: 6,
                        trailLength: 0,
                        symbolSize: 1.3
                    },
                    lineStyle: {
                        normal: {
                            color: "#D67A4F",
                            width: 0.5,
                            opacity: 1,
                            curveness: 0
                        }
                    },
                    data: this.line_220Data
                },
                {
                    // name: item[0] + " 电网规划图",
                    type: "lines",
                    coordinateSystem: 'bmap',
                    polyline: true,
                    zlevel: 3,
                    effect: {
                        show: false,
                        period: 6,
                        trailLength: 0,
                        symbolSize: 1.3
                    },
                    lineStyle: {
                        normal: {
                            color: "#199AC1",
                            width: 0.5,
                            opacity: 1,
                            curveness: 0
                        }
                    },
                    data: this.line_500Data
                },
                {
                    // name: item[0] + " 电网规划图",
                    type: "lines",
                    coordinateSystem: 'bmap',
                    polyline: true,
                    zlevel: 3,
                    effect: {
                        show: false,
                        period: 6,
                        trailLength: 0,
                        symbolSize: 1.3
                    },
                    lineStyle: {
                        normal: {
                            color: "#EB000E",
                            width: 0.5,
                            opacity: 1,
                            curveness: 0
                        }
                    },
                    data: this.line_800Data
                },


                //拐角icon
                {
                    type: "scatter",
                    symbol: "image://http://image.orait.cn/oplanStatic/img/mainNetPlan/runAnimation/500kv变电站.svg",
                    coordinateSystem: "bmap",
                    zlevel: 2,
                    rippleEffect: {
                        show: false,
                        brushType: "stroke"
                    },
                    label: {
                        normal: {
                            show: false,
                            position: "right",
                            formatter: "{b}"
                        }
                    },
                    symbolSize: 10,
                    itemStyle: {
                        normal: {
                            show: false,
                        }
                    },
                    data: this.point_103Data
                },
                {
                    type: "scatter",
                    symbol: "image://http://image.orait.cn/oplanStatic/img/mainNetPlan/runAnimation/220kv变电站.svg",
                    coordinateSystem: "bmap",
                    zlevel: 2,
                    rippleEffect: {
                        show: false,
                        brushType: "stroke"
                    },
                    label: {
                        normal: {
                            show: false,
                            position: "right",
                            formatter: "{b}"
                        }
                    },
                    symbolSize: 10,
                    itemStyle: {
                        normal: {
                            show: false,
                        }
                    },
                    data: this.point_105Data
                },
                {
                    type: "scatter",
                    symbol: "image://http://image.orait.cn/oplanStatic/img/mainNetPlan/runAnimation/风电场.svg",
                    coordinateSystem: "bmap",
                    zlevel: 2,
                    rippleEffect: {
                        show: false,
                        brushType: "stroke"
                    },
                    label: {
                        normal: {
                            show: false,
                            position: "right",
                            formatter: "{b}"
                        }
                    },
                    symbolSize: 10,
                    itemStyle: {
                        normal: {
                            show: false,
                        }
                    },
                    data: this.point_108Data
                },
                {
                    type: "scatter",
                    symbol: "image://http://image.orait.cn/oplanStatic/img/mainNetPlan/runAnimation/火电站.svg",
                    coordinateSystem: "bmap",
                    zlevel: 2,
                    rippleEffect: {
                        show: false,
                        brushType: "stroke"
                    },
                    label: {
                        normal: {
                            show: false,
                            position: "right",
                            formatter: "{b}"
                        }
                    },
                    symbolSize: 10,
                    itemStyle: {
                        normal: {
                            show: false,
                        }
                    },
                    data: this.point_109Data
                }
            ]
        }
        this.chart.setOption(this.option);
        var bmap = this.chart.getModel().getComponent('bmap').getBMap();
        bmap.addControl(new BMap.MapTypeControl());
    }

}