<template>
    <v-dialog v-model="show" max-width="320px">
        <v-card color="#00121E">
            <v-card-title class="text-left justify-left pa-5 pb-0 px-5 success--text subtitle-1 font-weight-bold">TRADE</v-card-title>
            <v-stepper v-model="e1" dark id="stepper_container">
                <v-stepper-items>
                    <v-stepper-content step="1">
                        <!-- -----First View of Trade Modal----- -->
                        <v-container class="pa-5 pt-0 px-0">
                            <v-row no-gutters>
                                <v-col cols="12" sm="12" md="12">
                                    <v-card-title class="pa-0 text-right justify-end">
                                        <v-col sm="12" md="12" class="pa-0">
                                            <v-select offset-y="true" item-color="success" color="success" class="pa-0 ma-0" append-icon="mdi-chevron-down" :items="stocklist" v-model="GetSelectStock" label="Select Stock"></v-select>
                                        </v-col>
                                    </v-card-title>
                                        <p class="text-left ma-0 caption" style="color:#b6b6b6">Current Price</p>
                                        <v-spacer></v-spacer>
                                        <p class="text-right ma-0 body-1 current_price-field" style="color:#b6b6b6">14.07 <span class="caption">.09</span><span class="caption">(1.90%)</span></p>
                                    <v-row no-gutters class="mt-2">
                                        <v-col class="pa-0" cols="6" sm="6" md="6">
                                            <v-simple-table :dense="true" dark id="liveportfolio-table">
                                                <template v-slot:default>
                                                    <tbody>
                                                        <tr id="table_tr_snap-cont">
                                                            <td class="item_position-prop body-2 py-1 px-1">Previous</td>
                                                            <td class="item_position-prop body-2 text-right pa-0 px-1">{{ prev }}</td>
                                                        </tr>
                                                        <tr id="table_tr_snap-cont">
                                                            <td class="item_position-prop body-2 py-1 px-1" >Low</td>
                                                            <td class="body-2 text-right py-1 px-1" :class="valueStatusLow">{{ low }}</td>
                                                        </tr>
                                                        <tr id="table_tr_snap-cont">
                                                            <td class="item_position-prop body-2 py-1 px-1">52WKLow</td>
                                                            <td class="body-2 text-right py-1 px-1">{{ wklow }}</td>
                                                        </tr>
                                                        <tr id="table_tr_snap-cont">
                                                            <td class="item_position-prop body-2 py-1 px-1">Volume</td>
                                                            <td class="item_position-prop body-2 text-right py-1 px-1">{{ volm }}</td>
                                                        </tr>
                                                        <tr id="table_tr_snap-cont">
                                                            <td class="item_position-prop body-2 py-1 px-1">Trades</td>
                                                            <td class="item_position-prop body-2 text-right py-1 px-1">{{ trades }}</td>
                                                        </tr>
                                                    </tbody>
                                                </template>
                                            </v-simple-table>
                                        </v-col>
                                        <v-col class="pa-0" cols="6" sm="6" md="6">
                                            <v-simple-table :dense="true" dark id="liveportfolio-table">
                                                <template v-slot:default>
                                                    <tbody>
                                                        <tr id="table_tr_snap-cont">
                                                            <td class="item_position-prop body-2 py-1 px-1">Open</td>
                                                            <td class="item_position-prop body-2 text-right py-1 px-1">{{ open }}</td>
                                                        </tr>
                                                        <tr id="table_tr_snap-cont">
                                                            <td class="item_position-prop body-2 py-1 px-1">High</td>
                                                            <td class="item_position-prop body-2 text-right py-1 px-1">{{ high }}</td>
                                                        </tr>
                                                        <tr id="table_tr_snap-cont">
                                                            <td class="item_position-prop body-2 py-1 px-1">52WKHigh</td>
                                                            <td class="item_position-prop body-2 text-right py-1 px-1">{{ wkhigh }}</td>
                                                        </tr>
                                                        <tr id="table_tr_snap-cont">
                                                            <td class="item_position-prop body-2 py-1 px-1">Value</td>
                                                            <td class="item_position-prop body-2 text-right py-1 px-1">{{ vole }}</td>
                                                        </tr>
                                                        <tr id="table_tr_snap-cont">
                                                            <td class="item_position-prop body-2 py-1 px-1">Average</td>
                                                            <td class="item_position-prop body-2 text-right py-1 px-1">{{ ave }}</td>
                                                        </tr>
                                                    </tbody>
                                                </template>
                                            </v-simple-table>
                                        </v-col>
                                    </v-row>
                                    <div class="px-3">
                                        <v-card-title class="pa-0 justify-center mt-3">
                                            <h1 class="font-weight-thin caption" style="color:#fff;">Bid/ Ask Bar</h1>
                                        </v-card-title>
                                    
                                        <v-progress-linear
                                            value="70"
                                            background-color="#F44336"
                                            color="#00FFC3"
                                            height="5px"
                                            class="mt-1"
                                        ></v-progress-linear>
                                        <v-card-title class="pa-0 justify-center mt-3">
                                            <h1 class="font-weight-thin caption" style="color:#fff;">Members Sentiments</h1>
                                        </v-card-title>
                                        <v-progress-linear
                                            value="50"
                                            background-color="#F44336"
                                            color="#00FFC3"
                                            height="5px"
                                            class="mt-1 mb-1"
                                        ></v-progress-linear>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-container>
                        <v-row no-gutters>
                        <v-spacer></v-spacer>
                            <v-btn text @click.stop="show=false" class="text-capitalize">Close</v-btn>
                            <v-btn
                                color="success ml-1"
                                @click="e1 = 2"
                                class="text-capitalize black--text"
                                light
                            >
                                Continue
                            </v-btn>
                        </v-row>
            
                    </v-stepper-content>
                    <v-stepper-content step="2" class="pt-2">
                        <!-- -----Second View of Trade Modal----- -->
                        <v-container class="pa-5 pt-0 px-0">
                            <v-row no-gutters>
                                <v-tabs
                                color="#48FFD5"
                                background-color="#00121E"
                                dark
                                grow
                                >
                                    <v-tab color="#fff" class="tab_menu-top text-capitalize subtitle-1 px-0" width="100" :href="`#funds-1`">Buy</v-tab>
                                    <v-tab color="#fff" class="tab_menu-top text-capitalize subtitle-1 px-0" :href="`#funds-2`">Sell</v-tab>
<!--                                     
                                    <v-dialog
                                        ref="dialog"
                                        v-model="modal"
                                        :return-value.sync="date"
                                        persistent
                                        width="290px"
                                    >
                                    <template v-slot:activator="{ on }">
                                        <v-btn v-on="on" text class="calendate-btn" color="#00FFC3">
                                            <span class="text-capitalize">Date: </span>
                                            <v-card-text class="pa-0" v-html="date"></v-card-text>
                                        </v-btn>
                                    </template>
                                    <v-date-picker v-model="date" color="#00121e" dark scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                                    </v-date-picker>
                                    </v-dialog> -->

                                    <v-tab-item dark color="#48FFD5" class="active-class" background-color="#0c1f33" :value="'funds-' + 1">
                                        <BuyTrade/>
                                    </v-tab-item>
                                    <v-tab-item dark color="#48FFD5" background-color="#0c1f33" :value="'funds-' + 2">
                                        <SellTrade/>
                                    </v-tab-item>
                                </v-tabs>
                            </v-row>
                        </v-container>
                        <v-row no-gutters>
                        <v-spacer></v-spacer>
                            <v-btn text @click="e1 = 1" class="text-capitalize">Back</v-btn>
                            <v-btn
                                color="success"
                                @click="e1 = 3"
                                class="text-capitalize black--text ml-1"
                                light
                            >
                                Continue
                            </v-btn>
                        </v-row>
                    </v-stepper-content>
            
                    <v-stepper-content step="3" class="pt-2">
                        <v-container class="pt-0">
                            <v-row no-gutters class="px-0 py-0">
                                <v-col sm="12" md="12">
                                    <div><v-select offset-y="true" item-color="success" append-icon="mdi-chevron-down" class="mb-1" :items="strategy" label="Strategy" dense flat></v-select></div>
                                    <div><v-select offset-y="true" item-color="success" append-icon="mdi-chevron-down" class="mb-1" :items="tradeplan" label="Trade Plan" dense flat></v-select></div>
                                    <div><v-select offset-y="true" item-color="success" append-icon="mdi-chevron-down" :items="emotions" label="Emotions" dense flat></v-select></div>
                                </v-col>
                                <v-col cols="12" sm="12" md="12" class="pa-0 mt-3 justify-right d-flex align-center text-right">
                                    <v-textarea
                                        color="white"
                                        class="white--text trading_notes-textarea body-2"
                                        placeholder="Trading Notes"
                                        filled
                                    ></v-textarea>
                                </v-col>
                            </v-row> 
                        </v-container>
                        <v-row no-gutters>
                            <v-spacer></v-spacer>
                            <v-btn text @click="e1 = 2" class="text-capitalize">Back</v-btn>
                            <v-btn
                                color="success"
                                @click.stop="show=false"
                                @click="e1 = 1"
                                class="text-capitalize black--text ml-1"
                                light
                            >
                                Confirm
                            </v-btn>
                        </v-row>
                    </v-stepper-content>
                </v-stepper-items>
                </v-stepper>
        </v-card>
    </v-dialog>
</template>
<script>

import BuyTrade from '~/components/modals/buy'
import SellTrade from '~/components/modals/sell'
import { mapActions, mapGetters } from "vuex";


    export default {
        props: ['visible'],
        components: {
            BuyTrade,
            SellTrade
        },
        data() {
            return {
                e1: 1,
                stocklist: [],
                prev: '0',
                low: 122,
                wklow: 0,
                volm: '0',
                trades: '0',
                open: '0',
                high: 121,
                wkhigh: '0',
                vole: '0',
                ave: '0',
                
                hideElement: true,
                GetSelectStock: '',

                strategy: ['Bottom Picking','Breakout Play','Trend Following','1-2-3 Reversal'],
                tradeplan: ['Day Trade','Swing Trade','Investments'],
                emotions: ['Neutral','Greedy','Fearful'],

                date: new Date().toISOString().substr(0, 10),
                menu: false,
                modal: false,
            }
        },
        computed: {
            ...mapGetters({
                userWatchedStocks: "watchers/getUserWatchedStocks",
                renderChartKey: "watchers/getRenderChartKey"
            }),
            show: {
                get () {
                    return this.visible
                },
                set (value) {
                    if (!value) {
                    this.$emit('close')
                    }
                }
            },
            valueStatusLow: function(){
                return {
                    highnum: this.low > this.high,
                    lownum: this.low < this.high,
                    equalnum: this.low == this.high
                }
            }
        }
    }
</script>
<style>
    .stock_selector .v-select__slot .v-label,
    .stock_selector .v-select__slot .v-icon {
        color: #00FFC3 !important;
    }
    .stock_selector .v-input__slot {
        margin: 0;
    }
    .stock_selector .v-select__selection--comma {
        color: #00FFC3;
        font-size: 12px;
    }
    .stock_selector .v-input__control {
        min-height: auto !important;
    }
    .calendate-btn {
        margin-top: 6px;
        margin-right: 6px;
    }
    .current_price-field {
        border-bottom: 1px solid #b6b6b6;
    }
    #stepper_container {
        box-shadow: none;
        background-color: transparent;
    }
</style>