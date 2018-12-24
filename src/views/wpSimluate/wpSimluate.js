import Vue from "vue";
import wpSimluate from "./wpSimluate.vue";
import router from "../../router/wpSimluate_router";
import store from "../../store";
import "../../registerServiceWorker";
import axios from "axios";
import ElementUI from "element-ui";
import "../../assets/css/element-variables.scss"; //Element自定义主题
import vuescroll from "vuescroll";
import "vuescroll/dist/vuescroll.css";

Vue.use(ElementUI);
Vue.use(vuescroll);

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
//滚动条
Vue.prototype.$vuescrollConfig = {
  bar: {
    showDelay: 4000,
    background: "rgba(164, 150, 145, 1)",
    keepShow: true,
    snapping: {
      enable: false,
      width: 100,
      height: 100
    },
    size: "8px"
  }
};
new Vue({
  router,
  store,
  render: h => h(wpSimluate)
}).$mount("#wpSimluate");
