import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import contextmenu from "vue3-contextmenu";
import "vue3-contextmenu/dist/vue3-contextmenu.css";

import VueDragResize from "vue-drag-resize";
const app = createApp(App);
app.use(createPinia());
app.use(contextmenu);
app.use((Vue) => {
  Vue.component("Dragger", VueDragResize);
});
app.use(router);
app.use(ElementPlus);
app.mount("#app");
