import Bulma from 'bulma';
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import { store } from './store/index.js';
import App from './App.vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret);

//not sure if I even used this...
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = true;

new Vue({
  store,
  components: { Bulma },
  render: h => h(App)
}).$mount('#app')


//Note to self: BulmaCss kinda sucks...use bootstrap or even PureCss