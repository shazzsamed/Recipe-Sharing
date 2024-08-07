import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";

// Vuetify
import "vuetify/styles"; // Import Vuetify styles
import { createVuetify } from "vuetify";
import "@mdi/font/css/materialdesignicons.css"; // Import MDI icons CSS
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const app = createApp(App);

// Create Vuetify instance
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi", // Set MDI as the default icon set
  },
});

app.use(createPinia());
app.use(router);
app.use(vuetify); // Add Vuetify to the app

app.mount("#app");
