import axios from "axios";
let result = null;

async function get_token(username, password) {
  await axios
    .post("http://22h8h80849.iask.in/token/get-token", {
      username: username,
      password: password
    })
    .then(res => {
      result = res.data;
    });
  return result;
}
export { get_token };
