import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import store from './store'
import App from './App.vue'
Vue.use(VueI18n);
const i18n = new VueI18n({
  numberFormats: {
    'en-US': {
      currency: {
        style: 'decimal'
      }
    }
  }
});
Vue.config.productionTip = false;

new Vue({
  i18n,
  store,
  render: h => h(App),
}).$mount('#app');
