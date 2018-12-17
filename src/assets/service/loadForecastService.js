import http from "./http";

let result = null;

let jsonURL = "https://orait.oss-cn-hangzhou.aliyuncs.com";

//-------------------------------------------负荷数据------------------------------------------------------------
async function totalProject(labelindex, number) {
  //展示所有用户数据
  if (labelindex == undefined && number == undefined) {
    await http.get("/load_prediction/totalproject").then(res => {
      result = res.data.data;
    });
  } else {
    await http
      .get(
        "/load_prediction/totalproject?category_no=" +
          labelindex +
          "&no=" +
          number
      )
      .then(res => {
        result = res.data.data;
      });
  }
  return result;
}
async function oneProject(cons_no) {
  //展示单个用户数据
  await http.get("/load_prediction/oneproject?cons_no=" + cons_no).then(res => {
    result = res.data.data;
  });
  return result;
}
async function getCategory(number) {
  //展示单个用户数据
  await http.get("/load_prediction/category?id=" + number).then(res => {
    result = res.data.data;
  });
  return result;
}
//-------------------------------------------负荷管理------------------------------------------------------------
async function loadManage() {
  //表格接口
  await http.get("/load_prediction/load_manages").then(res => {
    result = res.data.data;
  });
  return result;
}

//-------------------------------------------负荷分类------------------------------------------------------------

async function indeustryClassify(val) {
  //行业分类
  await http.get("/load_prediction/industry?number=" + val).then(res => {
    result = res.data.data;
  });
  return result;
}
async function classifyTable(val) {
  //分类的表格
  await http
    .get("/load_prediction/user_day_info_static?industry_no=" + val)
    .then(res => {
      result = res.data.data;
    });
  return result;
}
async function loadClassify() {
  await http
    .get(jsonURL + "/oplanStatic/testData/loadClassify.json")
    .then(res => {
      result = res.data;
    });
  return result;
}

async function loadSum(val) {
  //负荷加总
  await http
    .get("/load_prediction/industry_total_info?industry_no=" + val)
    .then(res => {
      result = res.data;
    });
  return result;
}

async function loadcompanyLine(val) {
  //单个公司负荷曲线
  await http
    .get("/load_prediction/user_day_info?industry_no=" + val)
    .then(res => {
      result = res.data;
    });
  return result;
}

//负荷分析

async function companyInfo() {
  //公司信息
  await http.get("/load_prediction/totalproject").then(res => {
    result = res.data.data;
  });
  return result;
}

async function loadAnalysisInfo(val) {
  //时序分析的信息
  await http.get("/timeseries/userinfolist?cons_no=" + val).then(res => {
    result = res.data.data;
  });
  return result;
}

async function usePowerInfo(val) {
  //用电分解的信息
  await http
    .get("/electricitydecomposition/electricalappliances?cons_no=" + val)
    .then(res => {
      result = res.data.data;
    });
  return result;
}

async function AnalysisTradeInfo() {
  //行业分析的信息
  await http.get("/category/info").then(res => {
    result = res.data.data;
  });
  return result;
}

async function stealPowerInfo(val) {
  //窃电分析的信息
  await http.get("/electriclarceny/userinfolist?cons_no=" + val).then(res => {
    result = res.data.data;
  });
  return result;
}

async function AnalysisregionInfo() {
  //地域分析的信息
  await http.get("/category/area").then(res => {
    result = res.data.data;
  });
  return result;
}

//-------------------------------------------负荷预测------------------------------------------------------------

async function sliceTimeOutput(cons_no, start_date, end_date) {
  //预测曲线
  await http
    .get(
      `/pfs/wind-pro-simulate-fen?windfarm_id=${cons_no}&start_date=${start_date}&end_date=${end_date}`
    )
    .then(res => {
      result = res.data;
    });
  return result;
}

async function loadManyDaySeries() {
  //负荷预测多日连续的信息
  await http
    .get(jsonURL + "/oplanStatic/testData/3dayJsonSample.json")
    .then(res => {
      result = res.data;
    });
  return result;
}

async function seriesline(cons_no, dayNum, start_date, end_date) {
  //基准曲线
  if (dayNum == 0) {
    //历史数据
    await http
      .get(
        `/pfs/wind-old-simulate-fen?windfarm_id=${cons_no}&start_date=${start_date}&end_date=${end_date}`
      )
      .then(res => {
        result = res.data;
      });
  } else {
    //模拟数据
    await http
      .get(
        `/pfs/wind-pro-simulate-fen?windfarm_id=${cons_no}&num=${dayNum}&start_date=${start_date}&end_date=${end_date}`
      )
      .then(res => {
        result = res.data; //结果不是数组
      });
  }
  return result;
}

// async function seriesdayChoose(cons_no, num) {  //多日连续直接选择天数
//     await http.get("/timeseries/timesharingnumber?cons_no=" + cons_no + "&number=" + num).then(res => {
//         result = res.data;
//     })
//     return result;
// }

async function dayK(cons_no, start_date, end_date, number) {
  //日K
  if (number == 0) {
    //历史数据
    await http
      .get(
        `/pfs/wind-old-simulate-kday?windfarm_id=${cons_no}&start_date=${start_date}&end_date=${end_date}`
      )
      .then(res => {
        result = res.data;
      });
  } else {
    //模拟数据
    await http
      .get(
        `/pfs/wind-pro-simulate-kday?windfarm_id=${cons_no}&start_date=${start_date}&end_date=${end_date}`
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
    await http
      .get(
        `/pfs/wind-old-simulate-kweek?windfarm_id=${cons_no}&start_date=${start_date}&end_date=${end_date}`
      )
      .then(res => {
        result = res.data;
      });
    return result;
  } else {
    await http
      .get(
        `/pfs/wind-pro-simulate-kweek?windfarm_id=${cons_no}&start_date=${start_date}&end_date=${end_date}`
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
    await http
      .get(`/pfs/wind-old-simulate-kmonth?windfarm_id=${cons_no}`)
      .then(res => {
        result = res.data;
      });
    return result;
  } else {
    await http
      .get(
        `/pfs/wind-pro-simulate-kmonth?windfarm_id=${cons_no}&start_date=${start_date}&end_date=${end_date}`
      )
      .then(res => {
        result = res.data;
      });
    return result;
  }
}

export {
  //负荷数据
  totalProject,
  oneProject,
  getCategory,
  loadManage,
  indeustryClassify,
  loadClassify,
  classifyTable,
  loadAnalysisInfo,
  AnalysisTradeInfo,
  AnalysisregionInfo,
  companyInfo,
  usePowerInfo,
  stealPowerInfo,
  loadManyDaySeries,
  loadSum,
  sliceTimeOutput,
  seriesline,
  dayK,
  weekK,
  monthK,
  loadcompanyLine
};
