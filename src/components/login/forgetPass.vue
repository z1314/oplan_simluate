<template>
  <div class="apply-wrap">
    <div class="apply-content">
      <div class="l-wrap"></div>
      <div class="r-wrap">
        <div class="t-wrap">重置登录密码</div>
        <div class="m-wrap">
          <div class="progress-item">
            <i
              :class="{
                iconfont: true,
                'icon-zhengque1': progress.userHint == true,
                'icon-wait': progress.userHint == false
              }"
            ></i>
            <p>账号验证</p>
          </div>
          <div class="line"></div>
          <div class="progress-item">
            <i
              :class="{
                iconfont: true,
                'icon-zhengque1': progress.resetPass == true,
                'icon-wait': progress.resetPass == false
              }"
            ></i>
            <p>重置密码</p>
          </div>
          <div class="line"></div>
          <div class="progress-item">
            <i
              :class="{
                iconfont: true,
                'icon-zhengque1': progress.resetSuccess == true,
                'icon-wait': progress.resetSuccess == false
              }"
            ></i>
            <p>重置成功</p>
          </div>
        </div>
        <div class="b-wrap">
          <div class="userHint" v-show="progressFlag == 0">
            <div class="input-item">
              <p>手机号码</p>
              <input
                type="text"
                placeholder="请输入手机号码"
                v-model="phone"
                @input="verifyFn"
              />
              <div class="verify"><Verify :hint="hint.phone"></Verify></div>
            </div>
            <div class="input-item">
              <p>验证码</p>
              <input
                type="text"
                placeholder="请输入验证码"
                v-model="password"
              />
              <button
                class="validate-btn"
                :disabled="validateDis"
                @click="get_verifyCode"
              >
                {{ btnText }}
              </button>
            </div>
            <button class="apply-btn" @click="userHintFn">下一步</button>
          </div>
          <div class="resetPass" v-show="progressFlag == 1">
            <div class="input-item">
              <p>新密码</p>
              <input
                type="text"
                placeholder="请输入新密码"
                v-model="username"
              />
            </div>
            <div class="input-item">
              <p>确认密码</p>
              <input type="text" placeholder="请确认密码" v-model="password" />
            </div>
            <button class="apply-btn" @click="resetPassFn">下一步</button>
          </div>
          <div class="resetSuccess" v-show="progressFlag == 2">
            <p>设置成功，请牢记新密码</p>
            <button class="apply-btn" @click="resetSuccessFn">完成</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { changeTheme } from "../../assets/js/common/theme.js";
import verify from "../../components/common/verify.vue";
export default {
  data() {
    return {
      username: null,
      password: null,
      phone: null,
      progress: {
        userHint: true,
        resetPass: false,
        resetSuccess: false
      },
      validateDis: true, //禁用验证码
      btnText: "获取验证码",
      styles: null,
      progressFlag: 0,
      hint: {
        nickname: {
          icon: -1,
          msg: ""
        },
        phone: {
          icon: -1,
          msg: ""
        },
        company_name: {
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
    //获取验证码
    get_verifyCode() {
      this.styles.setProperty("--btnColor", "rgba(203, 193, 189, 1)");
      this.validateDis = true;
      let i = 60;
      let setInter = setInterval(() => {
        if (i != 0) {
          i = i - 1;
          this.btnText = `${i}s后重发`;
        } else {
          this.styles.setProperty("--btnColor", "rgba(255, 119, 62, 1)");
          this.validateDis = false;
          this.btnText = "获取验证码";
          clearInterval(setInter);
        }
      }, 1000);
    },
    //帐号验证
    userHintFn() {
      this.progressFlag = 1;
      this.progress.resetPass = true;
    },
    //重置密码
    resetPassFn() {
      this.progressFlag = 2;
      this.progress.resetSuccess = true;
    },
    resetSuccessFn() {
      this.$router.replace("/login");
    },
    verifyFn() {
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
@mixin hint {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  .input-item {
    width: 60%;
    display: flex;
    margin-top: 20px;
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
      right: -30%;
      width: 40%;
      height: 40px;
      line-height: 40px;
      transition: all 2s;
      font-size: 12px;
    }
  }
  .apply-btn {
    width: 18%;
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
}
.apply-wrap {
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
  .apply-content {
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
      .m-wrap {
        width: 100%;
        height: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon-wait {
          color: rgba(112, 112, 112, 1);
        }
        .icon-zhengque1 {
          color: rgba(45, 202, 147, 1);
        }
        .progress-item {
          width: 10%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          i {
            font-size: 34px;
          }
          p {
            font-size: 14px;
            margin-top: 10px;
          }
        }
        .line {
          background: rgba(203, 193, 189, 1);
          width: 10%;
          height: 2px;
          margin-bottom: 3%;
        }
      }
      .b-wrap {
        width: 100%;
        height: 50%;
        .userHint {
          @include hint;
          .input-item:nth-child(2) {
            input {
              width: 35%;
            }
            .validate-btn {
              width: 20%;
              height: 30px;
              margin-left: 2%;
              border-width: 0px;
              border-radius: 25px;
              background: var(--btnColor);
              outline: none;
              cursor: pointer;
              color: #fff;
              font-size: 14px;
            }
          }
        }
        .resetPass {
          @include hint;
        }
        .resetSuccess {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          p {
            font-size: 16px;
            color: rgba(203, 193, 189, 1);
            margin-bottom: 5%;
          }
          .apply-btn {
            width: 18%;
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
        }
      }
    }
  }
}
</style>
