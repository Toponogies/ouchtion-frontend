import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Nprogress from "vue-nprogress";

Vue.config.productionTip = false;

Vue.use(Nprogress);

const nprogress = new Nprogress();

new Vue({
    nprogress,
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount("#app");
