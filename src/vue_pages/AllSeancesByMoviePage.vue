<template>
    <div>
        <span v-on:mousemove="pickOutPlace" @click="goToPageByClick($event)">
            Location: X: {{ X }} Y: {{ Y }}<br>
            <ul>
                <li v-for="movieParkName in Object.keys(allSeancesInfo)">
                    <app-movie-park-seances-list-component
                        :movie-park-name-param="movieParkName"
                        :movie-park-seances-list-param="allSeancesInfo[movieParkName]">
                    </app-movie-park-seances-list-component>
                </li>
            </ul>
        </span>
    </div>
</template>

<script>
    import {getAllSeancesByMovieAndDate} from '../seance_schema_scripts.js'
    import MovieParkSeancesListComponent from "../components/MPSeancesListComponent";

    export default {
        data() {
            return {
                movieId: this.$router.currentRoute.params['movieId'],
                allSeancesInfo: {},
                X: 0,
                Y: 0
            }
        },
        created(){
            getAllSeancesByMovieAndDate(this.$http, this.movieId, '2019-09-20').then(response => {
                this.allSeancesInfo = response;
            });
            console.log("All seances in all movie parks:", this.allSeancesInfo);
        },
        methods: {
            pickOutPlace (event) {
                this.X = event.clientX;
                this.Y = event.clientY;
            },
            goToPageByClick(event) {
                let element = document.elementsFromPoint(event.clientX, event.clientY)[0];
                if (element == null) {
                    return;
                }

                if (element.classList.contains("btn-warning")) {
                    let seanceId = element.getAttribute("id");
                    console.log("Clicked on seance: %s", seanceId);
                    this.$router.push({ path: '/get-seance-info/' + seanceId})
                }
            }
        },
        components: {
            appMovieParkSeancesListComponent: MovieParkSeancesListComponent
        }
    }
</script>
