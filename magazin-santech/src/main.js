import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueSocketIO from 'vue-socket.io'
import VueHtmlToPaper from 'vue-html-to-paper';

const options = {
  name: '_blank',
  specs: [
    'fullscreen=no',
    'titlebar=no',
    'scrollbars=no'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css'
  ],
  timeout: 1000, // default timeout before the print window appears
  autoClose: true, // if false, the window will not close after printing
  windowTitle: window.document.title, // override the window title
}

Vue.use(VueHtmlToPaper, options);

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:4000',
  // vuex: {
  //   store,
  //   actionPrefix: 'SOCKET_',
  //   mutationPrefix: 'SOCKET_'
  // },
  //options: { path: "/my-app/" } //Optional options
}));

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
