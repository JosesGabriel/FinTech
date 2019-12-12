<template>
    <v-dialog v-model="show" max-width="320px">
        <v-card color="#00121E">
            <v-card-title class="text-center justify-center pa-5 pt-8 success--text text-uppercase subtitle-1 font-weight-bold">THIS IS PERMANENT</v-card-title>
            <v-card-title class="text-center justify-center pa-0 secondary--text subtitle-1 font-weight-bold">Are you sure you want to delete?</v-card-title>
            <v-container class="px-5">
                <v-row no-gutters>
                    <v-spacer></v-spacer>
                    <v-btn
                    color="success"
                    class="text-capitalize mt-2"
                    depressed
                    text
                    light
                    @click.stop="show = false"
                    >Close</v-btn>
                    <v-btn
                    color="success"
                    class="ml-1 text-capitalize mt-2 black--text"
                    depressed
                    light
                    @click="deleteNow"
                    @click.stop="show = false"
                    >Delete</v-btn>
                </v-row>
            </v-container>
        </v-card>
    </v-dialog>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
    props: ['visible', 'itemDetails'],
    data() {
        return {
            details: null,
            transaction_id: null,
        }
    },
    computed: {
        ...mapGetters({
            renderEditKey: "journal/getRenderEditKey"
        }),
        show: {
            get () {
                if (this.visible){
                    this.details = this.itemDetails
                    this.transaction_id = this.itemDetails.id
                }
                return this.visible
            },
            set (value) {
                if (!value) {
                    this.$emit('close')
                }
            }
        }
    },
    methods: {
        ...mapActions({
            setRenderEditKey: "journal/setRenderEditKey",
        }),
        deleteNow() {
            const deleteSellLogs = {
                user_id: "2d5486a1-8885-47bc-8ac6-d33b17ff7b58",
            };
            this.$axios
                .$post("https://dev-api.arbitrage.ph/api/journal/funds/tradelog/delete/"+this.transaction_id,deleteSellLogs)
                .then(response => {
                    if (response.success) {
                        this.keyCreateCounter = this.renderEditKey;
                        this.keyCreateCounter++;
                        this.setRenderEditKey(this.keyCreateCounter);
                    }
                });
        }
    }
}
</script>