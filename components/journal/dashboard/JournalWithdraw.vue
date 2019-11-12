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
            v-model="widthrawAmount"
            readonly
        ></v-text-field>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            zeroNumber: '0.00',
            items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
            quantity: '0.00',
            widthrawAmount: '0.00'
        }
    }
}
</script>
<style scoped>
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