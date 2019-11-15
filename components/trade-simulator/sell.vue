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
                        <v-btn 
                            @click="(quantity <= 0 || quantity < 10 ? 0 : quantity = parseInt(quantity) - 10)"
                            text 
                            icon 
                            color="primary"
                        ><v-icon>mdi-minus</v-icon></v-btn>
                        <v-btn 
                            @click="quantity = parseInt(quantity) + 10"
                            text 
                            icon 
                            color="primary"
                        ><v-icon>mdi-plus</v-icon></v-btn>
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
            portfolio: ['Real Portfolio','Virtual Portfolio'],
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