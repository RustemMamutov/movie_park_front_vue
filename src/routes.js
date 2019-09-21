import VueRouter from 'vue-router'
import SeanceSchemaPage from './vue_pages/SeanceSchemaPage'
import Home from './vue_pages/HomePage'
import TodayMoviesPage from './vue_pages/TodayMoviesPage'
import AllSeancesByMoviePage from './vue_pages/AllSeancesByMoviePage'
import BlockPlacesPage from './vue_pages/BlockPlacesPage'

export default new VueRouter({
    routes: [
        {
            path : "/block-places",
            component : BlockPlacesPage
        },
        {
            path : "/get-seance-info/:seanceId",
            component : SeanceSchemaPage
        },
        {
            path : "/posters",
            component : TodayMoviesPage
        },
        {
            path : "/posters-by-movie/:movieId/:dateStr",
            component : AllSeancesByMoviePage
        },
    ],
    mode: 'history'
})