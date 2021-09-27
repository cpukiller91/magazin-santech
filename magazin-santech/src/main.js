import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
//import VueSocketIO from 'vue-socket.io'
import VueHtmlToPaper from 'vue-html-to-paper';
import Axios from 'axios'
import OrderModal from './components/OrderModal';
import ProductTable from './components/ProductTable';
import OrderPanel from './components/Order/OrderPanel';
import OrderTable from './components/Order/OrderTable';
import VueBarcode from 'vue-barcode';
import StatusTable from "./components/StatusTable";


const moment = require('moment')
require('moment/locale/ru')

Vue.use(require('vue-moment'), {
  moment
})
Vue.component('status-table', StatusTable)
Vue.component('barcode', VueBarcode)
Vue.component('order-panel', OrderPanel)
Vue.component('order-modal', OrderModal)
Vue.component('product-table', ProductTable)
Vue.component('order-table', OrderTable)

Axios.defaults.baseURL = 'http://localhost:4000/';

Vue.prototype.$http = Axios;

const options = {
  name: '_blank',
  specs: [
    'fullscreen=no',
    'titlebar=no',
    'scrollbars=no'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css',
    'print.css'
  ],
  //timeout: 1000, // default timeout before the print window appears
  //autoClose: true, // if false, the window will not close after printing
  windowTitle: window.document.title, // override the window title
}

Vue.use(VueHtmlToPaper, options);

// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: 'http://localhost:4000',
//   // vuex: {
//   //   store,
//   //   actionPrefix: 'SOCKET_',
//   //   mutationPrefix: 'SOCKET_'
//   // },
//   //options: { path: "/my-app/" } //Optional options
// }));

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
