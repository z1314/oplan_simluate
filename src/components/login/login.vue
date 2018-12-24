<template>
  <div class="login-wrap">
    <div class="login-content">
      <div class="t-wrap">
        <div class="logo-wrap">
          <i class="iconfont icon-ORAIT-logo logo-icon"></i>
          <p class="logo-text">ORAIT云平台</p>
        </div>
      </div>
      <div class="b-wrap">
        <div class="input-item">
          <input
            type="text"
            placeholder="请输入帐号"
            v-model="username"
            @input="verifyFn"
          />
          <div class="verify"><Verify :hint="hint.username"></Verify></div>
        </div>
        <div class="input-item">
          <input type="text" placeholder="请输入密码" v-model="password" />
          <div class="verify"><Verify :hint="hint.password"></Verify></div>
        </div>
        <div class="remember-code">
          <el-checkbox v-model="rememberCode">十天内免登录</el-checkbox>
        </div>
        <button class="login-btn" @click="loginFn">登录</button>
        <div class="service-wrap">
          <p @click="serviceFn(1)">注册帐号</p>
          <p @click="serviceFn(2)">申请产品试用</p>
          <p @click="serviceFn(3)">找回密码</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { changeTheme } from "../../assets/js/common/theme.js";
import verify from "../../components/common/verify";
import { get_token, refresh_token } from "../../assets/service/loginService.js";
export default {
  data() {
    return {
      username: null,
      password: null,
      rememberCode: false,
      hint: {
        username: {
          icon: -1,
          msg: ""
        },
        password: {
          icon: -1,
          msg: ""
        }
      }
    };
  },
  computed: {
    theme() {
      return this.$store.state.module_global.theme;
    }
  },
  watch: {
    theme(val) {
      changeTheme(val);
    }
  },
  methods: {
    changeHeight(val) {
      let styles = this.$el.style;
      styles.setProperty("--WrapH", val + "px");
      styles.setProperty("--DomH", val + "px");
    },
    serviceFn(index) {
      switch (index) {
        case 1: //注册
          this.$router.replace("/register");
          break;
        case 2: //申请试用
          this.$router.replace("/apply");
          break;
        case 3: //找回密码
          this.$router.replace("/forgetPass");
          break;
      }
    },
    // 验证帐号
    verifyFn() {
      if (/^1[34578]\d{9}$/.test(this.username)) {
        this.hint.username.icon = 0;
        this.hint.username.msg = "";
      } else {
        this.hint.username.icon = 1;
        this.hint.username.msg = "请输入正确的手机号";
      }
    },
    //登录
    loginFn() {
      if (this.hint.username.icon == 1) {
        return;
      } else {
        get_token(this.username, this.password, this.rememberCode).then(res => {
          if (res.err_code == 0) {
            localStorage.setItem("userInfo", this.username);
            console.log(this.$store.state.module_global.userInfo);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("refresh_token", res.data.refresh_token);
            window.location.href = "http://localhost:8080/wpSimluate.html";
          } else {
            this.hint.password.icon = 1;
            this.hint.password.msg = "密码错误";
          }
        });
      }
    }
  },
  mounted() {
    let refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken) {
      refresh_token(refreshToken).then(res => {
        if (res.err_code == 0) {
          window.location.href = "http://localhost:8080/wpSimluate.html";
        }
      });
    }
  },
  components: {
    Verify: verify
  }
};
</script>
<style scoped lang="scss">
.login-wrap {
  width: 100%;
  height: 100%;
  background: url("../../../public/img/login/loginBackground.svg");
  background-size: cover;
  background-position-y: 90%;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-content {
    width: 720px;
    height: 600px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 16px rgba(125, 38, 0, 0.16);
    opacity: 1;
    border-radius: 20px;
    .t-wrap {
      width: 100%;
      height: 40%;
      display: flex;
      justify-content: center;
      align-items: center;
      .logo-wrap {
        width: 30%;
        height: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .logo-icon {
          font-size: 88px;
          color: rgba(255, 119, 62, 1);
          margin: 0 auto;
        }
        .logo-text {
          margin: 0 auto;
          font-size: 20px;
          color: rgba(112, 112, 112, 1);
        }
      }
    }
    .b-wrap {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      position: relative;
      .input-item {
        width: 38.89%;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        position: relative;
        &:first-child {
          margin-bottom: 20px;
        }
        input {
          font-size: var(--FtSize_second);
          width: 100%;
          height: 40px;
          border: none;
          outline: none;
          padding-left: 20px;
          box-sizing: border-box;
          border-bottom: 1px solid rgba(255, 197, 127, 1);
          -web-kit-appearance: none;
          -moz-appearance: none;
        }
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          box-shadow: 0 0 0 60px #fff inset;
          -webkit-text-fill-color: #878787;
        }
        .verify {
          position: absolute;
          top: 0%;
          right: -100%;
          width: 100%;
          height: 40px;
          line-height: 40px;
          transition: all 2s;
        }
        .fade-enter-active,
        .fade-leave-active {
          transition: opacity 0.5s;
        }
        .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
          opacity: 0;
        }
      }
      .remember-code {
        width: 100%;
        margin-top: 10px;
        margin-left: 62%;
      }
      .login-btn {
        width: 20%;
        height: 40px;
        border-width: 0px;
        border-radius: 25px;
        margin-top: 39px;
        background: rgba(255, 119, 62, 1);
        outline: none;
        cursor: pointer;
        color: #fff;
        font-size: 15px;
      }
      .service-wrap {
        width: 38.89%;
        margin-top: 38px;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: rgba(112, 112, 112, 1);
        p {
          cursor: pointer;
        }
        p:hover {
          color: rgba(255, 119, 62, 1);
        }
      }
    }
  }
}
</style>
