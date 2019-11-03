<template>
    <div>
        <div class="row" :id="'row_' + movieParkName">
            <div class="col-4" :id="'leftColumn_' + movieParkName"></div>
            <div class="col-8" :id="'rightColumn_' + movieParkName"></div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            movieParkNameParam: String,
            movieParkSeancesListParam: Array
        },
        data() {
            return {
                movieParkName: this.movieParkNameParam,
                movieParkSeancesList: this.movieParkSeancesListParam
            }
        },
        created(){
            console.log('Start sorting seance list by seance start time.');
            console.log('_!!!!! input', this.movieParkSeancesList);
            this.movieParkSeancesList.sort(function(a, b) {
                console.log("seance_date_", a['seanceDate']);
                console.log("seance_date_", b['seanceDate']);
                let date1 = new Date(a['seanceDate'] + ' ' + a['startTime']);
                let date2 = new Date(b['seanceDate'] + ' ' + b['startTime']);
                if (date1 > date2) return 1;
                else if (date1 === date2) return 0;
                else return -1;
            });
            console.log('Finish sorting.');
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

                // remove seconds in 09:00:00
                seanceButton.textContent = seanceInfo['startTime'].substring(0,5);
                rightColumn.appendChild(seanceButton);
            }
        },
        methods: {
        }
    }
</script>
