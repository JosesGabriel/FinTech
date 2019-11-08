<template>
    <v-container>
        <v-card-title class="text-left justify-left px-0">
            <h1 class="font-weight-regular subtitle-1" style="color:#b6b6b6;">Your Balance</h1>
        </v-card-title>
        <v-card-title class="justify-end pa-0">
            <h1 class="font-weight-bold balance_amount white--text"><span class="font-weight-light caption" style="color: #b6b6b6">PHP</span> 100,000,000.00</h1>
        </v-card-title>
        <v-card-title class="text-left justify-left px-0">
            <h1 class="font-weight-regular subtitle-1" style="color:#b6b6b6;">Enter Amount</h1>
        </v-card-title>
        <!-- <v-card-title class="justify-end py-1">
            <h1 class="font-weight-bold balance_amount" style="color:#b6b6b6;"><span class="font-weight-light caption">PHP</span> 0.00</h1>
        </v-card-title> -->
        <v-col class="pa-0" cols="12" sm="12" md="12">
            <v-text-field
                placeholder="Enter Quantity"
                color="#fff"
                style="color: #fff"
                dark
                class="stock_selector enter_amount-deposit pa-0 pb-5 font-weight-bold headline white--text"
                v-model="quantity"
            ></v-text-field>
        </v-col>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            zeroNumber: '0.00',
            items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
            quantity: '0.00'
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