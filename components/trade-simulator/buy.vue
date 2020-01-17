<template>
  <v-container class="pa-0">
    <v-row no-gutters class="pa-3 pb-0">
      <v-col cols="12" sm="12" md="12">
        <v-row no-gutters>
          <v-card-title
            :style="{ color: fontcolor2 }"
            :class="
              this.simulatorConfirmedBuySell == 'sell' ? 'no_display' : ''
            "
            style="font-size:13px !important;"
            class="px-0 py-2 secondary--text"
          >Available Funds</v-card-title>
          <v-spacer></v-spacer>
          <v-card-title
            v-model="availableFunds"
            :class="
              this.simulatorConfirmedBuySell == 'sell' ? 'no_display' : ''
            "
            class="px-0 py-2 secondary--text"
            style="font-size:13px !important;"
          >{{ this.availableFunds }}</v-card-title>
        </v-row>
        <v-row no-gutters class="px-0 py-0">
          <v-col sm="12" md="12" class="pa-0">
            <v-select
              offset-y="true"
              :class="
                this.simulatorConfirmedBuySell == 'sell' ? 'no_display' : ''
              "
              v-model="item"
              :value="this.defaultvalue"
              item-color="success"
              item-value="item"
              v-on:change="getBalance(item)"
              append-icon="mdi-chevron-down"
              color="success"
              class="mt-0 py-3 pb-0 select_port"
              :items="portfolio"
              label="Select Portfolio"
              dense
              flat
            >
              <template slot="item" slot-scope="data">
                <v-list-item-content
                  :dark="lightSwitch == true"
                  :style="{ background: cardbackground }"
                  style="padding: 21px 12px; margin: -16px;"
                >
                  <v-list-item-title v-html="data.item"></v-list-item-title>
                </v-list-item-content>
              </template>
            </v-select>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="12"
            class="py-0 justify-right d-flex align-center text-right"
          >
            <v-text-field
              label="Quantity"
              placeholder="Enter Quantity"
              @keyup="keypress"
              color="#00FFC3"
              :style="{ color: fontcolor2 }"
              flat
              class="body-2 buy_selector buy_price-input py-3 pb-0"
              type="number"
              v-model="quantity"
            ></v-text-field>
            <v-btn @click="minusButton" text icon color="success">
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
            <v-btn @click="addButton" text icon color="success">
              <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="12"
            class="py-0 justify-right d-flex align-center text-right"
          >
            <v-text-field
              :label="
                this.simulatorConfirmedBuySell == 'sell'
                  ? 'Sell Price'
                  : 'Buy Price'
              "
              :placeholder="
                this.simulatorConfirmedBuySell == 'sell'
                  ? 'Enter Sell Price'
                  : 'Enter Buy Price'
              "
              color="#00FFC3"
              :style="{ color: fontcolor2 }"
              class="body-2 buy_selector quantity-input py-3"
              readonly
              :value="this.BuyPrice"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-row no-gutters>
              <v-card-title
                style="font-size:13px !important"
                :style="{ color: fontcolor2 }"
                :class="
                  this.simulatorConfirmedBuySell == 'sell'
                    ? 'boardlotsell'
                    : 'boardlotbuy'
                "
                class="pa-0 secondary--text"
              >Board lot</v-card-title>
              <v-spacer></v-spacer>
              <v-card-title
                :style="{ color: fontcolor2 }"
                class="pa-0 secondary--text"
                style="font-size:13px !important"
              >{{ this.BoardLot }}</v-card-title>
            </v-row>
          </v-col>

          <v-col cols="12" class="pb-5">
            <v-row no-gutters>
              <v-card-title
                style="font-size:13px !important"
                :style="{ color: fontcolor2 }"
                class="px-0 py-2 secondary--text"
              >
                {{
                this.simulatorConfirmedBuySell == "sell"
                ? "Peso Value"
                : "Total Cost"
                }}
              </v-card-title>
              <v-spacer></v-spacer>
              <v-card-title
                :style="{ color: fontcolor2 }"
                class="px-0 py-2 secondary--text"
                style="font-size:13px !important"
              >{{ this.totalCost }}</v-card-title>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      quantity: "0.00",
      availableFunds: "0.00",
      totalCost: 0,
      portfolio: [],
      item: "",
      fund_id: "",
      defaultvalue: ""
    };
  },
  computed: {
    ...mapGetters({
      simulatorPortfolioID: "tradesimulator/getSimulatorPortfolioID",
      simulatorPositions: "tradesimulator/getSimulatorPositions",
      simulatorConfirmedBuySell: "tradesimulator/getSimulatorConfirmedBuySell",
      lightSwitch: "global/getLightSwitch"
    }),
    cardbackground: function() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    },
    fontcolor: function() {
      return this.lightSwitch == 0 ? "#494949" : "#e5e5e5"; // #eae8e8
    },
    fontcolor2: function() {
      return this.lightSwitch == 0 ? "#535358" : "#b6b6b6"; // #eae8e8
    }
  },
  props: {
    Position: {
      default() {
        return "";
      }
    },
    reset: {
      default() {
        return "";
      }
    },
    BuyPrice: {
      default() {
        return "";
      }
    },
    BoardLot: {
      default() {
        return "";
      }
    }
  },
  watch: {
    simulatorPortfolioID: function(){
      this.getPortfolio();
    },
    simulatorConfirmedBuySell: function() {
      if (this.simulatorConfirmedBuySell == "sell") {
        let tcost =
          parseFloat(this.quantity).toFixed(2) * parseFloat(this.BuyPrice);
        this.totalCost = this.fees(tcost);
        this.totalCost = this.addcomma(this.totalCost);
      } else {
        if (this.Reset == true ? (this.totalCost = 0) : "");
      }
    },
    BuyPrice: function() {
      if (this.simulatorConfirmedBuySell == "buy" ? (this.quantity = 0) : "");
      this.totalCost = 0;
    },
    Position: function() {
      this.quantity = this.Position;
      this.setSimulatorPositions(this.quantity);
      let add =
        parseFloat(this.quantity).toFixed(2) * parseFloat(this.BuyPrice);
      let addfees = this.fees(add);
      this.totalCost = this.addcomma(addfees);
    }
  },
  mounted() {
    this.getPortfolio();
  },
  methods: {
    ...mapActions({
      setSimulatorPortfolioID: "tradesimulator/setSimulatorPortfolioID",
      setSimulatorPositions: "tradesimulator/setSimulatorPositions"
    }),
    getPortfolio(){
        this.$api.journal.portfolio.portfolio().then(
          function(result) {        
            for (let i = 0; i < result.data.logs.length; i++) {
              if (
                result.data.logs[i].type == "virtual"
              ) {
                this.portfolio.push(result.data.logs[i].name);
                if (result.data.logs[i].name == "My Virtual Portfolio") {
                  let avfunds = parseFloat(result.data.logs[i].balance);
                  this.availableFunds = this.addcomma(avfunds);
                  this.defaultvalue = result.data.logs[i].name;
                }
              }
            }
          }.bind(this)
        );
    },
    addButton() {
      if (this.simulatorConfirmedBuySell == "sell") {
        this.quantity =
          this.Position <= this.quantity
            ? this.Position
            : (this.quantity =
                parseInt(this.quantity) + parseInt(this.BoardLot));
      } else {
        this.quantity = parseInt(this.quantity) + parseInt(this.BoardLot);
      }
      let add =
        parseFloat(this.quantity).toFixed(2) * parseFloat(this.BuyPrice);
      let addfees = this.fees(add);
      this.setSimulatorPositions(this.quantity);
      this.totalCost = this.addcomma(addfees);
      this.$emit("totalPosition", this.quantity);
    },
    minusButton() {
      this.quantity =
        this.quantity <= 0 || this.quantity < parseInt(this.BoardLot)
          ? 0
          : (this.quantity = parseInt(this.quantity) - parseInt(this.BoardLot));
      let min =
        parseFloat(this.quantity).toFixed(2) * parseFloat(this.BuyPrice);
      let minfees = this.fees(min);
      this.setSimulatorPositions(this.quantity);
      this.totalCost = this.addcomma(minfees);
      this.$emit("totalPosition", this.quantity);
    },
    fees(buyResult) {
      let dpartcommission = buyResult * 0.0025;
      let dcommission = dpartcommission > 20 ? dpartcommission : 20;
      // TAX
      let dtax = dcommission * 0.12;
      // Transfer Fee
      let dtransferfee = buyResult * 0.00005;
      // SCCP
      let dsccp = buyResult * 0.0001;
      if (this.simulatorConfirmedBuySell == "sell") {
        let dsell = buyResult * 0.006;
        let dall = dcommission + dtax + dtransferfee + dsccp + dsell;
        return buyResult - dall;
      } else {
        let dall = dcommission + dtax + dtransferfee + dsccp;
        return buyResult + dall;
      }
    },
    addcomma(n, sep, decimals) {
      sep = sep || "."; // Default to period as decimal separator
      decimals = decimals || 2; // Default to 2 decimals
      return (
        n.toLocaleString().split(sep)[0] + sep + n.toFixed(2).split(sep)[1]
      );
    },
    keypress: function() {
      let press = 0;
      if (this.simulatorConfirmedBuySell == "sell") {
        if (this.quantity > this.Position) {
          press = parseFloat(this.Position) * parseFloat(this.BuyPrice);
          let pressfees = this.fees(press);
          this.totalCost = this.addcomma(pressfees);
          this.$emit("totalPosition", this.quantity);
          return (this.quantity = this.Position);
        }
      }
      press = parseFloat(this.quantity).toFixed(2) * parseFloat(this.BuyPrice);
      let pressfees = this.fees(press);
      this.setSimulatorPositions(this.quantity);
      this.totalCost = this.addcomma(pressfees);
      this.$emit("totalPosition", this.quantity);
    },
    getBalance: function(item) {     
      this.$api.journal.portfolio.portfolio().then(
        function(result) {     
          for (let i = 0; i < result.data.logs.length; i++) {
            if (result.data.logs[i].name == item) {
              this.setSimulatorPortfolioID(result.data.logs[i].id);
              let avfunds = parseFloat(result.data.logs[i].balance);
              this.availableFunds = this.addcomma(avfunds);
            }
          }
        }.bind(this)
      );

      
    }
  }
};
</script>
<style scoped>
.no_display {
  display: none;
}
.highnum {
  color: #03dac5;
}
.lownum {
  color: #f44336;
}
.equalnum {
  color: #b6b6b6;
}
.buy_selector .v-select__slot .v-label,
.buy_selector .v-select__slot .v-icon {
  color: #03dac5 !important;
}
.buy_selector .v-input__slot {
  margin: 0;
}
.buy_selector .v-select__selection--comma {
  color: #03dac5;
  font-size: 14px;
}
.buy_selector .v-input__control {
  min-height: auto !important;
}
.buy_selector-font-size .v-label {
  font-size: 14px;
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
  text-align: right;
}
.boardlot {
  color: rgb(144, 152, 157);
  position: absolute;
  font-size: 12px;
  left: 180px;
  width: 95px;
}
.boardlotsell {
  top: 155px;
}
.boardlotbuy {
  top: 306px;
}
</style>
<style>
.select_port > .v-input__control > .v-input__slot > .v-select__slot > label {
  font-size: 13px;
}
</style>
