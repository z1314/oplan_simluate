<template>
  <div class="apply-wrap">
    <div class="apply-content">
      <div class="l-wrap"></div>
      <div class="r-wrap">
        <div class="t-wrap">申请产品试用</div>
        <div class="b-wrap">
          <div class="input-item">
            <p>申请人</p>
            <input type="text" placeholder="请输入真实姓名" v-model="username" />
          </div>
          <div class="input-item">
            <p>手机号码</p>
            <input type="text" placeholder="请输入手机号码" v-model="password" />
          </div>
          <div class="input-item">
            <p>企业组织</p>
            <input type="text" placeholder="请输入企业名称" v-model="password" />
          </div>
          <button class="apply-btn">提交申请</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { changeTheme } from "../../assets/js/common/theme.js";
export default {
  data() {
    return {
      username: null,
      password: null
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
    }
  }
};
</script>
<style scoped lang="scss">
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
        height: 40%;
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
          margin-top: 20px;
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
            box-shadow:0 0 0 60px #fff inset;
            -webkit-text-fill-color: #878787;
          }
        }
        .remember-code {
          width: 100%;
          margin-top: 10px;
          margin-left: 40%;
        }
        .apply-btn {
          width: 15%;
          height: 40px;
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
