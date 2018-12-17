import http from "./http";

let result = null;

// let jsonURL = "https://orait.oss-cn-hangzhou.aliyuncs.com";

async function getartList() {
  //获得文章列表
  await http.get("/news/pn").then(res => {
    result = res.data;
  });
  return result;
}
async function getartItem(id) {
  //查看单条新闻
  await http.get("/news/pn?id=" + id).then(res => {
    result = res.data;
  });
  return result;
}
async function rankData() {
  //新闻top10
  await http.get("/news/rang").then(res => {
    result = res.data;
  });
  return result;
}

export { getartList, getartItem, rankData };
