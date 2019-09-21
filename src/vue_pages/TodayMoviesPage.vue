<template>
    <div @mouseover="hover = true">
        <span v-on:mousemove="pickOutPlace" @click="goToPageByClick($event)">
            Location: X: {{ X }} Y: {{ Y }}<br>
            <button class="btn btn-primary" @click="drawAllMovies" style="margin:20px;">draw all movies</button>
            <div class="row" id="todayMovies"></div>
        </span>
    </div>
</template>

<script>
    import {getToday} from '../seance_schema_scripts.js'
    import {getTodayMovieList} from '../seance_schema_scripts.js'
    import {drawAllMovies} from '../seance_schema_scripts.js'

    export default {
        waitBefore: function(object){

        },
        data() {
            return {
                todayMovies: {},
                dateStr: '',
                X: 0,
                Y: 0
            }
        },
        beforeCreate() {
            this.dateStr = getToday();
            console.log('dateStr: ', this.dateStr);
            getTodayMovieList(this.$http, this.dateStr).then(response => {
                this.todayMovies = response;
            });
            console.log('today movies: ', this.todayMovies)
        },
        methods: {
            pickOutPlace (event) {
                this.X = event.clientX;
                this.Y = event.clientY;
            },
            drawAllMovies() {
                drawAllMovies(document, this.todayMovies);
            },
            goToPageByClick(event) {
                this.dateStr = getToday();
                let element = document.elementsFromPoint(event.clientX, event.clientY)[0];
                if (element == null) {
                    return;
                }

                if (element.classList.contains("movie")) {
                    let movieId = element.getAttribute("id");
                    console.log("I'm here. %s", movieId);
                    console.log("I'm here. %s", this.dateStr);
                    this.$router.push({ path: '/posters-by-movie/' + movieId + '/' + this.dateStr})
                }
            }
        }
    }
</script>