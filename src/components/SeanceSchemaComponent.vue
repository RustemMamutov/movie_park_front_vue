<template>
    <div class="container pt-2" @mouseover="hover = true">
        <span v-on:mousemove="pickOutPlace" @click="selectThePlace($event)">
            Location: X: {{ X }} Y: {{ Y }}
            <br>
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

    import {createCircleByParameters} from '../seance_schema_scripts.js'
    import {drawScreen} from '../seance_schema_scripts.js'
    import {prepareBlockPlacesRequestBody} from '../seance_schema_scripts.js'
    import halls_places_info from '../external_vars/halls_places_info.json'

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
        props: {
            seanceIdParam: String,
            seanceInfoParam: Object,
            placesBlockInfoParam: Array
        },
        data() {
            return {
                seanceId: this.seanceIdParam,
                seanceInfo: this.seanceInfoParam,
                placesBlockInfo: this.placesBlockInfoParam,
                totalPrice: 0,
                X: 0,
                Y: 0
            }
        },
        methods: {
            pickOutPlace (event) {
                this.X = event.clientX;
                this.Y = event.clientY;
            },
            blockPlaces() {
                let blockPlacesRequestBody = prepareBlockPlacesRequestBody(this.$http, document, this.placesBlockInfo, this.seanceId);
                console.log(blockPlacesRequestBody);
                this.$router.push({path: '/block-places', data: {requestBodyParam: blockPlacesRequestBody}});
            },
            drawAllSeats() {
                this.seanceInfo = this.seanceInfoParam;
                this.placesBlockInfo = this.placesBlockInfoParam;
                this.totalPrice = 0;
                let svgns = "http://www.w3.org/2000/svg";
                let container = document.getElementById('seanceGraphArea');

                for(let i = 0; i < this.placesBlockInfo.length; i++) {
                    let eachPlace = this.placesBlockInfo[i];
                    let placeId = eachPlace['placeId'];
                    let blocked = eachPlace['blocked'];
                    //remove old element
                    let currentElement = container.getElementById(placeId);
                    if (currentElement != null) {
                        currentElement.remove();
                    }

                    //create new element
                    let circle = document.createElementNS(svgns, 'circle');
                    createCircleByParameters(circle, placeId, blocked,
                        halls_places_info[this.seanceInfo['hallId']],
                        this.seanceInfo['basePrice'],
                        this.seanceInfo['vipPrice']);
                    container.appendChild(circle);
                }
                let width = container.getBoundingClientRect().width;
                let height = container.getBoundingClientRect().height;
                let curvedLine = document.createElementNS(svgns, 'path');
                drawScreen(curvedLine, width, height);
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
            clearAllSeats(){
                let container = document.getElementById('seanceGraphArea');
                for(let i = 0; i < this.placesBlockInfo.length; i++) {
                    let placeId = this.placesBlockInfo[i]['placeId'];
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