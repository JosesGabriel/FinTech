<template>
    <v-dialog v-model="show" max-width="320px">
        <v-card :dark="lightSwitch == true">
            <v-card-title class="text-left justify-left pa-3 px-5 success--text text-uppercase subtitle-1 font-weight-bold">Edit Details</v-card-title>
            <v-container class="px-5">
                <v-row no-gutters>
                    <v-col class="px-5" cols="12" sm="12" md="12">
                        <div>
                            <v-select
                            v-model="strategyModel"
                            offset-y="true"
                            item-color="success"
                            append-icon="mdi-chevron-down"
                            class="mb-1"
                            :items="strategy"
                            label="Select Strategy"
                            dense
                            flat
                            :dark="lightSwitch == true"
                            ></v-select>
                        </div>
                        <div>
                            <v-select
                            v-model="tradeplanModel"
                            offset-y="true"
                            item-color="success"
                            append-icon="mdi-chevron-down"
                            class="mb-1"
                            :items="tradeplan"
                            label="Select Trade Plan"
                            dense
                            flat
                            :dark="lightSwitch == true"
                            ></v-select>
                        </div>
                        <div>
                            <v-select
                            v-model="emotionsModel"
                            offset-y="true"
                            item-color="success"
                            append-icon="mdi-chevron-down"
                            :items="emotions"
                            label="Select Emotions"
                            dense
                            flat
                            :dark="lightSwitch == true"
                            ></v-select>
                        </div>
                        <div>
                            <v-textarea
                            color="white"
                            class="white--text trading_notes-textarea body-2 mt-3"
                            v-model="notesModel"
                            placeholder="Trading Notes"
                            filled
                            :dark="lightSwitch == true"
                            ></v-textarea>
                        </div>
                    </v-col>
                </v-row>
                <v-row no-gutters class="mt-5">
                    <v-spacer></v-spacer>
                    <v-btn
                    color="success"
                    class="text-capitalize"
                    depressed
                    text
                    light
                    @click.stop="show = false"
                    >Close</v-btn>
                    <v-btn
                    color="success"
                    class="text-capitalize ml-1 black--text"
                    depressed
                    light
                    @click="editNow"
                    @click.stop="show = false"
                    >Save</v-btn>
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
            strategy: [ "Bottom Picking", "Breakout Play", "Trend Following", "1-2-3 Reversal" ],
            strategyModel: null,
            tradeplan: ["Day Trade", "Swing Trade", "Investments"],
            tradeplanModel: null,
            emotions: ["Neutral", "Greedy", "Fearful"],
            emotionsModel: null,
            notesModel: "",
            fund: null,
            stockid: null,
        }
    },
    computed: {
        ...mapGetters({
            renderEditKey: "journal/getRenderEditKey",
            lightSwitch: "global/getLightSwitch"
        }),
        show: {
            get () {
                if (this.visible){
                    this.details = this.itemDetails
                    this.strategyModel = this.itemDetails.metas.strategy
                    this.tradeplanModel = this.itemDetails.metas.plan
                    this.emotionsModel = this.itemDetails.metas.emotion
                    this.notesModel = this.itemDetails.metas.notes
                    this.fund = this.itemDetails.fund
                    this.stockid = this.itemDetails.action
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
    mounted() {
    },
    methods: {
        ...mapActions({
            setRenderEditKey: "journal/setRenderEditKey",
        }),
        editNow() {
            const edittradeparams = {
                strategy: this.strategyModel,
                plan: this.tradeplanModel,
                emotion: this.emotionsModel,
                notes: this.notesModel
            };
            this.$axios
                .$post("https://dev-api.arbitrage.ph/api/journal/funds/"+this.fund+"/update/"+this.stockid,edittradeparams)
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