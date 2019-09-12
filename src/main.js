import Vue from 'vue'
import App from "./App.vue"
import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

require('./css/styles.css');

// Use this after the variable declaration
Vue.use(BootstrapVue);
Vue.use(VueResource);

new Vue({
    el: '#app',
    render: h => h(App)
});
