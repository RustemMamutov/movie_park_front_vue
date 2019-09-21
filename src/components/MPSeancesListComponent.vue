<template>
    <div>
<!--        <button class="btn btn-primary" @click="fillData" style="margin-right:40px;">Fill data</button>-->
        <div class="row" :id="'row_' + movieParkName">
            <div class="col-4" :id="'leftColumn_' + movieParkName"></div>
            <div class="col-8" :id="'rightColumn_' + movieParkName"></div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            movieParkSeancesListParam: Array,
            movieParkNameParam: String
        },
        data() {
            return {
                movieParkSeancesList: this.movieParkSeancesListParam,
                movieParkName: this.movieParkNameParam
            }
        },
        mounted(){
            let leftColumn = document.getElementById('leftColumn_' + this.movieParkName);
            leftColumn.textContent = this.movieParkName;
            leftColumn.setAttribute('style', 'font-size: 20px; font-weight: 900;' +
                'text-align: center; vertical-align: center;');

            let rightColumn = document.getElementById('rightColumn_' + this.movieParkName);

            for (const [index, seanceInfo] of Object.entries(this.movieParkSeancesList)) {
                let seanceButton = document.createElement("BUTTON");
                seanceButton.setAttribute('id', seanceInfo['seanceId']);
                seanceButton.setAttribute('class', 'btn btn-warning');
                seanceButton.setAttribute('style', 'margin:5px');
                seanceButton.textContent = seanceInfo['startTime'];
                rightColumn.appendChild(seanceButton);
            }
        },
        methods: {
        }
    }
</script>
