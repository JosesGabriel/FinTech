<template>
  <div>
    <v-dialog v-model="dialog" persistent dark max-width="320px">
      <template v-slot:activator="{ on }">
        <v-btn
          rounded
          outlined
          color="#48FFD5"
          dark
          class="text-capitalize mr-2"
          style="border-width: 2px"
          height="23"
          v-on="on"
          >Add</v-btn
        >
      </template>
      <v-card :loading="watchCardModalLoading" color="darkcard">
        <v-card-title>
          <span class="subtitle-1 font-weight-light" style="color: #1DE9B6"
            >Add Watchlist</span
          >
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="stocksDropdownModel"
                  label="Stock Code"
                  :items="stockList"
                  item-text="symbol"
                  item-value="id_str"
                  append-icon="mdi-chevron-down"
                  dark
                  standard-
                  color="success"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="entryPriceModel"
                  label="Entry Price"
                  prefix="₱"
                  dense
                  dark
                  type="number"
                  color="success"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="takeProfitModel"
                  label="Take Profit"
                  prefix="₱"
                  dense
                  dark
                  type="number"
                  color="success"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="stopLossModel"
                  label="Stop Loss"
                  prefix="₱"
                  dense
                  dark
                  type="number"
                  color="success"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="addWatch__button"
            depressed
            color="transparent"
            @click="dialog = false"
            >Close</v-btn
          >
          <v-btn
            class="addWatch__button"
            color="#48FFD5"
            light
            depressed
            :disabled="saveButtonDisable"
            @click="addWatch()"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="watchList__alert"
      :color="watchList__alertState ? 'success' : 'error'"
    >
      {{ post__responseMsg }}
      <v-btn color="white" text @click="watchList__alert = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>
<style>
.addWatch__button {
  text-transform: none;
}
</style>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    dialog: false,
    keyCounter: 2,
    stockList: [],
    stocksDropdownModel: null,
    entryPriceModel: "",
    takeProfitModel: "",
    stopLossModel: "",
    post__responseMsg: null,
    watchList__alert: false,
    watchList__alertState: null,
    watchCardModalLoading: false,
    saveButtonDisable: true
  }),
  computed: {
    ...mapGetters({
      userWatchedStocks: "watchers/getUserWatchedStocks",
      renderChartKey: "watchers/getRenderChartKey"
    })
  },
  watch: {
    entryPriceModel: function() {
      this.fieldsWatch();
    },
    stopLossModel: function() {
      this.fieldsWatch();
    },
    takeProfitModel: function() {
      this.fieldsWatch();
    }
  },
  mounted() {
    const params = {
      exchange: "PSE",
      status: "active"
    };
    this.$api.chart.stocks.list(params).then(
      function(result) {
        this.stockList = result.data;
      }.bind(this)
    );
  },
  methods: {
    ...mapActions({
      setUserWatchedStocks: "watchers/setUserWatchedStocks",
      setRenderChartKey: "watchers/setRenderChartKey"
    }),
    fieldsWatch() {
      if (
        this.stocksDropdownModel &&
        (this.entryPriceModel != "" ||
          (this.stopLossModel != "" || this.takeProfitModel != ""))
      ) {
        this.saveButtonDisable = false;
      } else {
        this.saveButtonDisable = true;
      }
    },
    addWatch() {
      this.watchCardModalLoading = "success";
      let stockExists = false;
      for (let i = 0; i < this.userWatchedStocks.length; i++) {
        if (this.userWatchedStocks[i].stock_id == this.stocksDropdownModel) {
          stockExists = true;
        }
      }
      if (!stockExists) {
        let params = {
          user_id: "2d5486a1-8885-47bc-8ac6-d33b17ff7b58",
          stock_id: this.stocksDropdownModel,
          entry_price: this.entryPriceModel,
          take_profit: this.takeProfitModel,
          stop_loss: this.stopLossModel
        };
        this.$axios
          .$post("https://dev-api.arbitrage.ph/api/journal/watchlist", params)
          .then(response => {
            this.watchCardModalLoading = false;
            if (response.success) {
              this.watchList__alert = true;
              this.post__responseMsg = response.message;
              this.watchList__alertState = true;
              this.dialog = false;
              //This line sets vuex renderchartkey. Watchlist.vue watches this value, if it detects a change, chart is re-rendered
              this.keyCounter = this.renderChartKey;
              this.keyCounter++;
              this.setRenderChartKey(this.keyCounter);
            } else {
              this.watchList__alert = true;
              this.post__responseMsg = response.message;
              this.watchList__alertState = false;
            }
          });
      } else {
        this.watchCardModalLoading = false;
        this.watchList__alert = true;
        this.post__responseMsg = "Watchlist already exists!";
        this.watchList__alertState = false;
      }
      this.stocksDropdownModel = "";
      this.entryPriceModel = "";
      this.stopLossModel = "";
      this.takeProfitModel = "";
    }
  }
};
</script>
