import Vue from 'vue'
import App from './App.vue'
// import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
import router from '@/router'
import {reqCategorfyList} from '@/api'
import store from '@/store'
import '@/mock/mockServe'
import 'swiper/css/swiper.css'
import 'swiper/js/swiper.js'
import  * as http from '@/api';
import { MessageBox, Button } from 'element-ui';
import VueLazyload from 'vue-lazyload'
import "@/plugins/validate"
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.component(Button.name,Button);
reqCategorfyList();
// Vue.use(VueRouter)
Vue.config.productionTip = false;
// Vue.use(ElementUI);
Vue.use(VueLazyload, {
  loading: require('@/assets/images/lazy/加载中.jpg')
});



new Vue({
  el:'#app',
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$http = http
  },
  router,
  store
})
