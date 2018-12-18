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
          <input type="text" placeholder="请输入账号" v-model="username" @input="verifyFn" />
          <transition name="fade">
            <div class="verify" v-show="showVerify == 1">
              <Verify :success=1 :inputHint= userHint></Verify>
            </div>
          </transition>
        </div>
        <div class="input-item">
          <input type="text" placeholder="请输入密码" v-model="password" />
          <div class="verify" v-show="showVerify == 2">
            <Verify :success=1 :inputHint= passHint></Verify>
          </div>
        </div>
        <div class="remember-code">
          <el-checkbox v-model="rememberCode">十天内免登陆</el-checkbox>
        </div>
        <button class="login-btn" @click="loginFn">登录</button>
        <div class="service-wrap">
          <p @click="serviceFn(1)">注册账号</p>
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
import { get_token } from "../../assets/service/loginService.js";
export default {
  data() {
    return {
      username: null,
      password: null,
      rememberCode: false,
      showVerify: 0,
      userHint: "手机号有误",
      passHint: "密码有误"
    };
  },
  computed: {
    theme() {
      return this.$store.state.module_Theme.theme;
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
    verifyFn() {
      if (!/^1[34578]\d{9}$/.test(this.username)) {
        this.showVerify = 1;
      } else {
        this.showVerify = -1;
      }
    },
    loginFn() {
      get_token(this.username, this.password).then(res => {
        if (res.errCode == 0) {
          //登录成功
        } else {
          this.showVerify = 2;
        }
      });
    }
  },
  components:{
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
        &:last-child {
          margin-top: 10px;
        }
        input {
          font-size: var(--FtSize_second);
          width: 100%;
          height: 40px;
          border: none;
          outline: none;
          text-align: center;
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
          top: 0;
          right: -42%;
          width: 40%;
          height: 40px;
          line-height: 40px;
          transition: all 2s;
        }
        .fade-enter-active, .fade-leave-active {
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
