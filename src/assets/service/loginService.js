import axios from "axios";
let result = null;

let baseURL = "http://192.168.31.52/orait_zero_n/public";

async function get_token(username, password, rememberCode) {
  await axios
    .post(baseURL + "/token/get-token", {
      username: username,
      password: password,
      is_remember_code: rememberCode
    })
    .then(res => {
      result = res.data;
    });
  return result;
}

async function refresh_token(refresh_token) {
  await axios
    .post(baseURL + "/token/refresh-token", {
      refresh_token: refresh_token
    })
    .then(res => {
      result = res.data;
    });
  return result;
}
async function get_TestNum(trial_name, trial_phone_number, trial_company_name) {
  await axios
    .post(baseURL + "/app/trial", {
      trial_name: trial_name,
      trial_phone_number: trial_phone_number,
      trial_company_name: trial_company_name
    })
    .then(res => {
      result = res.data;
    });
  return result;
}
export { get_token, refresh_token, get_TestNum };
