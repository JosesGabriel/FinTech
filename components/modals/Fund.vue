
<template>
  <v-dialog v-model="show" max-width="320px">
    <v-card :dark="lightSwitch == true">
      <v-card-title class="text-left justify-left pa-3 px-5 subtitle-1 font-weight-bold">FUND</v-card-title>
      <v-tabs
        color="success"
        background-color="transparent"
        class="px-7 fundContainer__tab"
        :dark="lightSwitch == true"
        grow
      >
        <v-tab
          color="white"
          class="tab_menu-top text-capitalize subtitle-1"
          :href="`#funds-1`"
          @click="hideWithdrawButton = false, hideDepositButton = true"
        >Deposit</v-tab>
        <v-tab
          color="white"
          class="tab_menu-top text-capitalize subtitle-1"
          :href="`#funds-2`"
          @click="hideWithdrawButton = true, hideDepositButton = false"
        >Withdraw</v-tab>

        <v-tab-item
          dark
          color="success"
          background-color="#0c1f33"
          class="active-class"
          :class="lightSwitch == 1 ? 'dark fundContainer__tab': 'light fundContainer__tab'"
          :value="'funds-' + 1"
        >
          <v-container class="pa-0">
            <v-row
              no-gutters
              class="my-2"
              :class="lightSwitch == 1 ? 'secondary--text' : 'tertiary--text'"
            >
              <v-card-title class="caption px-0 py-2">Available Funds</v-card-title>
              <v-spacer></v-spacer>
              <v-card-title class="caption px-0 py-2">{{ availableFunds | numeral("0.00a") }}</v-card-title>
            </v-row>
            <v-text-field
              label="Enter Amount"
              color="success"
              style="color: success"
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
                  @change="fundSourceChange"
                  v-model="fundSourceModel"
                  class="enter_amount-deposit-select ma-0 body-2"
                  item-text="name"
                  item-value="funds_source"
                  label="Fund Source"
                  item-color="success"
                  color="success"
                  dense
                  :dark="lightSwitch == true"
                  :menu-props="{offsetY: true, dark: lightSwitch == true}"
                  light
                >
                  <template slot="item" slot-scope="data">
                    <v-list-item-content
                      :dark="lightSwitch == true"
                      :style="{ background: cardbackground }"
                      style="padding: 12px 12px; margin: -16px;"
                    >
                      <v-list-item-title v-html="data.item.name" class="text-capitalize caption"></v-list-item-title>
                    </v-list-item-content>
                  </template>
                </v-select>
              </span>
            </v-col>
          </v-container>
        </v-tab-item>
        <v-tab-item dark color="success" background-color="#0c1f33" :value="'funds-' + 2">
          <v-container class="pa-0">
            <v-row
              no-gutters
              class="my-2"
              :class="lightSwitch == 1 ? 'secondary--text' : 'tertiary--text'"
            >
              <v-card-title class="caption px-0 py-2">Available Funds</v-card-title>
              <v-spacer></v-spacer>
              <v-card-title class="caption px-0 py-2">{{ availableFunds | numeral("0.00a") }}</v-card-title>
            </v-row>
            <v-text-field
              label="Enter Amount"
              color="success"
              style="color: success"
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
        <v-btn
          color="success"
          class="text-capitalize black--text"
          depressed
          :light="lightSwitch == true"
          v-show="hideDepositButton"
          @click="depositNow"
          @click.stop="show = false"
          :disabled="disableButtonSave"
        >Deposit</v-btn>
        <v-btn
          color="success"
          class="text-capitalize black--text"
          depressed
          :light="lightSwitch == true"
          v-show="hideWithdrawButton"
          @click="withdrawNow"
          @click.stop="show = false"
          :disabled="disableWithdrawButtonSave"
        >Withdraw</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["visible"],
  computed: {
    ...mapGetters({
      defaultPortfolioId: "journal/getDefaultPortfolioId",
      renderPortfolioKey: "journal/getRenderPortfolioKey",
      selectedPortfolio: "journal/getSelectedPortfolio",
      lightSwitch: "global/getLightSwitch"
    }),
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
    /**
     * returns hexcode for card color if current theme is dark or light
     *
     * @return  {string}  returns string
     */
    cardbackground() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    }
  },
  data() {
    return {
      withrawAmount: 0.0,
      items: [
        { funds_source: "dividend_income", name: "Dividend Income" },
        { funds_source: "deposit", name: "Fresh Funds" }
      ],
      quantity: 0.0,
      enterAmount: 0.0,
      fundSourceModel: null,
      disableButtonSave: true,
      disableWithdrawButtonSave: true,
      hideWithdrawButton: false,
      hideDepositButton: true,
      availableFunds: 0.0,
      fund: 0
    };
  },
  watch: {
    /**
     * Watch defaultPortfolioId vuex if id changed perform function inside
     *
     * @return  {string}  getting the current portfolio id
     */
    defaultPortfolioId() {
      this.availablefund();
    },
    /**
     * watch enterAmount on keyup and check if enterAmount is validated or pass
     * validation works.
     *
     * @return
     */
    enterAmount() {
      this.enterAmountWatch();
    },
    /**
     * watch withrawAmount on keyup and check if withrawAmount is validated or pass
     * validation works.
     *
     * @return
     */
    withrawAmount() {
      this.withrawAmountWatch();
    },
    /**
     * validating if there's portfolio selected using fundsource
     *
     * @return
     */
    // fundSourceModel() {
    //   this.fundSourceWatch();
    // }
  },
  methods: {
    ...mapActions({
      setRenderPortfolioKey: "journal/setRenderPortfolioKey",
      setDefaultPortfolioId: "journal/setDefaultPortfolioId"
    }),
    /**
     * once porfolio ID change this function will request for availablefunds
     *
     * @return  {number}  returns available balance
     */
    availablefund() {
      const portfoliofundsparams = {
        fund: this.defaultPortfolioId
      };
      this.$api.journal.portfolio.portfoliofunds(portfoliofundsparams).then(
        function(result) {
          if (result.success) {
            this.availableFunds = parseFloat(result.data.funds[0].balance);
          }
        }.bind(this)
      );
    },
    /**
     * function of deposit
     *
     * @return  {object}  returns funds info
     */
    depositNow() {
      let portfolio_id = this.defaultPortfolioId;
      let params = {
        total_value: parseFloat(this.enterAmount),
        action: this.fundSourceModel
      };
      this.$api.journal.portfolio
        .deposit(portfolio_id, params)
        .then(response => {
          if (response.success) {
            this.fund = parseFloat(response.data.fund.balance);
            this.availableFunds = this.fund;

            this.keyCreateCounter = this.renderPortfolioKey;
            this.keyCreateCounter++;
            this.setRenderPortfolioKey(this.keyCreateCounter);

            this.clearInputs();
          }
        });
    },
    /**
     * function of withdraw
     *
     * @return  {object}  returns funds info
     */
    withdrawNow() {
      let portfolio_id = this.defaultPortfolioId;
      const params = {
        total_value: parseFloat(this.withrawAmount)
      };
      this.$api.journal.portfolio
        .withdraw(portfolio_id, params)
        .then(response => {
          if (response.success) {
            this.fund = parseFloat(response.data.fund.balance);
            this.availableFunds = this.fund;

            this.keyCreateCounter = this.renderPortfolioKey;
            this.keyCreateCounter++;
            this.setRenderPortfolioKey(this.keyCreateCounter);

            this.clearInputs();
          }
        });
    },
    /**
     * Fires when transaction widraw or deposit succeed
     *
     * @return
     */
    clearInputs() {
      this.enterAmount = 0;
      this.withrawAmount = 0;
      this.fundSourceModel = null;
      this.disableButtonSave = true;
      this.disableWithdrawButtonSave = true;
      this.hideWithdrawButton = false;
      this.hideDepositButton = true;
    },
    /**
     * function that will hold the disable/enable of save button
     *
     * @param   {number}  newValue  current value of number field
     *
     * @return  {number}          returns boolean
     */
    enterAmountWatch(newValue) {
      if (parseFloat(this.enterAmount) > 0 && this.fundSourceModel != null) {
        this.disableButtonSave = false;
      } else {
        this.disableButtonSave = true;
      }
    },
    
    /**
     * function that will hold the disable/enable of save button
     *
     * @param   {number}  newValue  current value of number field
     *
     * @return  {number}          returns boolean
     */
    fundSourceChange() {
      if (parseFloat(this.enterAmount) > 0 && this.fundSourceModel != null) {
        this.disableButtonSave = false;
      } else {
        this.disableButtonSave = true;
      }
    },
    /**
     * function that will hold the disable/enable of save button
     *
     * @return  {number}          returns property
     */
    withrawAmountWatch: function() {
      if (
        parseFloat(this.withrawAmount) > 0 &&
        parseInt(this.availableFunds) > 0
      ) {
        this.disableWithdrawButtonSave = false;
      } else {
        this.disableWithdrawButtonSave = true;
      }
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
.fundContainer__tab .v-item-group.theme--dark.v-tabs-bar {
  border-bottom: 1px solid rgb(23, 36, 49) !important;
}
.fundContainer__tab .v-item-group.theme--light.v-tabs-bar {
  border-bottom: 1px solid rgb(218, 218, 218) !important;
}
</style>