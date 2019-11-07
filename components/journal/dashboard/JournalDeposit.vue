<template>
    <v-container>
        <v-card-title class="text-left justify-left">
            <h1 class="font-weight-regular subtitle-1" style="color:#b6b6b6;">Your Balance</h1>
        </v-card-title>
        <v-card-title class="justify-end py-0">
            <h1 class="font-weight-bold balance_amount" style="color:#b6b6b6;"><span class="font-weight-light caption">PHP</span> 0.00</h1>
        </v-card-title>
        <v-card-title class="text-left justify-left">
            <h1 class="font-weight-regular subtitle-1" style="color:#b6b6b6;">Enter Amount</h1>
        </v-card-title>
        <!-- <v-card-title class="justify-end py-1">
            <h1 class="font-weight-bold balance_amount" style="color:#b6b6b6;"><span class="font-weight-light caption">PHP</span> 0.00</h1>
        </v-card-title> -->
        <v-container class="py-0">
            <v-row>
                <v-col class="pa-0" cols="9" sm="9" md="9" offset-md="3" offset-sm="3">
                    <v-text-field
                        v-model="zeroNumber"
                        solo
                        dark
                        class="title font-weight-regular text-right white--text enter_deposit-amount"
                        background-color="#000"
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-container>
        <v-card-title class="text-left justify-left py-0">
            <h1 class="font-weight-regular subtitle-1" style="color:#b6b6b6;">From</h1>
        </v-card-title>
        <v-col class="pa-0" cols="9" sm="9" md="9" offset-md="3" offset-sm="3">
            <span class="custom-dropdown big">
                <v-select
                :items="items"
                label="Solo field"
                dense
                solo
                dark
                background-color="#000"
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
        }
    }
}
</script>
<style>
    .balance_amount {
        font-size: 23px
    }
    .enter_deposit-amount input {
        text-align: right;
        padding-bottom: 0;
        font-family: 'Karla';
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
</style>