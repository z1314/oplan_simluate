import http from "./http";

let result = null;

// let jsonURL = "https://orait.oss-cn-hangzhou.aliyuncs.com";

async function getEnergyGdp() {
  //获得电价列表
  await http.get("/pdn/ele-info").then(res => {
    result = res.data;
  });
  return result;
}

export { getEnergyGdp };
