<template>
  <v-card flat :dark="lightSwitch == 1" class="py-4 px-2">
    <v-autocomplete
      outlined
      label="Select a Stock"
      color="success"
      item-text="symbol"
      item-value="id"
      item-color="success"
      append-icon="mdi-chevron-down"
      v-model="stockModel"
      :dark="lightSwitch == 1"
      :items="stocklist"
      :menu-props="{offsetY: true, dark: lightSwitch == 1}"
      @change="onChangeStock"
    ></v-autocomplete>

    <v-row no-gutters class="body-2">
      <span>Market Price</span>
      <v-spacer></v-spacer>
      <div>
        <span>{{ last | numeral("0.00a") }}</span>
        <span
          :class="priceChange"
        >{{ change | numeral("0.00a") }} ({{ changePercentage | numeral("0.00a")}}%)</span>
      </div>
    </v-row>

    <span class="body-2">Best Price</span>

    <v-card color="transparent" flat min-height="107px" class="pa-2 caption">
      <v-row no-gutters class="mb-1">
        <v-col cols="4" class="text-left">Price</v-col>
        <v-col cols="4" class="text-center">Seller</v-col>
        <v-col cols="4" class="text-right">Volume</v-col>
      </v-row>
      <v-progress-linear indeterminate :active="loading" color="success darken-2"></v-progress-linear>
      <div class="caption text-center pa-3" v-if="noData">No Available Data</div>
      <v-row no-gutters v-for="(item, index) in asks" :key="index">
        <v-col cols="4" class="text-left">{{ item.price | numeral("0.00a") }}</v-col>
        <v-col cols="4" class="text-center">{{ item.count }}</v-col>
        <v-col cols="4" class="text-right">{{ item.volume | numeral("0.0a") }}</v-col>
      </v-row>
    </v-card>

    <v-col cols="12" class="d-flex align-center pa-0">
      <v-text-field
        type="number"
        color="success"
        label="Quantity"
        v-model="quantityModel"
        :dark="lightSwitch == 1"
        :min="0"
      ></v-text-field>
      <v-btn @click="toggleOperation(boardlotModel, 'down')" icon small color="success">
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
      <v-btn @click="toggleOperation(boardlotModel, 'up')" icon small color="success">
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
    </v-col>

    <v-text-field
      label="Buy Price"
      color="success"
      class="py-3"
      v-model="priceModel"
      :dark="lightSwitch == 1"
    ></v-text-field>

    <v-row no-gutters class="body-2">
      <span>Total Cost</span>
      <v-spacer></v-spacer>
      <span>{{ totalCost | numeral("0,000.00") }}</span>
    </v-row>

    <v-row no-gutters class="pt-2">
      <v-spacer></v-spacer>
      <v-btn @click="clearInputs" text class="caption text-capitalize" color="gray">Close</v-btn>
      <v-btn
        class="caption text-capitalize black--text"
        color="success"
        :disabled="toggleContinueBtn"
        @click="postSell"
      >Continue</v-btn>
    </v-row>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { CalculateBoardLot } from "~/assets/js/helpers/orderbook";
import { BuyFees, SellFees } from "~/assets/js/helpers/taxation";

export default {
  props: {
    stocklist: Array
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch",
      selectedPortfolio: "journal/getSelectedPortfolio",
      renderPortfolioKey: "journal/getRenderPortfolioKey",
      simulatorPortfolioID: "tradesimulator/getSimulatorPortfolioID",
    }),
    priceChange() {
      return this.change > 0 ? "increase" : this.change == 0 ? "" : "decrease";
    },
    totalCost() {
      let total = 0;
      if (this.quantityModel != null && this.priceModel != null) {
        total = SellFees(this.quantityModel * parseFloat(this.priceModel));
        this.totalCostModel = total;
      }
      return total;
    },
    toggleContinueBtn() {
      let state = true;
      if (
        this.stockModel != null &&
        parseFloat(this.stockPosition) >= parseFloat(this.quantityModel) &&
        parseFloat(this.quantityModel) > 0 &&
        parseFloat(this.priceModel) > 0
      ) {
        state = false;
      }
      return state;
    }
  },
  data() {
    return {
      stockModel: null,
      totalCostModel: null,
      quantityModel: null,
      boardlotModel: 0,
      priceModel: null,
      selectedStockData: null,
      asks: null,
      avprice: 0,
      loading: false,
      noData: true,
      last: 0,
      change: 0,
      changePercentage: 0,
      stockPosition: 0,
      strategyModel: "",
      tradeplanModel: "",
      emotionsModel: "",
      notesModel: ""
    };
  },
  methods: {
    ...mapActions({
      setAlert: "global/setAlert",
      setRenderPortfolioKey: "journal/setRenderPortfolioKey",
      setSimulatorOpenPosition: "tradesimulator/setSimulatorOpenPosition",
    }),
    calculateBoardLot: CalculateBoardLot,
    onChangeStock(stock_id) {
      this.loading = true;
      this.noData = true;
      this.asks = [];
      this.$api.chart.stocks
        .history({
          "symbol-id": stock_id
        })
        .then(response => {
          if (response.success) {
            this.selectedStockData = response.data;
            this.priceModel = response.data.last;
            this.last = response.data.last;
            this.change = response.data.change;
            this.changePercentage = response.data.changepercentage;
            this.boardlotModel = this.calculateBoardLot(response.data.last);
          }
        });

      this.$api.chart.stocks
        .bidask({
          "symbol-id": stock_id,
          "filter-by-last": true,
          limit: 3
        })
        .then(response => {
          if (response.success) {
            const asks = Object.values(response.data.asks);
            this.asks = asks;
            this.loading = false;
            this.noData = false;
          }
        })
        .catch(error => {
          if (error) {
            this.loading = false;
            this.noData = true;
          }
        });

      let get = this.stocklist.filter(x => {
        return x.id == stock_id;
      });

      this.quantityModel = get[0].position;
      this.stockPosition = get[0].position;
      this.avprice = get[0].avprice;
      this.stockData = get[0];
      if (
        get[0].strategy ||
        get[0].plan ||
        get[0].emotion ||
        get[0].notes
      ) {
        this.strategyModel = get[0].strategy;
        this.tradeplanModel = get[0].plan;
        this.emotionsModel = get[0].emotion;
        this.notesModel = get[0].notes;
      }
    },
    toggleOperation(boardlot, operation) {
      let number = parseFloat(this.quantityModel);
      if (operation === "up") {
        if (typeof this.quantityModel == "string") {
          if (this.quantityModel == "") {
            let convertednumber = 0;
            this.quantityModel = convertednumber += boardlot;
          } else {
            let convertednumber = parseFloat(this.quantityModel);
            this.quantityModel = convertednumber += boardlot;
          }
        } else {
          this.quantityModel += parseFloat(boardlot);
        }
      } else if (operation === "down") {
        if (typeof this.quantityModel == "string") {
          if (this.quantityModel == "") {
            let convertednumber = 0;
            this.quantityModel = convertednumber -= boardlot;
          } else {
            let convertednumber = parseFloat(this.quantityModel);
            this.quantityModel = convertednumber -= boardlot;
          }
        } else {
          this.quantityModel -= parseFloat(boardlot);
        }
      }
    },
    postSell() {
      const portfolio_id = this.simulatorPortfolioID;
      const stock_id = this.stockModel;

      this.$api.journal.portfolio
        .tradesell(portfolio_id, stock_id, {
          position: parseFloat(this.quantityModel),
          stock_price: parseFloat(this.priceModel),
          transaction_meta: {
            stock_name: this.selectedStockData.symbol,
            average_price: this.avprice,
            strategy: this.strategyModel,
            plan: this.tradeplanModel,
            emotion: this.emotionsModel,
            notes: this.notesModel,
            date: this.$moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
          }
        })
        .then(response => {
          if (response.success) {
            this.clearInputs();
           this.setSimulatorOpenPosition(this.stocklist);
            let alert = {
              model: true,
              state: true,
              message: "Successfully selling the trade."
            };
            this.setAlert(alert);
          }
        });
    },
    clearInputs() {
      this.keyCounter = this.renderPortfolioKey;
      this.keyCounter++;
      this.setRenderPortfolioKey(this.keyCounter);
      this.$emit("clicked");

      this.stockModel = null;
      this.quantityModel = null;
      this.boardlotModel = 0;
      this.priceModel = null;
      this.selectedStockData = null;
      this.asks = null;
      this.loading = false;
      this.noData = true;
      this.last = 0;
      this.change = 0;
      this.changePercentage = 0;
    }
  }
};
</script>

<style scoped>
.increase {
  color: #03dac5;
}
.decrease {
  color: #f44336;
}
</style>