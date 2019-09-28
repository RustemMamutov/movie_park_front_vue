<template>
    <div @mouseover="hover = true" v-on:mousemove="pickOutPlace" @click="goToPageByClick($event)">
        Location: X: {{ X }} Y: {{ Y }}<br>
        <div class="row" id="todayMovies"></div>
    </div>
</template>

<script>
    import {formatDate} from '../seance_schema_scripts.js'
    import {getTodayMovieList} from '../seance_schema_scripts.js'
    import {drawAllMovies} from '../seance_schema_scripts.js'

    export default {
        data() {
            return {
                todayMovies: {},
                dateStr: '',
                X: 0,
                Y: 0
            }
        },
        beforeCreate() {
            let todayStr = formatDate(new Date());
            console.log('dateStr: ', todayStr);
            getTodayMovieList(this.$http, todayStr).then(response => {
                this.dateStr = todayStr;
                this.todayMovies = response;
                drawAllMovies(document, this.todayMovies);
            });
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
                if (element.classList.contains("movie")) {
                    let movieId = element.getAttribute("id");
                    this.$router.push({ path: '/posters-by-movie/' + movieId})
                }
            }
        }
    }
</script>