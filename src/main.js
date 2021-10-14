import { createApp } from "vue";
import router from "./router/index.js";
import store from './store.js'
import Notifications from '@kyvg/vue3-notification'

import './index.css'

import App from "./App.vue";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(Notifications);
app.mount("#app");