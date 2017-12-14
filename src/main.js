import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import Login from './components/Login/Login.vue'
import UserInfo from './components/Use_Info/Use_Info.vue'
import VueECharts from 'vue-echarts'
import progressinfo from './components/progress/progressInfo.vue'
import Icon from 'vue-awesome/components/Icon'

import 'vue-awesome/icons'
import './assets/normallize.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// bootstrap-vue 报错兼容代码
let originalVueComponent = Vue.component;
Vue.component = function (name, definition) {
  if (Array.isArray(definition.components) && definition.components.length === 1) {
    definition.components = {
      [name]: definition.components[0]
    }
  }
  originalVueComponent.apply(this, [name, definition])
}
// bootstrap-vue 报错兼容代码
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.component('chart', VueECharts)
Vue.component('icon', Icon)

const routes = [{
  path: '/',
  component: () => {
    var token = window.localStorage.getItem('token')
    if(token && token.length > 0) {
      router.replace({
        path: '/UserInfo'
      })
    } else {
      router.replace({
        path: '/Login'
      })
    }
  }
},{
  path: '/Login',
  component: Login,
}, {
  path: '/UserInfo',
  component: UserInfo,
  meta: {
    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
  },
},{
  path:'/progressinfo',
  component:progressinfo,
  meta: {
    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
  },
}];
const router = new VueRouter({
  routes,
});

function isEmptyObject(obj) {
  for (var key in obj) {
    return false;
  }
  return true;
}

Vue.component = originalVueComponent
Vue.config.productionTip = false


// 拦截器 ========================================================
// Add a request interceptor
// request拦截器
axios.interceptors.request.use(config => {
  // if (store.getters.token) {
  //   config.headers['X-Token'] = store.getters.token; // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  // }
  var token = window.localStorage.getItem('token')
  if (!!token) {
    config.headers.common['Authorization'] = token; // token，写死，不能给别人看，不要上传到github上
  }
  return config;
}, err => {
  // Do something with request error
  console.log('axios_error: ', error);
  return Promise.reject(error);
  
});

// Add a response interceptor
// respone拦截器
axios.interceptors.response.use(response => {
  return response;
}, error => {
  if(error.response.status === 401) {
    router.replace({
      path: '/Login'
    });
  }
  return Promise.reject(error);
});
// 拦截器 ========================================================


const EventBus = new Vue()

Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
})
const app = new Vue({
  el: '#app',
  template: '<App/>',
  components: {
    App
  },
  render: h => h(App),
  router
})
