<template>
    <div @mouseover="hover = true">
        <span v-on:mousemove="pickOutPlace" @click="goToPageByClick($event)">
            Location: X: {{ X }} Y: {{ Y }}
            <h1>Posters</h1>
            <button class="btn btn-primary" @click="getAllSeancesInfo" style="margin-right:40px;">Get movies</button>
            <button class="btn btn-primary" @click="drawAllMovies" style="margin-right:40px;">draw all movies</button>
            <div class="row" id="todayMovies"></div>
        </span>
    </div>
</template>

<script>
    var serviceUrl = 'http://51.68.137.193:9000/movie_park';

    export default {
        data() {
            return {
                todayMovies: {},
                X: 0,
                Y: 0
            }
        },
        methods: {
            getAllSeancesInfo() {
                this.todayMovies = {"1" : "OHO-2", "2" : "Терминатор-6", "3" : "Уилл Смит"};
                // let myUrl = serviceUrl + '/get_seances_for_date/2019-09-15';
                //
                // return this.$http.get(myUrl)
                //     .then(response => {
                //         console.log("Seances info:", response);
                //         return response.json();
                //     }).then(response => {
                //         this.seancesInfo = response;
                //     });
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
            },
            drawAllMovies() {
                let container = document.getElementById('todayMovies');

                for (const [index, o] of Object.entries(this.todayMovies)) {
                    //create new element
                    let movie = document.createElement('div');
                    movie.setAttribute('class', "col-3 image");
                    movie.setAttribute('id', index);
                    container.appendChild(movie);
                }
            },
            pickOutPlace (event) {
                this.X = event.clientX;
                this.Y = event.clientY;
            }
        }
    }
</script>