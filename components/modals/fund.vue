
<template>
    <v-dialog v-model="show" max-width="320px">
        <v-card color="#00121E">
            <v-card-title class="text-left justify-left pa-3 px-5 success--text subtitle-1 font-weight-bold">FUND</v-card-title>
            <v-tabs
            color="#48FFD5"
            background-color="#00121E"
            class="px-7"
            dark
            grow
            >
                <v-tab color="#fff" class="tab_menu-top text-capitalize subtitle-1" :href="`#funds-1`">Deposit</v-tab>
                <v-tab color="#fff" class="tab_menu-top text-capitalize subtitle-1" :href="`#funds-2`">Withdraw</v-tab>

                <v-tab-item dark color="#48FFD5" background-color="#0c1f33" class="active-class" :value="'funds-' + 1">
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
                </v-tab-item>
                <v-tab-item dark color="#48FFD5" background-color="#0c1f33" :value="'funds-' + 2">
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
                </v-tab-item>
            </v-tabs>
            <v-card-actions class="pa-5">
                <v-spacer></v-spacer>
                <v-btn
                    color="white"
                    class="text-capitalize"
                    text
                    @click.stop="show=false"
                    >Close</v-btn
                >
                <v-btn
                    color="#48FFD5"
                    class="text-capitalize"
                    depressed
                    light
                    @click.stop="show=false"
                    >Save</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
  props: ['visible'],
  computed: {
    show: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  },
  data() {
    return {
      // data for withdraw
      zeroNumber: '0.00',
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      quantity: '0.00',
      widthrawAmount: '0.00',
      // data for deposit
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