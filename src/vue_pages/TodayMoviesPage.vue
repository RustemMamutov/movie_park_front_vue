<template>
    <div @mouseover="hover = true">
        <span v-on:mousemove="pickOutPlace" @click="goToPageByClick($event)">
            Location: X: {{ X }} Y: {{ Y }}<br>
            <button class="btn btn-primary" @click="drawAllMovies" style="margin-right:40px;">draw all movies</button>
            <div class="row" id="todayMovies"></div>
        </span>
    </div>
</template>

<script>
    import {getTodayMovieList} from '../seance_schema_scripts.js'
    import {drawAllMovies} from '../seance_schema_scripts.js'

    export default {
        data() {
            return {
                todayMovies: {},
                X: 0,
                Y: 0
            }
        },
        beforeCreate() {
            getTodayMovieList(this.$http).then(response => {
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
                let element = document.elementsFromPoint(event.clientX, event.clientY)[0];
                if (element == null) {
                    return;
                }

                if (element.classList.contains("image")) {
                    let movieId = element.getAttribute("id");
                    console.log("I'm here. %s", movieId);
                    this.$router.push({ path: '/posters-by-movie/' + movieId})
                }
            }
        }
    }
</script>