<template>
    <div>
        <app-seance-schema-component
                :seance-id-param="seanceId"
                :seance-info-param="seanceInfo"
                 :places-block-info-param="placesBlockInfo">
        </app-seance-schema-component>
    </div>
</template>


<script>
    import {getSeancePlacesInfoById} from '../seance_schema_scripts.js'
    import {getSeanceInfoById} from '../seance_schema_scripts.js'
    import SeanceSchemaComponent from "../components/SeanceSchemaComponent";

    export default {
        data() {
            return {
                seanceId: this.$router.currentRoute.params['seanceId'],
                seanceInfo: {},
                placesBlockInfo: []
            }
        },
        created(){
            console.log("Get seance info by id: ", this.seanceId);
            getSeanceInfoById(this.$http, this.seanceId)
                .then(response => {
                    this.seanceInfo = response;
                });
            console.log("Check:", this.seanceInfo);

            console.log("Get seance places info by id: ", this.seanceId);
            getSeancePlacesInfoById(this.$http, this.seanceId)
                .then(response => {
                    this.placesBlockInfo = response;
                });
            console.log("Check:", this.placesBlockInfo);
        },
        methods: {
        },
        components: {
            appSeanceSchemaComponent: SeanceSchemaComponent
        }
    }
</script>
