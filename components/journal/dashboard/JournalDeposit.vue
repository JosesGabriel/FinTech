<template>
    <v-container class="pa-0">
        <div class="separator"></div>
        <div class="py-3">
            <p class="text-left ma-0 caption" style="color:#b6b6b6">Available Funds</p>
            <v-spacer></v-spacer>
            <p class="text-right ma-0 body-1 current_price-field white--text">300,000,000.00</p>
        </div>
        <v-text-field
            label="Enter Amount"
            color="#00FFC3"
            style="color: #00FFC3"
            dark
            class="body-1 buy_selector quantity-input py-3"
            v-model="enterAmount"
            readonly
        ></v-text-field>
        <v-col class="pa-0">
            <span class="custom-dropdown big">
                <v-select
                :items="items"
                label="Fund Source"
                color="#00FFC3"
                item-color="success"
                dense
                dark
                class="enter_amount-deposit-select ma-0"
                ></v-select>
            </span>
        </v-col>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            zeroNumber: '0.00',
            items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
            quantity: '0.00',
            enterAmount: '0.00'
        }
    }
}
</script>
<style>
    .balance_amount {
        font-size: 23px
    }
    .v-text-field__details {
        display: none
    }
    .v-menu__content .v-card, .v-menu__content .v-list {
        background: #000 !important;
    }
    .v-menu__content .v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
        color: #00FFC3 !important;
    }
    .v-select__slot .v-label,
    .v-select__slot .v-icon
    {
        color: #00FFC3 !important;
    }
    .enter_amount-deposit.stock_selector {
        font-family: 'Karla' !important
    }
    .enter_amount-deposit.stock_selector input {
        text-align: right;
    }
</style>