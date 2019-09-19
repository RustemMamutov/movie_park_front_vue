import VueRouter from 'vue-router'
import App from './App'
import Home from './Home'
import Page2 from './Posters'

export default new VueRouter({
    routes: [
        {
            path : "/get_seance",
            component : App
        },
        {
            path : "/posters",
            component : Page2
        },
    ],
    mode: 'history'
})