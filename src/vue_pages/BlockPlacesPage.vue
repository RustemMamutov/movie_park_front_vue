<template>
    <div>
        <span v-on:mousemove="pickOutPlace">
            Location: X: {{ X }} Y: {{ Y }}
            <button class="btn btn-primary" @click="blockPlaces" style="margin-right:40px;">DrawCircles</button>
        </span>
    </div>
</template>

<script>
    import {blockPlacesUtil} from '../seance_schema_scripts.js'
    export default {
        props: {
            requestBodyParam: Object
        },
        data() {
            return {
                requestBody: this.requestBodyParam,
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
                console.log(this.requestBody);
                // blockPlacesUtil(this.$http, this.requestBody);
            }
        }
    }
</script>