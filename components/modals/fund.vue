
<template>
  <v-dialog v-model="show" max-width="320px">
    <v-card :dark="lightSwitch == true">
      <v-card-title
        class="text-left justify-left pa-3 px-5 success--text subtitle-1 font-weight-bold"
      >FUND</v-card-title>
      <v-tabs
        color="#03dac5"
        background-color="transparent"
        class="px-7"
        :dark="lightSwitch == true"
        grow
      >
        <v-tab
          color="#fff"
          class="tab_menu-top text-capitalize subtitle-1"
          :href="`#funds-1`"
          @click="hideWithdrawButton = false, hideDepositButton = true"
        >Deposit</v-tab>
        <v-tab
          color="#fff"
          class="tab_menu-top text-capitalize subtitle-1"
          :href="`#funds-2`"
          @click="hideWithdrawButton = true, hideDepositButton = false"
        >Withdraw</v-tab>

        <v-tab-item
          dark
          color="#03dac5"
          background-color="#0c1f33"
          class="active-class"
          :value="'funds-' + 1"
        >
          <v-container class="pa-0">
            <div class="separator"></div>
            <v-row no-gutters>
              <v-card-title class="subtitle-1 px-0 py-2 secondary--text">Available Funds</v-card-title>
              <v-spacer></v-spacer>
              <v-card-title
                class="subtitle-1 px-0 py-2 secondary--text"
              >{{ nFormatter(parseFloat(availableFunds)) }}</v-card-title>
            </v-row>
            <v-text-field
              label="Enter Amount"
              color="#00FFC3"
              style="color: #00FFC3"
              :dark="lightSwitch == true"
              class="body-1 buy_selector quantity-input py-3"
              v-model="enterAmount"
              maxlength="15"
              type="number"
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
                  :dark="lightSwitch == true"
                  class="enter_amount-deposit-select ma-0"
                ></v-select>
              </span>
            </v-col>
          </v-container>
        </v-tab-item>
        <v-tab-item dark color="#03dac5" background-color="#0c1f33" :value="'funds-' + 2">
          <v-container class="pa-0">
            <div class="separator"></div>
            <v-row no-gutters>
              <v-card-title class="subtitle-1 px-0 py-2 secondary--text">Available Funds</v-card-title>
              <v-spacer></v-spacer>
              <v-card-title
                class="subtitle-1 px-0 py-2 secondary--text"
              >{{ nFormatter(parseFloat(availableFunds)) }}</v-card-title>
            </v-row>
            <v-text-field
              label="Enter Amount"
              color="#00FFC3"
              style="color: #00FFC3"
              :dark="lightSwitch == true"
              class="body-1 buy_selector quantity-input py-3"
              v-model="withrawAmount"
              maxlength="15"
              type="number"
            ></v-text-field>
          </v-container>
        </v-tab-item>
      </v-tabs>
      <v-card-actions class="pa-5">
        <v-spacer></v-spacer>
        <v-btn
          class="text-capitalize"
          text
          :dark="lightSwitch == true"
          @click.stop="show = false"
        >Close</v-btn>
        <!-- @click.stop="show=false" -->
        <v-btn
          color="success"
          class="text-capitalize"
          depressed
          :light="lightSwitch == true"
          v-show="hideDepositButton"
          @click="depositNow"
          @click.stop="show = false"
          :disabled="disableButtonSave"
        >Deposit</v-btn>
        <v-btn
          color="success"
          class="text-capitalize"
          depressed
          :light="lightSwitch == true"
          v-show="hideWithdrawButton"
          @click="withdrawNow"
          @click.stop="show = false"
          :disabled="disableWithdrawButtonSave"
        >Withdraw</v-btn>
        <!-- @click.stop="show=false" -->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["visible"],
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      }
    },
    ...mapGetters({
      defaultPortfolioId: "journal/getDefaultPortfolioId",
      renderPortfolioKey: "journal/getRenderPortfolioKey",
      selectedPortfolio: "journal/getSelectedPortfolio",
      lightSwitch: "global/getLightSwitch"
    })
  },
  data() {
    return {
      // data for withdraw
      withrawAmount: "0.00",
      // data for deposit
      items: [
        { funds_source: "dividend_income", name: "Dividend Income" },
        { funds_source: "deposit", name: "Fresh Funds" }
      ],
      quantity: "0.00",
      enterAmount: "0.00",
      fundSourceModel: null,
      disableButtonSave: true,
      disableWithdrawButtonSave: true,
      hideWithdrawButton: false,
      hideDepositButton: true,
      availableFunds: "0.00",
      fund: 0,

      snackbar: false,
      timeoutNotification: 10000
    };
  },
  mounted() {},
  methods: {
    ...mapActions({
      setRenderPortfolioKey: "journal/setRenderPortfolioKey",
      setDefaultPortfolioId: "journal/setDefaultPortfolioId"
    }),
    availablefund() {
      const portfoliofundsparams = {
        fund: this.defaultPortfolioId
      };
      this.$api.journal.portfolio.portfoliofunds(portfoliofundsparams).then(
        function(result) {
          if (result.success) {
            this.availableFunds = parseFloat(result.data.funds.balance);
          }
        }.bind(this)
      );
      this.componentKeys++;
    },
    depositNow() {
      let portfolio_id = this.defaultPortfolioId
      let params = {
        total_value: parseFloat(this.enterAmount),
        action: this.fundSourceModel
      };
      this.$api.journal.portfolio
        .deposit(portfolio_id, params)
        .then(response => {
          if (response.success) {
            this.fund = parseFloat(response.data.fund.balance);

            this.keyCreateCounter = this.renderPortfolioKey;
            this.keyCreateCounter++;
            this.setRenderPortfolioKey(this.keyCreateCounter);

            (this.enterAmount = "0.00"),
              (this.fundSourceModel = null),
              (this.disableButtonSave = true),
              (this.disableWithdrawButtonSave = true),
              (this.hideWithdrawButton = false),
              (this.hideDepositButton = true);
          }
        });
    },
    withdrawNow() {
      let portfolio_id = this.defaultPortfolioId
      const params = {
        total_value: parseFloat(this.withrawAmount)
      };
      this.$api.journal.portfolio
        .withdraw(portfolio_id, params)
        .then(response => {
          if (response.success) {
            this.fund = parseFloat(response.data.fund.balance);

            this.keyCreateCounter = this.renderPortfolioKey;
            this.keyCreateCounter++;
            this.setRenderPortfolioKey(this.keyCreateCounter);

            (this.withrawAmount = "0.00"),
              (this.fundSourceModel = null),
              (this.disableButtonSave = true),
              (this.disableWithdrawButtonSave = true),
              (this.hideWithdrawButton = false),
              (this.hideDepositButton = true);
          }
        });
    },
    enterAmountWatch: function(newValue) {
      if (
        parseFloat(this.enterAmount) > 0 &&
        this.fundSourceModel != null &&
        parseInt(this.availableFunds) > 0
      ) {
        this.disableButtonSave = false;
      } else {
        this.disableButtonSave = true;
      }
    },
    fundSourceWatch: function() {
      if (
        parseFloat(this.enterAmount) > 0 &&
        this.fundSourceModel != null &&
        parseInt(this.availableFunds) > 0
      ) {
        this.disableButtonSave = false;
      } else {
        this.disableButtonSave = true;
      }
    },
    withrawAmountWatch: function() {
      if (
        parseFloat(this.withrawAmount) > 0 &&
        parseInt(this.availableFunds) > 0
      ) {
        this.disableWithdrawButtonSave = false;
      } else {
        this.disableWithdrawButtonSave = true;
      }
    },
    nFormatter(num) {
      if (num >= 1000000000000000) {
        return (num / 1000000000000000).toFixed(2).replace(/\.0$/, "") + "Q";
      }
      if (num >= 1000000000000) {
        return (num / 1000000000000).toFixed(2).replace(/\.0$/, "") + "T";
      }
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
    }
  },
  watch: {
    defaultPortfolioId: function() {
      this.availablefund();
    },
    renderPortfolioKey: function() {
      this.availablefund();
    },
    enterAmount: function(newValue) {
      const result = newValue;
      this.enterAmount = result;
      this.enterAmountWatch();
    },
    withrawAmount: function(newValue) {
      const result = newValue;
      this.withrawAmount = result;
      this.withrawAmountWatch();
    },
    fundSourceModel: function() {
      this.fundSourceWatch();
    }
  }
};
</script>
<style>
.balance_amount {
  font-size: 23px;
}
.v-text-field__details {
  display: none;
}
.v-select__slot .v-label,
.v-select__slot .v-icon {
  color: #03dac5 !important;
}
.enter_amount-deposit.stock_selector {
  font-family: "Karla" !important;
}
.enter_amount-deposit.stock_selector input {
  text-align: right;
}
</style>