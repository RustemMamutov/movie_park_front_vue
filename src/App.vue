<template>
    <div>
        <router-view></router-view>
<!--        <input v-model="seanceId" placeholder="Введите номер сеанса" style="margin:40px;">-->
<!--        <button class="btn btn-primary" @click="goToPage" style="margin-right:40px;">Go TO PAGE</button>-->
        <app-seance-schema :seance-id-param="1"></app-seance-schema>
    </div>
</template>


<script>

    import SeanceSchema from "./SeanceSchema";

    export default {
        data() {
            return {
                seanceId: 1
            }
        },
        // methods: {
        //     goToPage() {
        //         this.$router.push({ path: '/page2'})
        //     }
        // },
        components: {
            appSeanceSchema: SeanceSchema
        }

    }
</script>
