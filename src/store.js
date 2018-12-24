import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let module_global = {
  state: {
    theme: "light",
    htmlWidth: null,
    htmlHeight: 0,
    userInfo: null
  },
  getters: {},
  mutations: {
    changeTheme(state) {
      if (state.theme === "light") {
        state.theme = "dark";
      } else {
        state.theme = "light";
      }
    },
    gethtmlWidth(state, val) {
      state.htmlWidth = val;
    },
    gethtmlHeight(state, val) {
      state.htmlHeight = val;
    },
    set_userInfo(state, val) {
      state.userInfo = val;
    }
  },
  actions: {}
};
export default new Vuex.Store({
  modules: {
    module_global: module_global
  }
});
