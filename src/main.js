import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import VueI18n from "vue-i18n";
import vi from "./locales/vi.json";
import en from "./locales/en.json";

import { CHECK_AUTH } from "./store/actions.type";
import ApiService from "./common/api.service";
import DateFilter from "./common/date.filter";
import ErrorFilter from "./common/error.filter";

Vue.config.productionTip = false;
Vue.filter("date", DateFilter);
Vue.filter("error", ErrorFilter);

Vue.use(VueI18n);
ApiService.init();

// Ensure we checked auth before each page load.
router.beforeEach((to, from, next) =>
  Promise.all([store.dispatch(CHECK_AUTH)]).then(next)
);

const i18n = new VueI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en: en,
    vi: vi
  }
});

new Vue({
  router,
  store,
  i18n,
  methods: {
    changeLocale(locale) {
      this.$i18n.locale = locale;
    }
  },
  render: (h) => h(App)
}).$mount("#app");
