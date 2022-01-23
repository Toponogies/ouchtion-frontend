import Vue from "vue";
import App from "@/App";
import router from "@/router";
import store from "@/store";
import vuetify from "@/plugins/vuetify";

import nprogress from "@/plugins/nprogress";
import "@/plugins/tiptap-vuetify";
import "@/plugins/lineClamp";

Vue.config.productionTip = false;

new Vue({
    nprogress,
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount("#app");
