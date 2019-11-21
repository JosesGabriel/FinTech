<template>
    <v-container class="pa-0">
        <div class="separator"></div>
        <v-row no-gutters class="pa-3 pb-0">
            <v-col cols="12" sm="12" md="12">
                <v-row no-gutters class="px-0 py-0">
                    <v-col sm="12" md="12" class="pa-0">
                        <v-select offset-y="true" item-color="success" append-icon="mdi-chevron-down" color="success" class="mt-0 py-3" :items="portfolio" label="Portfolio" dense flat dark></v-select>
                    </v-col>
                    <v-col cols="12" sm="12" md="12" class="py-0 justify-right d-flex align-center text-right">
                        <v-text-field
                            label="Sell Price"
                            placeholder="Enter Sell Price"
                            color="#00FFC3"
                            style="color: #00FFC3"
                            dark
                            class="caption buy_selector quantity-input py-3"
                            :value= this.simulatorBuyPrice
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12" class="py-0 justify-right d-flex align-center text-right">
                        <v-text-field
                            label="Quantity"
                            placeholder="Enter Quantity"
                            color="#00FFC3"
                            style="color: #00FFC3"
                            type=number
                            dark
                            class="caption buy_selector buy_price-input py-3"
                            v-model="quantity"
                        ></v-text-field>
                        <v-btn 
                            @click="minusButton"
                            text 
                            icon 
                            color="primary"
                        ><v-icon>mdi-minus</v-icon></v-btn>
                        <v-btn 
                            @click="addButton"
                            text 
                            icon 
                            color="primary"
                        ><v-icon>mdi-plus</v-icon></v-btn>
                    </v-col>
                    <v-col class="ma-0 pa-0" style="color: #90989d;position: absolute;font-size:12px; top:265px; left:211px;width: 95px;">
                        BoardLot : <span>{{ this.simulatorBoardLot }}</span>
                    </v-col>
                </v-row>
                <v-card-title class="pa-0 py-2">
                    <p class="text-right ma-0 caption" style="color:#b6b6b6">Available Funds: <span style="color:#b6b6b6">320.30M</span></p>
                    <v-spacer></v-spacer>
                    <p class="text-right ma-0 caption" style="color:#b6b6b6">Total Cost: <span style="color:#b6b6b6">{{ this.totalCost }}</span></p>
                </v-card-title>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    data() {
        return {
            quantity: '0.00',
            availableFunds: '320,000,000.00',
            totalCost: 0,
            portfolio: ['Real Portfolio','Virtual Portfolio']
        }
    },
    computed: {
    ...mapGetters({
      simulatorBuyPrice: "tradesimulator/getSimulatorBuyPrice",
      simulatorBoardLot: "tradesimulator/getSimulatorBoardLot"
    })
  },
    methods: {
    ...mapActions({
        setSimulatorBuyPrice: "tradesimulator/setSimulatorBuyPrice",
        setSimulatorBoardLot: "tradesimulator/setSimulatorBoardLot"
    }),
    addButton(){
        this.quantity = parseInt(this.quantity) + parseInt(this.simulatorBoardLot);
        let add = parseFloat(this.quantity).toFixed(2) * parseFloat(this.simulatorBuyPrice);
        this.totalCost = this.addcomma(add);
    },
    minusButton(){
        this.quantity = (this.quantity <= 0 || this.quantity < parseInt(this.simulatorBoardLot) ? 0 : this.quantity = parseInt(this.quantity) - parseInt(this.simulatorBoardLot));
        let min = parseFloat(this.quantity).toFixed(2) * parseFloat(this.simulatorBuyPrice);
        this.totalCost = this.addcomma(min);
    },
    addcomma(n, sep, decimals) {
	    sep = sep || "."; // Default to period as decimal separator
	    decimals = decimals || 2; // Default to 2 decimals
	    return n.toLocaleString().split(sep)[0]
	        + sep
	        + n.toFixed(2).split(sep)[1];
	},
  },
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