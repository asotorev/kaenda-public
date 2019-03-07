import Vue from 'vue';
import App from './components/App.vue';
import router from './routes';
import { store } from './store/index';
import axios from 'axios';

axios.defaults.baseURL = 'https://moneykal.firebaseio.com';

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
