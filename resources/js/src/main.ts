import { createApp } from "vue";
import { loadFonts } from "./CoreUI/Theme/Webfontloader";
import App from "./Main/App.vue";
import { createPinia } from "pinia";
import { vuetify } from "./CoreUI/Theme";
import router from "./Main/Router";

const app = createApp(App);
const pinia = createPinia();

loadFonts().then(() => {
    app.use(pinia).use(vuetify).use(router).mount("#app");
});
