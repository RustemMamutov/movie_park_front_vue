import Vue from 'vue'
import Home from "./Home.vue"
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import "bootstrap/dist/css/bootstrap.min.css"
import router from './routes'

require('./css/styles.css');

// Use this after the variable declaration
Vue.use(VueResource);
Vue.use(VueRouter);

new Vue({
    el: '#app',
    render: h => h(Home),
    router: router
});
