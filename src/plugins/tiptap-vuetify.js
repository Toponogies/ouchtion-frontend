import vuetify from "./vuetify";
import Vue from "vue";
import { TiptapVuetifyPlugin } from "tiptap-vuetify";
import "tiptap-vuetify/dist/main.css";

Vue.use(TiptapVuetifyPlugin, {
    vuetify,
    iconGroups: "mdi",
});
