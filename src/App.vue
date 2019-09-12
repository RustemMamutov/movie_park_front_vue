<template>
    <div class="container pt-2">
        <span v-on:mousemove="pickOutPlace" @click="selectThePlace($event)">
            HERE X: {{ X }} Y: {{ Y }}
            <br>
            <button class="btn btn-primary" @click="clearAndGetSeanceInfo" style="margin-right:40px;">Get seance info</button>
            <button class="btn btn-primary" @click="drawAllSeats(70, 50)" style="margin-right:40px;">DrawCircles</button>
            <button type="button" class="btn btn-primary" @click="blockPlaces" style="margin-right:40px;">Block places.</button>
            <span style="font-size: 25px; font-weight: 900;">Total cost: {{ totalPrice }}</span>
            <br>
            <svg id="placesArray" height="550" width="770"
                 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            </svg>
            <br>


        </span>
        <br>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                carName: '',
                carYear: 2018,
                seanceInfo: [],
                totalPrice: 0,
                X: 0,
                Y: 0
            }
        },
        methods: {
            blockPlaces() {
                let container = document.getElementById('placesArray');
                let myUrl = 'http://145.239.80.35:9000/movie_park/block_unblock_place';

                for (let index = 0; index < this.seanceInfo.length; ++index) {
                    let element = this.seanceInfo[index];
                    let elementId = element.hallRow * 100 + element.place;

                    //remove old element
                    let currentElement = container.getElementById(elementId);
                    if (currentElement === null) {
                        throw {};
                    }

                    console.log(currentElement.getAttribute('selected'));
                    if (currentElement.getAttribute('selected') === 'true') {
                        let blockPlace = {
                            seanceId: 1,
                            row: 0,
                            place: 0,
                            blocked: true
                        };
                        blockPlace.place = currentElement.getAttribute('place');
                        blockPlace.row = currentElement.getAttribute('hallRow');

                        this.requestPost(myUrl, blockPlace);
                    }
                }

                this.clearAllSeats();
                this.seanceInfo = [];
                this.totalPrice = 0;
            },
            clearAndGetSeanceInfo() {
                this.seanceInfo = [];

                let myUrl = 'http://145.239.80.35:9000//movie_park/get_seance_info/1';

                this.$http.get(myUrl)
                    .then(response => {
                        return response.json();
                    })
                    .then(seanceInfo => {
                        this.seanceInfo = seanceInfo;
                        console.log("Seance info:", seanceInfo);
                    });
            },
            drawAllSeats(stepX, stepY) {
                this.totalPrice = 0;
                let svgns = "http://www.w3.org/2000/svg";
                let container = document.getElementById('placesArray');

                for (let index = 0; index < this.seanceInfo.length; ++index) {
                    let element = this.seanceInfo[index];
                    let elementId = element.hallRow * 100 + element.place;

                    //remove old element
                    let currentElement = container.getElementById(elementId);
                    if (currentElement != null) {
                        currentElement.remove();
                    }

                    //create new element
                    let x = stepX * element.place;
                    let y = stepY * element.hallRow;
                    let r = 15;
                    let circle = document.createElementNS(svgns, 'circle');
                    circle.setAttributeNS(null, 'id', elementId);
                    circle.setAttributeNS(null, 'cx', x);
                    circle.setAttributeNS(null, 'cy', y);

                    circle.setAttributeNS(null, 'hallRow', element.hallRow);
                    circle.setAttributeNS(null, 'place', element.place);

                    circle.setAttributeNS(null, 'class', 'seat');
                    if (element.blocked === true) {
                        r = 8;
                        circle.setAttributeNS(null, 'class', 'seat blocked');
                    } else if (element.isVip === true) {
                        circle.setAttributeNS(null, 'class', 'seat vip');
                    }

                    circle.setAttributeNS(null, 'r', r);
                    circle.setAttributeNS(null, 'price', element.price);
                    circle.setAttributeNS(null, 'blocked', element.blocked);
                    circle.setAttributeNS(null, 'selected', false);

                    circle.textContent.fontcolor("black");
                    circle.textContent = element.place;

                    container.appendChild(circle);
                }
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
                        element.setAttribute('r', 15);
                        element.setAttribute('selected', false);
                        this.totalPrice -= parseInt(element.getAttribute('price'), 10);
                    } else {
                        console.log("Place id = %s wasn't selected. Do select.", element.getAttribute("id"));
                        element.setAttribute('r', 20);
                        element.setAttribute('selected', true);
                        this.totalPrice += parseInt(element.getAttribute('price'), 10);
                    }
                }
            },
            requestPost(url, data) {
                this.$http.post(url, data)
                    .then(response => {
                        return response.json();
                    })
                    .then(blockedPlace => {
                        console.log(blockedPlace);
                    });
            },
            pickOutPlace (event) {
                this.X = event.clientX;
                this.Y = event.clientY;
            },
            clearAllSeats(){
                let container = document.getElementById('placesArray');
                for (let index = 0; index < this.seanceInfo.length; ++index) {
                    let element = this.seanceInfo[index];
                    let elementId = element.hallRow * 100 + element.place;

                    //remove old element
                    let currentElement = container.getElementById(elementId);
                    if (currentElement === null) {
                        throw {};
                    } else {
                        currentElement.remove();
                    }
                }
            }
        }
    }
</script>
