<template>
  <div class="register-wrap">
    <div class="register-content">
      <div class="l-wrap"></div>
      <div class="r-wrap">
        <div class="t-wrap">ORAIT云平台账号注册</div>
        <div class="b-wrap">
          <div class="input-item">
            <p>昵称</p>
            <input
              type="text"
              placeholder="请输入昵称"
              v-model="nickname"
              @input="verifyFn('nickname')"
            />
            <div class="verify"><Verify :hint="hint.nickname"></Verify></div>
          </div>
          <div class="input-item">
            <p>密码</p>
            <input
              type="text"
              placeholder="请设置密码"
              v-model="password"
              @input="verifyFn('password')"
            />
            <div class="verify"><Verify :hint="hint.password"></Verify></div>
          </div>
          <div class="input-item">
            <p>手机号码</p>
            <input
              type="text"
              placeholder="请输入手机号"
              v-model="phone"
              @input="verifyFn('phone')"
            />
            <transition name="fade">
              <div class="verify"><Verify :hint="hint.phone"></Verify></div>
            </transition>
          </div>
          <div class="input-item">
            <p>验证码</p>
            <input
              type="text"
              placeholder="请输入验证码"
              v-model="verifyCode"
            />
            <button
              class="validate-btn"
              :disabled="validateDis"
              @click="get_verifyCode"
            >
              获取验证码
            </button>
            <transition name="fade">
              <div class="verify">
                <Verify :hint="hint.verifyCode"></Verify>
              </div>
            </transition>
          </div>
          <div class="input-item">
            <p>企业名称</p>
            <input
              type="text"
              placeholder="请输入企业名称"
              v-model="companyName"
              @input="verifyFn('companyName')"
            />
            <transition name="fade">
              <div class="verify">
                <Verify :hint="hint.companyName"></Verify>
              </div>
            </transition>
          </div>
          <div class="input-item">
            <p>邀请码</p>
            <input
              type="text"
              placeholder="请输入体验邀请码"
              v-model="inviteCode"
            />
            <transition name="fade">
              <div class="verify">
                <Verify :hint="hint.inviteCode"></Verify>
              </div>
            </transition>
          </div>
          <button class="register-btn">注册</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { changeTheme } from "../../assets/js/common/theme.js";
import verify from "../../components/common/verify";
export default {
  data() {
    return {
      nickname: null,
      password: null,
      phone: null,
      verifyCode: null,
      companyName: null,
      inviteCode: null,
      validateDis: true, //禁用验证码按钮
      hint: {
        nickname: {
          icon: -1,
          msg: ""
        },
        password: {
          icon: -1,
          msg: ""
        },
        phone: {
          icon: -1,
          msg: ""
        },
        verifyCode: {
          icon: -1,
          msg: ""
        },
        companyName: {
          icon: -1,
          msg: ""
        },
        inviteCode: {
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
      this.styles.setProperty("--WrapH", val + "px");
      this.styles.setProperty("--DomH", val + "px");
    },
    //获取邀请码
    get_verifyCode() {
      console.log(213);
    },
    //注册
    registerFn() {},
    //验证
    verifyFn(str) {
      switch (str) {
        //验证昵称
        case "nickname":
          if (/^[a-zA-Z\u4e00-\u9fa5]+$/.test(this.nickname)) {
            this.hint.nickname.icon = 0;
            this.hint.nickname.msg = "";
          } else {
            this.hint.nickname.icon = 1;
            this.hint.nickname.msg = "仅支持中英文输入";
          }
          break;
        //验证密码
        case "password":
          if (
            /^(?![^a-zA-Z]+$)(?!\D+$)/.test(this.password) &&
            this.password.length > 6 &&
            this.password.length < 18
          ) {
            this.hint.password.icon = 0;
            this.hint.password.msg = "";
          } else if (!/^(?![^a-zA-Z]+$)(?!\D+$)/.test(this.password)) {
            this.hint.password.icon = 1;
            this.hint.password.msg = "只能包含字母与数字";
          } else {
            this.hint.password.icon = 1;
            this.hint.password.msg = "长度需要在6-18位之间";
          }
          break;
        //验证手机号码
        case "phone":
          if (/^1[34578]\d{9}$/.test(this.phone)) {
            this.hint.phone.icon = 0;
            this.hint.phone.msg = "";
            this.styles.setProperty("--btnColor", "rgba(255, 119, 62, 1)");
            this.validateDis = false;
          } else {
            this.hint.phone.icon = 1;
            this.hint.phone.msg = "请输入正确的手机号";
            this.styles.setProperty("--btnColor", "rgba(203, 193, 189, 1)");
            this.validateDis = true;
          }
          break;
        //验证企业名称
        case "companyName":
          if (/^[a-zA-Z\u4e00-\u9fa5]+$/.test(this.companyName)) {
            this.hint.companyName.icon = 0;
            this.hint.companyName.msg = "";
          } else {
            this.hint.companyName.icon = 1;
            this.hint.companyName.msg = "仅支持中英文输入";
          }
          break;
      }
    }
  },
  mounted() {
    this.styles = this.$el.style;
    this.styles.setProperty("--btnColor", "rgba(203, 193, 189, 1)");
  },
  components: {
    Verify: verify
  }
};
</script>
<style scoped lang="scss">
.register-wrap {
  width: 100%;
  height: 100%;
  // background: url("../../../public/img/login/loginBackground.svg");
  // background-size: cover;
  // background-position-y: 90%;
  // background-repeat: no-repeat;
  background: rgba(201, 196, 194, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  .register-content {
    width: 62.5%;
    height: 63.89%;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 16px rgba(125, 38, 0, 0.16);
    opacity: 1;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    .l-wrap {
      width: 37.5%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background: url("../../../public/img/login/registerBar.svg");
      background-size: cover;
      background-repeat: no-repeat;
      background-position-y: 90%;
    }
    .r-wrap {
      width: 62.5%;
      height: 100%;
      .t-wrap {
        width: 100%;
        height: 25%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        font-weight: 600;
      }
      .b-wrap {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        position: relative;
        .input-item {
          width: 60%;
          display: flex;
          margin-top: 2%;
          display: flex;
          position: relative;
          &:first-child {
            margin-top: 0;
          }
          p {
            width: 25%;
            height: 40px;
            line-height: 40px;
            text-align: right;
            padding-right: 20px;
            font-size: 16px;
          }
          input {
            font-size: 14px;
            width: 60%;
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
            top: 0;
            right: -32%;
            width: 40%;
            height: 40px;
            line-height: 40px;
            transition: all 2s;
            font-size: 12px;
          }
          .fade-enter-active,
          .fade-leave-active {
            transition: opacity 0.5s;
          }
          .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
            opacity: 0;
          }
        }
        .input-item:nth-child(4) {
          input {
            width: 35%;
          }
          .validate-btn {
            width: 80px;
            height: 30px;
            margin-top: 1%;
            border-width: 0px;
            border-radius: 25px;
            background: var(--btnColor);
            outline: none;
            cursor: pointer;
            color: #fff;
            font-size: 12px;
          }
        }
        .remember-code {
          width: 100%;
          margin-left: 40%;
        }
        .register-btn {
          width: 15%;
          height: 35px;
          border-width: 0px;
          border-radius: 25px;
          margin-top: 39px;
          background: rgba(255, 119, 62, 1);
          outline: none;
          cursor: pointer;
          color: #fff;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
