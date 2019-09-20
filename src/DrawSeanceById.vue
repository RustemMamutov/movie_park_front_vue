<template>
    <div>
        <app-seance-schema-component :seance-id-param="seanceId"></app-seance-schema-component>
    </div>
</template>


<script>

    import SeanceSchemaComponent from "./SeanceSchemaComponent";

    export default {
        data() {
            return {
                seanceId: this.$router.currentRoute.params['seanceId']
            }
        },
        methods: {
        },
        components: {
            appSeanceSchemaComponent: SeanceSchemaComponent
        }

    }
</script>
