import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import nprogress from "./plugins/nprogress";
import "./plugins/tiptap-vuetify";

Vue.config.productionTip = false;

new Vue({
    nprogress,
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount("#app");
