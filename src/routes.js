import VueRouter from 'vue-router'
import SeanceById from './DrawSeanceById'
import Home from './HomePage'
import PostersTodayMovies from './PostersTodayMovies'
import PostersByMovie from './PostersByMovie'

export default new VueRouter({
    routes: [
        {
            path : "/get_seance/:seanceId",
            component : SeanceById
        },
        {
            path : "/posters",
            component : PostersTodayMovies
        },
        {
            path : "/posters-by-movie/:movieId",
            component : PostersTodayMovies
        },
    ],
    mode: 'history'
})