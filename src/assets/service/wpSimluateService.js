import http from "./http";

let result = null;

async function get_tableData() {
  await http.get("http://192.168.31.20:5000/20181219141226208").then(res => {
    result = res.data;
  });
  return result;
}

async function set_tableData(y, x, val) {
  await http
    .post("http://192.168.31.20:5000/20181219141226208", {
      y: y,
      x: x,
      value: val
    })
    .then(res => {
      result = res.data;
    });
  return result;
}

export {
  //负荷数据
  get_tableData,
  set_tableData
};
