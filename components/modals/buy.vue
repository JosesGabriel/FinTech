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
                            label="Buy Price"
                            placeholder="Enter Buy Price"
                            color="#00FFC3"
                            style="color: #00FFC3"
                            dark
                            class="caption buy_selector quantity-input py-3"
                            v-model="buyprice"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12" class="py-0 justify-right d-flex align-center text-right">
                        <v-text-field
                            label="Quantity"
                            placeholder="Enter Quantity"
                            color="#00FFC3"
                            style="color: #00FFC3"
                            dark
                            class="caption buy_selector buy_price-input py-3"
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
            buyprice: '0.00',
            quantity: '0.00',
            portfolio: ['Real Portfolio','Virtual Portfolio'],
            strategy: ['Bottom Picking','Breakout Play','Trend Following','1-2-3 Reversal'],
            tradeplan: ['Day Trade','Swing Trade','Investments'],
            emotions: ['Neutral','Greedy','Fearful'],
        }
    }
}
</script>
<style>
    .highnum{
        color: #00FFC3;
    }
    .lownum {
        color: #F44336;
    }
    .equalnum {
        color: #b6b6b6;
    }
    .buy_selector .v-select__slot .v-label,
    .buy_selector .v-select__slot .v-icon {
        color: #00FFC3 !important;
    }
    .buy_selector .v-input__slot {
        margin: 0;
    }
    .buy_selector .v-select__selection--comma {
        color: #00FFC3;
        font-size: 14px;
    }
    .buy_selector .v-input__control {
        min-height: auto !important;
    }
    .buy_selector-font-size .v-label {
        font-size: 14px
    }
    .separator {
        display: block;
        height: 1px;
        background: #000;
    }
    .confirmation_message-confirm input {
        text-align: right;
    }
    .v-textarea.trading_notes-textarea .v-text-field__slot textarea {
        margin: 0;
    }
    .buy_price-input input,
    .quantity-input input {
        text-align: right
    }
</style>