import vuetify from "@/plugins/vuetify";
import Vue from "vue";
import { TiptapVuetifyPlugin } from "tiptap-vuetify";
import "tiptap-vuetify/dist/main.css";

Vue.use(TiptapVuetifyPlugin, {
    vuetify,
    iconsGroup: "mdi",
});
