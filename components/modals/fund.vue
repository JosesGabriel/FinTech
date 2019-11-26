
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
                <v-tab color="#fff" class="tab_menu-top text-capitalize subtitle-1" :href="`#funds-1`" @click="hideWithdrawButton = false, hideDepositButton = true">Deposit</v-tab>
                <v-tab color="#fff" class="tab_menu-top text-capitalize subtitle-1" :href="`#funds-2`" @click="hideWithdrawButton = true, hideDepositButton = false">Withdraw</v-tab>

                <v-tab-item dark color="#48FFD5" background-color="#0c1f33" class="active-class" :value="'funds-' + 1">
                    <v-container class="pa-0">
                      <div class="separator"></div>
                        <v-row no-gutters>
                            <v-card-title class="subtitle-1 px-0 py-2 secondary--text">Available Funds</v-card-title><v-spacer></v-spacer><v-card-title class="subtitle-1 px-0 py-2 secondary--text">{{ nFormatter(availableFunds) }}</v-card-title>
                        </v-row>
                      <v-text-field
                          label="Enter Amount"
                          color="#00FFC3"
                          style="color: #00FFC3"
                          dark
                          class="body-1 buy_selector quantity-input py-3"
                          v-model="enterAmount"
                      ></v-text-field>
                      <v-col class="pa-0">
                          <span class="custom-dropdown big">
                              <v-select
                              :items="items"
                              v-model="fundSourceModel"
                              item-text="name"
                              item-value="funds_source"
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
                        <v-row no-gutters>
                            <v-card-title class="subtitle-1 px-0 py-2 secondary--text">Available Funds</v-card-title><v-spacer></v-spacer><v-card-title class="subtitle-1 px-0 py-2 secondary--text">{{ nFormatter(availableFunds) }}</v-card-title>
                        </v-row>
                      <v-text-field
                          label="Enter Amount"
                          color="#00FFC3"
                          style="color: #00FFC3"
                          dark
                          class="body-1 buy_selector quantity-input py-3"
                          v-model="withrawAmount"
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
                    @click.stop="show = false"
                    >Close</v-btn
                >
                    <!-- @click.stop="show=false" -->
                <v-btn
                    color="#48FFD5"
                    class="text-capitalize"
                    depressed
                    light
                    v-show="hideDepositButton"
                    @click="depositNow"
                    @click.stop="show = false"
                    :disabled="disableButtonSave"
                    >Save1</v-btn
                >
                <v-btn
                    color="#48FFD5"
                    class="text-capitalize"
                    depressed
                    light
                    v-show="hideWithdrawButton"
                    @click="withdrawNow"
                    @click.stop="show = false"
                    :disabled="disableWithdrawButtonSave"
                    >Save2</v-btn
                >
                    <!-- @click.stop="show=false" -->
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

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
    },
    ...mapGetters({
        defaultPortfolioId: "journal/getDefaultPortfolioId",
        renderPortfolioKey: "journal/getRenderPortfolioKey",
        selectedPortfolio: "journal/getSelectedPortfolio"
    }),
    
  },
  data() {
    return {
      // data for withdraw
      availableFunds: 0,
      withrawAmount: "0.00",
      // data for deposit
      items: [{funds_source: "dividend_income", name: "Dividend Income"}, {funds_source: "deposit", name: "Fresh Funds"}],
      quantity: '0.00',
      enterAmount: '0.00',
      fundSourceModel: null,
      disableButtonSave: true,
      disableWithdrawButtonSave: true,
      hideWithdrawButton: false,
      hideDepositButton: true,

      snackbar: false,
      timeoutNotification: 10000,
    }
  },
  mounted() {
    this.availableFunds = parseFloat(this.selectedPortfolio.balance);
  },
  methods: {
    renderPortfolioKey1() {
        this.availableFunds = parseFloat(this.selectedPortfolio.balance);
    },
    depositNow() {
        console.log(parseFloat(this.enterAmount.replace(/,/g, "")),this.fundSourceModel)
        const depositparams  = {
            user_id: "2d5486a1-8885-47bc-8ac6-d33b17ff7b58",
            total_value: parseFloat(this.enterAmount.replace(/,/g, "")),
            action: this.fundSourceModel
        };
        this.$axios
        .$post("https://dev-api.arbitrage.ph/api/journal/funds/"+this.defaultPortfolioId+"/transactions/deposit",depositparams)
        .then(response => {
          if (response.success) {
            //   this.snackbar = true
          }
        });
    },
    withdrawNow() {
        const depositparams  = {
            user_id: "2d5486a1-8885-47bc-8ac6-d33b17ff7b58",
            total_value: parseInt(this.withrawAmount.replace(/,/g, ""))
        };
        this.$axios
        .$post("https://dev-api.arbitrage.ph/api/journal/funds/"+this.defaultPortfolioId+"/transactions/withdraw",depositparams)
        .then(response => {
          if (response.success) {
            //   this.snackbar = true
          }
        });
    },
    enterAmountWatch: function(newValue) {
        if(parseInt(this.enterAmount.replace(/,/g, "")) > 0 && this.fundSourceModel != null){
            this.disableButtonSave = false
        } else {
            this.disableButtonSave = true
        }
    },
    fundSourceWatch: function() {
        if(parseInt(this.enterAmount.replace(/,/g, "")) > 0 && this.fundSourceModel != null){
            this.disableButtonSave = false
        } else {
            this.disableButtonSave = true
        }
    },
    withrawAmountWatch: function() {
        if(parseInt(this.withrawAmount.replace(/,/g, "")) > 0){
            this.disableWithdrawButtonSave = false
        } else {
            this.disableWithdrawButtonSave = true
        }
    },
    nFormatter(num) {
      if (num >= 1000000000) {
        return (num / 1000000000).toFixed(2).replace(/\.0$/, "") + "B";
      }
      if (num >= 1000000) {
        return (num / 1000000).toFixed(2).replace(/\.0$/, "") + "M";
      }
      if (num >= 1000) {
        return (num / 1000).toFixed(2).replace(/\.0$/, "") + "K";
      }
      return num;
    },
  },
  watch: {
    renderPortfolioKey: function() {
        this.renderPortfolioKey1();
    },
    enterAmount: function(newValue) {
        const result = newValue.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.enterAmount = result;
        this.enterAmountWatch();
    },
    withrawAmount: function(newValue) {
        const result = newValue.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.withrawAmount = result;
        this.withrawAmountWatch();
    },
    fundSourceModel: function() {
        this.fundSourceWatch();
    },
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