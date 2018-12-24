import http from "./http";
import axios from "axios";
let result = null;

//暂存
let new_http = axios.create({
  //创建axiox实例并配置好全局公用信息
  baseURL: "http://22h8h80849.iask.in", //基础URL
  // timeout: 5000, //超时限制
  headers: {
    //头部信息
    // 'content-type': 'application/json' ,
    // 'Authorization': token
  }
});

//-----------------------------------------------------方案管理------------------------------------------------------------------
async function newPowerOutputMenu() {
  //新建方案下
  await http.get("/oplanStatic/testData/newPowerOutputMenu.json").then(res => {
    result = res.data;
  });
  return result;
}
//-----------------------------------------------------出力模拟------------------------------------------------------------------

async function windPowerAnimation() {
  //风电模拟电厂列表
  await new_http.get("/pfs/info").then(res => {
    result = res.data.data;
  });
  return result;
}

async function chenckTime(id) {
  //点击选中用户列表，检查时间范围
  await new_http.get(`/pfs/check-date?windfarm_id=${id}`).then(res => {
    result = res.data;
  });
  return result;
}

async function startAnimation(id) {
  //开始模拟
  await new_http
    .post("/pfs/data-sim", {
      windfarm_id: id
    })
    .then(res => {
      result = res.data;
    });
  return result;
}
async function sliceTimeOutput(cons_no, start_date, end_date) {
  //模拟曲线
  await new_http
    .get(
      `/pfs/sim-curves?windfarm_id=${cons_no}&start_date=${start_date}&end_date=${end_date}`
    )
    .then(res => {
      result = res.data;
    });
  return result;
}

async function seriesline(cons_no, dayNum, start_date, end_date) {
  //基准曲线
  if (dayNum == 0) {
    //历史数据
    await new_http
      .get(
        `/pfs/datum-curves?windfarm_id=${cons_no}&start_date=${start_date}&end_date=${end_date}&is_real=1`
      )
      .then(res => {
        result = res.data;
      });
  } else {
    //模拟数据
    await new_http
      .get(
        `/pfs/datum-curves?windfarm_id=${cons_no}&num=${dayNum}&start_date=${start_date}&end_date=${end_date}`
      )
      .then(res => {
        result = res.data; //结果不是数组
      });
  }
  return result;
}

async function dayK(cons_no, start_date, end_date, number) {
  //日K
  if (number == 0) {
    //历史数据
    await new_http
      .get(
        `/pfs/dayk?windfarm_id=${cons_no}&start_date=${start_date}&end_date=${end_date}&is_real=1`
      )
      .then(res => {
        result = res.data;
      });
  } else {
    //模拟数据
    await new_http
      .get(
        `/pfs/dayk?windfarm_id=${cons_no}&start_date=${start_date}&end_date=${end_date}`
      )
      .then(res => {
        result = res.data;
      });
  }
  return result;
}

async function weekK(cons_no, start_date, end_date, number) {
  //周K
  if (number == 0) {
    await new_http
      .get(
        `/pfs/week?windfarm_id=${cons_no}&start_date=${start_date}&end_date=${end_date}&is_real=1`
      )
      .then(res => {
        result = res.data;
      });
    return result;
  } else {
    await new_http
      .get(
        `/pfs/week?windfarm_id=${cons_no}&start_date=${start_date}&end_date=${end_date}`
      )
      .then(res => {
        result = res.data;
      });
    return result;
  }
}
async function monthK(cons_no, start_date, end_date, number) {
  //月K
  if (number == 0) {
    await new_http
      .get(
        `/pfs/monthk?windfarm_id=${cons_no}&start_date=${start_date}&end_date=${end_date}&is_real=1`
      )
      .then(res => {
        result = res.data;
      });
    return result;
  } else {
    await new_http
      .get(
        `/pfs/monthk?windfarm_id=${cons_no}&start_date=${start_date}&end_date=${end_date}`
      )
      .then(res => {
        result = res.data;
      });
    return result;
  }
}

//-----------------------------------------------------运行模拟------------------------------------------------------------------
async function netWorkData() {
  //电网潮流图
  await http
    .get("http://192.168.31.52/orait_zero/public/pfs/scheduling")
    .then(res => {
      result = res.data;
    });
  return result;
}

async function getSystemLoadData() {
  //系统负荷
  // await http.get("/pos/system-load").then(res => {
  await http
    .get("http://192.168.31.52/orait_zero/public/pfs/system-load")
    .then(res => {
      result = res.data;
    });
  return result;
}

async function getPowerPlantOutData() {
  //电厂出力
  await new_http.get("/ess/wf-data").then(res => {
    result = res.data;
  });
  return result;
}

async function simulatOutput() {
  //机组运行出力位置
  await new_http.get(`/ess/sys-load`).then(res => {
    result = res.data;
  });
  return result;
}

export {
  //方案管理
  newPowerOutputMenu,
  // 出力模拟
  windPowerAnimation,
  chenckTime,
  startAnimation,
  sliceTimeOutput,
  seriesline,
  // seriesdayChoose,
  dayK,
  weekK,
  monthK,
  //运行模拟
  netWorkData,
  getSystemLoadData,
  getPowerPlantOutData,
  simulatOutput
};
