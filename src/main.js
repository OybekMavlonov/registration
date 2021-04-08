import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import InputMask from 'vue-input-mask';
import vuetify from './plugins/vuetify';
import vueCountriesCities from "vue-countries-cities";

Vue.use(Vuelidate)
Vue.use(InputMask)
Vue.component("countriesCities", vueCountriesCities);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
