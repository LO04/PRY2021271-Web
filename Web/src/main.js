import Vue from "vue";
import App from "./App";
import router from "./router/index";

import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";
import store from './store'
import vuetify from './plugins/vuetify'

Vue.use(PaperDashboard)

/* eslint-disable no-new */
new Vue({
 router,
 store,
 vuetify,
 render: h => h(App)
}).$mount("#app");
