<template>
  <div class="register-wrap">
    <div class="register-content">
      <div class="l-wrap"></div>
      <div class="r-wrap">
        <div class="t-wrap">ORAIT云平台账号注册</div>
        <div class="b-wrap">
          <div class="input-item">
            <p>昵称</p>
            <input type="text" placeholder="请输入昵称" v-model="nickname" @input="verifyFn('nickname')" />
            <transition name="fade">
              <div class="verify">
                <Verify :success=1 :inputHint= hint.nickname></Verify>
              </div>
            </transition>
          </div>
          <div class="input-item">
            <p>密码</p>
            <input type="text" placeholder="请设置密码" v-model="password" @input="verifyFn('password')" />
            <transition name="fade">
              <div class="verify">
                <Verify :success=1 :inputHint= hint.password></Verify>
              </div>
            </transition>
          </div>
          <div class="input-item">
            <p>手机号码</p>
            <input type="text" placeholder="请输入手机号" v-model="phone" @input="verifyFn('phone')"/>
            <transition name="fade">
              <div class="verify">
                <Verify :success=1 :inputHint= hint.phone></Verify>
              </div>
            </transition>
          </div>
          <div class="input-item">
            <p>验证码</p>
            <input type="text" placeholder="请输入验证码" v-model="verifyCode" />
            <button class="validate-btn">获取验证码</button>
            <transition name="fade">
              <div class="verify">
                <Verify :success=1 :inputHint= hint.verifyCode></Verify>
              </div>
            </transition>
          </div>
          <div class="input-item">
            <p>企业名称</p>
            <input type="text" placeholder="请输入企业名称" v-model="companyName" @input="verifyFn('companyName')" />
            <transition name="fade">
              <div class="verify">
                <Verify :success=1 :inputHint= hint.companyName></Verify>
              </div>
            </transition>
          </div>
          <div class="input-item">
            <p>邀请码</p>
            <input type="text" placeholder="请输入体验邀请码" v-model="inviteCode" />
            <transition name="fade">
              <div class="verify">
                <Verify :success=1 :inputHint= hint.inviteCode></Verify>
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
      hint: {
        nickname: "",
        password: null,
        phone: "",
        verifyCode: "验证码错误",
        companyName: "仅支持中英文输入",
        inviteCode: "激活码有误"
      }
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
      this.styles.setProperty("--WrapH", val + "px");
      this.styles.setProperty("--DomH", val + "px");
    },
    verifyFn(str) {
      switch (str) {
        //验证昵称
        case "nickname":
          if (/^[a-zA-Z\u4e00-\u9fa5]+$/.test(this.nickname)) {
            this.hint.nickname = "";
          } else {
            this.hint.nickname = "仅支持中英文输入";
          }
          break;
        //验证手机号码
        case "phone":
          if (/^1[34578]\d{9}$/.test(this.phone)) {
            this.hint.phone = "";
            this.styles.setProperty("--btnColor", "rgba(255, 119, 62, 1)");
          } else {
            this.hint.phone = "手机号码有误";
          }
          break;
        //验证企业名称
        case "companyName":
          if (/^[a-zA-Z\u4e00-\u9fa5]+$/.test(this.companyName)) {
            this.hint.companyName = "";
          } else {
            this.hint.companyName = "仅支持中英文输入";
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
            right: -32%;
            width: 40%;
            height: 40px;
            line-height: 40px;
            transition: all 2s;
            font-size: 12px;
          }
          .fade-enter-active, .fade-leave-active {
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
