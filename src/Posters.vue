<template>
    <div class="container pt-2">
        <h1>Page2:</h1>
        <button class="btn btn-primary" @click="getAllSeancesInfo" style="margin-right:40px;">Get seances info</button>
    </div>
</template>

<script>
    var serviceUrl = 'http://51.68.137.193:9000/movie_park';
    
    export default {
        data() {
            return {
                seancesInfo: {},
                X: 0,
                Y: 0
            }
        },
        methods: {
            getAllSeancesInfo() {
                let myUrl = serviceUrl + '/get_seances_for_date/2019-09-15';

                return this.$http.get(myUrl)
                    .then(response => {
                        console.log("Seances info:", response);
                        return response.json();
                    }).then(response => {
                        this.seancesInfo = response;
                    });
            },
            selectThePlace(event) {
                let element = document.elementsFromPoint(event.clientX, event.clientY)[0];
                if (element == null) {
                    return;
                }

                if (element.getAttribute('blocked') === 'true') {
                    console.log("Place id = %s is blocked.", element.getAttribute("id"));
                    return;
                }

                if (element.classList.contains("seat")) {
                    if (element.getAttribute('selected') === 'true') {
                        console.log("Place id = %s was selected. Do unselect.", element.getAttribute("id"));
                        element.setAttribute('r', "2.5%");
                        element.setAttribute('selected', false);
                        this.totalPrice -= parseInt(element.getAttribute('price'), 10);
                    } else {
                        console.log("Place id = %s wasn't selected. Do select.", element.getAttribute("id"));
                        element.setAttribute('r', "3%");
                        element.setAttribute('selected', true);
                        this.totalPrice += parseInt(element.getAttribute('price'), 10);
                    }
                }
            },
            pickOutPlace (event) {
                this.X = event.clientX;
                this.Y = event.clientY;
            }
        }
    }
</script>