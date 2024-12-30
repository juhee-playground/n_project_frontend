import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@fortawesome/fontawesome-free/css/all.css";

import "./components";
import vuetify from "./plugins/vuetify";
import VueCookies from "vue-cookies";
import VueMoment from "./plugins/moment";
import { isAuthorization } from "./mixins/auth";
import { getUserInfo } from "./common/user.js";

Vue.config.productionTip = false;
Vue.use(VueMoment);
Vue.use(VueCookies);
Vue.prototype.$imgBaseUrl =
  "https://juhee100bucket.s3.ap-northeast-2.amazonaws.com/image-nnnn/";

const ignoreWarnMessage =
  "The .native modifier for v-on is only valid on components but it was used on <div>.";
Vue.config.warnHandler = function(msg, vm, trace) {
  if (msg === ignoreWarnMessage) {
    msg = null;
    vm = null;
    trace = null;
  }
};

new Vue({
  router,
  store,
  vuetify,
  created() {
    if (isAuthorization()) {
      store.commit("account/SET_INFO", getUserInfo());
    }
  },
  render: (h) => h(App),
}).$mount("#app");
