<template>
  <div class="wpSimluate" id="wpSimluate">
    <div class="header-wrap">
        <Header></Header>
    </div>
    <div class="b-wrap">
      <div class="l-content">
        <router-view />
      </div>
      <div class="r-content">
        <i class="iconfont icon-tuopu"></i>
        <i class="iconfont icon-xinxi"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { changeTheme } from "../../assets/js/common/theme.js";
import header from "../../components/wpSimluate/header";
export default {
  data() {
    return {
      username: null,
      password: null,
      showMenu: false,
      rememberCode: false,
      showModule: 1
    };
  },
  computed: {
    //计算属性只能对数据进行监听，计算属性最后会返回一个值
    theme() {
      return this.$store.state.module_global.theme; //计算属性最后返回的值在哪里使用
    },
    htmlHeight() {
      return this.$store.state.module_global.htmlHeight;
    }
  },
  watch: {
    theme(val) {
      changeTheme(val);
    },

    htmlHeight(val) {
      this.changeHeight(val);
    }
  },
  methods: {
    //用于监听根页面的宽度和高度
    getwh(that) {
      let htmlDom = document.getElementsByTagName("html")[0];
      let htmlWidth =
        document.documentElement.clientWidth || document.body.clientWidth;
      let htmlHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      htmlDom.style.fontSize = htmlWidth / 100 + "px";
      that.$store.commit("gethtmlWidth", htmlWidth);
      that.$store.commit("gethtmlHeight", htmlHeight);
    },
    changeHeight(val) {
      let styles = this.$el.style;
      styles.setProperty("--WrapH", val - 60 + "px");
      styles.setProperty("--DomH", val + "px");
      styles.setProperty("--menuH", val - 60 + "px");
    },
    //缩放左侧边栏
    zoom_click() {
      this.showMenu = !this.showMenu;
    }
  },
  mounted() {
    //监听根页面宽度和高度
    let _this = this;
    this.getwh(this);
    window.onresize = function() {
      _this.getwh(_this);
    };
    this.userInfo = localStorage.getItem("userInfo");
    this.changeHeight(this.$store.state.module_global.htmlHeight);
    // this.$router.replace("/login");
  },
  components: {
    Header: header
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/reset.css";
@import "../../assets/css/global"; //引用这个文件后，可以指定自定义字体
.wpSimluate {
  width: 100%;
  height: 100%;
  font-family: "SourceHanSansSC-Medium";
  .header-wrap {
    width: 100%;
    height: 60px;
  }
  .b-wrap {
    width: 100%;
    height: var(--WrapH);
    background-color: #f5f5f5;
    display: flex;
    .l-content {
      height: 100%;
      width: 97%;
      background-color: rgba(189, 196, 203, 1);
    }
    .r-content {
      height: 100%;
      width: 60px;
      background-color: rgba(245, 245, 245, 1);
      display: flex;
      flex-direction: column;
      align-items: center;
      i {
        display: block;
        font-size: 30px;
        height: 50px;
        line-height: 50px;
      }
    }
  }
}
</style>
