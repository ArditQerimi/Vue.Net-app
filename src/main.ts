import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import "mdb-vue-ui-kit/css/mdb.min.css";
import "vuetify/dist/vuetify.min.css";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import store from "@/store";

const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  components,
  ssr: true,
  directives,
});

const app = createApp(App);
app.use(vuetify);

app.use(router);

app.use(store);
app.mount("#app");
