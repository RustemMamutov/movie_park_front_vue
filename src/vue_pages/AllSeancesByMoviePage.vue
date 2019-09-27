<template>
    <div v-on:mousemove="pickOutPlace" @click="goToPageByClick($event)">
        Location: X: {{ X }} Y: {{ Y }}<br>
        <button @click='toggleShow' class='anchor'>{{ this.activeDateAsString }}</button>
        <div v-if='showMenu' class='menu'>
            <div class='menu-item' v-for='date in this.activeDateList' @click='itemClicked(date)'>{{ date }}</div>
        </div>
        <br>
        <br>
        <br>
        <div style="font-weight: bolder; font-size: 30px; text-align:center; margin: 20px;">
            Расписание сеансов во всех кинотеатрах {{ activeDateAsString }}</div>
        <br>
        <ul>
            <li v-for="movieParkName in Object.keys(allSeancesInfo)">
                <app-movie-park-seances-list-component
                    :movie-park-name-param="movieParkName"
                    :movie-park-seances-list-param="allSeancesInfo[movieParkName]">
                </app-movie-park-seances-list-component>
            </li>
        </ul>
    </div>
</template>

<script>
    import {getAllSeancesByMovieAndDate} from '../seance_schema_scripts.js'
    import {formatDate} from '../seance_schema_scripts.js'
    import MovieParkSeancesListComponent from "../components/MPSeancesListComponent";

    export default {
        data() {
            return {
                movieId: this.$router.currentRoute.params['movieId'],
                movieName: '',
                allSeancesInfo: {},
                X: 0,
                Y: 0,
                activeDateAsString: '',
                activeDateList: [],
                showMenu: false
            }
        },
        created(){
            this.allSeancesInfo = {};
            this.activeDateList = [];

            for (let i=0; i<=4; i++){
                let date = new Date();
                date.setDate(date.getDate() + i);
                this.activeDateList.push(formatDate(date));
            }

            this.activeDateAsString = this.activeDateList[0];
            console.log("dateStr before :", this.activeDateAsString);
            this.downloadDataAndDrawAllSeances(this.activeDateAsString);
            console.log("dateStr after:", this.activeDateAsString);
            console.log("All seances in all movie parks:", this.allSeancesInfo);
        },
        methods: {
            toggleShow: function() {
                this.showMenu = !this.showMenu;
            },
            itemClicked: function(item) {
                this.toggleShow();
                this.activeDateAsString = item;
                this.downloadDataAndDrawAllSeances(this.activeDateAsString);
            },
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
            },
            downloadDataAndDrawAllSeances(dateStr){
                console.log("typeof: ", typeof dateStr);
                this.allSeancesInfo = {};
                getAllSeancesByMovieAndDate(this.$http, this.movieId, dateStr).then(response => {
                    this.allSeancesInfo = response;
                });
            }
        },
        components: {
            appMovieParkSeancesListComponent: MovieParkSeancesListComponent
        }
    }
</script>
