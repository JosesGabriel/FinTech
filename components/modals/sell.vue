<template>
    <v-container class="pa-0">
        <v-row no-gutters  class="pa-3 pb-0">
            <v-col cols="12" sm="12" md="12">
                <v-card-title class="pa-0 pb-1">
                    <!-- <h1 class="font-weight-regular body-2" style="color:#fff;">STOCK DETAILS</h1> -->
                    <v-col sm="6" md="6" class="pa-0">
                        <v-select offset-y="true" append-icon="mdi-chevron-down" class="stock_selector stock_selector-font-size" :items="stock" background-color="black" label="Select Stock" dense solo flat></v-select>
                    </v-col>
                    <v-spacer></v-spacer>
                    <p class="text-right ma-0 body-1" style="color:#b6b6b6">14.07 <span class="caption">.09</span><span class="caption">(1.90%)</span></p>
                </v-card-title>
                <v-row no-gutters class="px-2">
                    <v-col class="pa-0" cols="6" sm="6" md="6">
                        <v-simple-table :dense="true" dark id="liveportfolio-table">
                            <template v-slot:default>
                                <tbody>
                                    <tr id="table_tr_snap-cont">
                                        <td class="item_position-prop caption pa-0 px-1">Previous</td>
                                        <td class="item_position-prop caption text-right pa-0 px-1">{{ prev }}</td>
                                    </tr>
                                    <tr id="table_tr_snap-cont">
                                        <td class="item_position-prop caption pa-0 px-1" >Low</td>
                                        <td class="caption text-right pa-0 px-1" :class="valueStatusLow">{{ low }}</td>
                                    </tr>
                                    <tr id="table_tr_snap-cont">
                                        <td class="item_position-prop caption pa-0 px-1">52WKLow</td>
                                        <td class="caption text-right pa-0 px-1">{{ wklow }}</td>
                                    </tr>
                                    <tr id="table_tr_snap-cont">
                                        <td class="item_position-prop caption pa-0 px-1">Volume</td>
                                        <td class="item_position-prop caption text-right pa-0 px-1">{{ volm }}</td>
                                    </tr>
                                    <tr id="table_tr_snap-cont">
                                        <td class="item_position-prop caption pa-0 px-1">Trades</td>
                                        <td class="item_position-prop caption text-right pa-0 px-1">{{ trades }}</td>
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
                                        <td class="item_position-prop caption pa-0 px-1">Open</td>
                                        <td class="item_position-prop caption text-right pa-0 px-1">{{ open }}</td>
                                    </tr>
                                    <tr id="table_tr_snap-cont">
                                        <td class="item_position-prop caption pa-0 px-1">High</td>
                                        <td class="item_position-prop caption text-right pa-0 px-1">{{ high }}</td>
                                    </tr>
                                    <tr id="table_tr_snap-cont">
                                        <td class="item_position-prop caption pa-0 px-1">52WKHigh</td>
                                        <td class="item_position-prop caption text-right pa-0 px-1">{{ wkhigh }}</td>
                                    </tr>
                                    <tr id="table_tr_snap-cont">
                                        <td class="item_position-prop caption pa-0 px-1">Value</td>
                                        <td class="item_position-prop caption text-right pa-0 px-1">{{ vole }}</td>
                                    </tr>
                                    <tr id="table_tr_snap-cont">
                                        <td class="item_position-prop caption pa-0 px-1">Average</td>
                                        <td class="item_position-prop caption text-right pa-0 px-1">{{ ave }}</td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-col>
                </v-row>
                <div class="px-3">
                    <v-card-title class="pa-0 justify-center mt-2">
                        <h1 class="font-weight-regular caption" style="color:#fff;">Bid/ Ask Bar</h1>
                    </v-card-title>
                
                    <v-progress-linear
                        value="70"
                        background-color="#F44336"
                        color="#00FFC3"
                        height="5px"
                        class="mt-1"
                    ></v-progress-linear>
                    <v-card-title class="pa-0 justify-center mt-2">
                        <h1 class="font-weight-regular caption" style="color:#fff;">Members Sentiments</h1>
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
            <v-col cols="12" sm="12" md="12">
                <v-card-title class="pa-0 py-2">
                    <h1 class="font-weight-regular body-2" style="color:#fff;">TRADE DETAILS</h1>
                    <v-spacer></v-spacer>
                    <v-col sm="6" md="6" class="pa-0">
                        <v-select offset-y="true" class="stock_selector stock_selector-font-size white--text" append-icon="mdi-chevron-down" :items="stock" background-color="black" label="Portfolio" dense solo flat dark></v-select>
                    </v-col>
                </v-card-title>
                
                <v-row no-gutters class="px-0 py-0">
                    <v-col md="6" class="pr-3 py-0 justify-right d-flex align-center text-right">
                        <!-- <v-card-title class="pa-0 text-right">
                            <p class="text-right ma-0 body-2" style="color:#00FFC3;width: 65px;">Buy Price</p>
                        </v-card-title> -->
                        <v-text-field
                            label="Buy Price"
                            placeholder="Enter Buy Price"
                            color="#00FFC3"
                            style="color: #00FFC3"
                            dark
                            class="caption stock_selector quantity-input"
                            v-model="buyprice"
                        ></v-text-field>
                        <!-- <v-text-field
                            solo
                            background-color="black"
                            color="white"
                            dark
                            class="stock_selector pl-1 text-right confirmation_message-confirm"
                            dense
                        ></v-text-field> -->
                    </v-col>
                    <v-col md="6" class="pl-1 py-0 justify-right d-flex align-center text-right">
                        <!-- <v-card-title class="pa-0 text-right" width="100px">
                            <p class="text-right ma-0 body-2" style="color:#00FFC3;width: 65px;">Quantity</p>
                        </v-card-title>
                        <v-text-field
                            solo
                            background-color="black"
                            dark
                            class="stock_selector pl-1 text-right confirmation_message-confirm"
                            dense
                        ></v-text-field> -->
                        <v-text-field
                            label="Quantity"
                            placeholder="Enter Quantity"
                            color="#00FFC3"
                            style="color: #00FFC3"
                            dark
                            class="caption stock_selector buy_price-input"
                            v-model="quantity"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-card-title class="pa-0 py-2">
                    <p class="text-right ma-0 caption" style="color:#b6b6b6">Available Funds: <span style="color:#b6b6b6">320.30M</span></p>
                    <v-spacer></v-spacer>
                    <p class="text-right ma-0 caption" style="color:#b6b6b6">Total Cost: <span style="color:#b6b6b6">0.00</span></p>
                </v-card-title>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            stock: ['2GO','PHEN','ROCK','HLCM'],
            prev: '100,000,000.00',
            low: '0',
            wklow: '0',
            volm: '100,000,000.00',
            trades: '0',
            open: '100,000,000.00',
            high: '0',
            wkhigh: '0',
            vole: '100,000,000.00',
            ave: '0',

            buyprice: '0.00',
            quantity: '0.00',
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
    .stock_selector .v-input__control {
        min-height: auto !important;
    }
    .separator {
        display: block;
        height: 1px;
        background: #000;
    }
    .confirmation_message-confirm input {
        text-align: right;
    }
</style>