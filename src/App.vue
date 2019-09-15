<template>
    <div class="container pt-2" @mouseover="hover = true">
        <span v-on:mousemove="pickOutPlace" @click="selectThePlace($event)">
            Location: X: {{ X }} Y: {{ Y }}
            <br>
            <input v-model="seanceId" placeholder="Введите номер сеанса" style="margin-top:10px; margin-bottom:20px;">
            <br>
            <button class="btn btn-primary" @click="getSeanceInfo" style="margin-right:40px;">Get seance info</button>
            <button class="btn btn-primary" @click="getHallPlacesInfo" style="margin-right:40px;">Get hall places info</button>
            <button class="btn btn-primary" @click="clearAndGetSeancePlacesInfo" style="margin-right:40px;">Get seance places info</button>
            <button class="btn btn-primary" @click="drawAllSeats" style="margin-right:40px;">DrawCircles</button>
            <button type="button" class="btn btn-primary" @click="blockPlaces" style="margin-right:40px;">Block places</button>
            <button type="button" class="btn btn-primary" @click="clearAllSeats" style="margin-right:40px;">Clear all</button>
            <br>
            <span style="font-size: 25px; font-weight: 900;">Total cost: {{ totalPrice }}</span>
            <br>

            <svg id="seanceGraphArea" height="800" width="800"
                 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            </svg>
            <br>

        </span>
        <br>
    </div>
</template>


<script>
    // var serviceUrl = 'http://145.239.80.35:9000/movie_park';
    var serviceUrl = 'http://localhost:9000/movie_park';
    String.prototype.format = function()
    {
        var content = this;
        for (var i=0; i < arguments.length; i++)
        {
            var replacement = '{' + i + '}';
            content = content.replace(replacement, arguments[i]);
        }
        return content;
    };
    export default {
        data() {
            return {
                carName: '',
                carYear: 2018,
                seanceId: '',
                seanceInfo: {},
                placesCoordinates: {},
                placesBlockInfo: {},
                totalPrice: 0,
                X: 0,
                Y: 0
            }
        },
        methods: {
            blockPlaces() {
                let container = document.getElementById('seanceGraphArea');
                let myUrl = serviceUrl + '/block_unblock_place';

                let blockPlacesRequestBody = {
                    "seanceId": GLOBAL_SEANCE_ID,
                    "blocked": true,
                    "placeIdList" : []
                };

                for (const placeId of Object.keys(this.placesBlockInfo)) {
                    //remove old element
                    let currentElement = container.getElementById(placeId);
                    if (currentElement === null) {
                        throw {};
                    }
                    if (currentElement.getAttribute('selected') === 'true') {
                        blockPlacesRequestBody.placeIdList.push(placeId);
                    }
                }
                console.log("Block places request body: %s", blockPlacesRequestBody);
                this.requestPost(myUrl, blockPlacesRequestBody);

                this.clearAllSeats();
                this.placesBlockInfo = [];
                this.totalPrice = 0;
            },
            getSeanceInfo() {
                let myUrl = serviceUrl + '/get_seance/' + this.seanceId;

                this.$http.get(myUrl)
                    .then(response => {
                        return response.json();
                    })
                    .then(seanceInfo => {
                        this.seanceInfo = seanceInfo;
                    }).then(console.log("Seance info:", this.seanceInfo));

            },
            getHallPlacesInfo() {
                let myUrl = serviceUrl + '/get_hall_places_info/' + this.seanceInfo.hallId;

                this.$http.get(myUrl)
                    .then(response => {
                        return response.json();
                    })
                    .then(hallPlacesList => {
                        hallPlacesList.forEach(placeInfo => {
                            let coordX = placeInfo.coordX;
                            let coordY = placeInfo.coordY;
                            let vip = placeInfo.isVip;
                            this.placesCoordinates[placeInfo.placeId] = {coordX, coordY, vip};
                        });
                    }).then(console.log("Places coordinates info:", this.placesCoordinates));
            },
            clearAndGetSeancePlacesInfo() {
                this.placesBlockInfo = [];

                let myUrl = serviceUrl + '/get_seance_places_info/' + this.seanceId;

                this.$http.get(myUrl)
                    .then(response => {
                        return response.json();
                    })
                    .then(seancePlacesList => {
                        this.seanceId = seancePlacesList[0].seanceId;
                        seancePlacesList.forEach(placeInfo => {
                            this.placesBlockInfo[placeInfo.placeId] = placeInfo.blocked;
                        });
                    }).then(console.log("Places block info:", this.placesBlockInfo));

            },
            drawAllSeats() {
                this.totalPrice = 0;
                let svgns = "http://www.w3.org/2000/svg";
                let container = document.getElementById('seanceGraphArea');

                for (const [placeId, blocked] of Object.entries(this.placesBlockInfo)) {
                    //remove old element
                    let currentElement = container.getElementById(placeId);
                    if (currentElement != null) {
                        currentElement.remove();
                    }

                    //create new element
                    let x = this.placesCoordinates[placeId].coordX;
                    let y = this.placesCoordinates[placeId].coordY;
                    let vip = this.placesCoordinates[placeId].vip;
                    let price = this.seanceInfo.basePrice;
                    let r = "2.5%";
                    let circle = document.createElementNS(svgns, 'circle');
                    circle.setAttributeNS(null, 'id', placeId);
                    circle.setAttributeNS(null, 'cx', x + '%');
                    circle.setAttributeNS(null, 'cy', y + '%');

                    if (blocked === true) {
                        r = "1.5%";
                        circle.setAttributeNS(null, 'class', 'seat blocked');
                    } else if (vip === true) {
                        circle.setAttributeNS(null, 'class', 'seat vip');
                        price = this.seanceInfo.vipPrice;
                    } else {
                        circle.setAttributeNS(null, 'class', 'seat');
                    }

                    circle.setAttributeNS(null, 'r', r);
                    circle.setAttributeNS(null, 'price', price);
                    circle.setAttributeNS(null, 'blocked', blocked);
                    circle.setAttributeNS(null, 'selected', false);

                    container.appendChild(circle);
                }



                let width = container.getBoundingClientRect().width;
                let height = container.getBoundingClientRect().height;
                console.log(width);
                console.log(height);
                let curvedLine = document.createElementNS(svgns, 'path');
                let curvedLineCoord = "M {0} {1} Q {2} {3} {4} {5}".format(
                    0.20*width, 0.15*height, 0.50*width, 0.05*height, 0.80*width, 0.15*height);
                curvedLine.setAttribute('id', 'screen');
                curvedLine.setAttribute('d', curvedLineCoord);
                curvedLine.setAttribute('stroke', "grey");
                curvedLine.setAttribute('stroke-width', "1%");
                curvedLine.setAttribute('fill', "transparent");
                container.appendChild(curvedLine);
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
                let container = document.getElementById('seanceGraphArea');
                for (const placeId of Object.keys(this.placesBlockInfo)) {
                    //remove old element
                    let currentElement = container.getElementById(placeId);
                    if (currentElement === null) {
                        throw {};
                    } else {
                        currentElement.remove();
                    }
                }
                container.getElementById('screen').remove();
            }
        }
    }
</script>
