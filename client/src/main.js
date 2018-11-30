import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/store'
import * as VueGoogleMaps from "vue2-google-maps";

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAeEHg2JwrWi4kxwQMt2YWRIuqmbUbAkys",
    libraries: "places" // necessary for places input
  }
});

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
