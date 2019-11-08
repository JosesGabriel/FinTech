<template>
  <div>
    <v-dialog v-model="dialog" persistent dark max-width="320px">
      <template v-slot:activator="{ on }">
        <div class="text-center">
          <v-btn class="mx-2" fab dark large color="#132b46" v-on="on">
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </div>
      </template>
      <v-card :loading="watchCardModalLoading" color="#142b46">
        <v-card-title>
          <span class="headline font-weight-light">New Stock To Watch</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="stocksDropdownModel"
                  label="Stock Code"
                  :items="stockList"
                  item-text="stockCode"
                  item-value="stockID"
                  dark
                  standard-
                  color="primary"
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
                  color="primary"
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
                  color="warning"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error darken-1" text @click="dialog = false"
            >Close</v-btn
          >
          <v-btn
            color="blue darken-1"
            text
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
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    dialog: false,
    keyCounter: 1,
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
    const params = {};
    this.$api.chart.stocks.list(params).then(
      function(result) {
        let stockListArrayRaw = Object.entries(result.data);
        for (let i = 0; i < stockListArrayRaw.length; i++) {
          let keyValuePair = {
            stockCode: stockListArrayRaw[i][0],
            stockID: stockListArrayRaw[i][1].id_str
          };
          this.stockList.push(keyValuePair);
        }
      }.bind(this)
    );
  },
  methods: {
    ...mapActions({
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
      this.watchCardModalLoading = "primary";
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
            this.setRenderChartKey(this.keyCounter);
            this.keyCounter++;
          } else {
            this.watchList__alert = true;
            this.post__responseMsg = response.message;
            this.watchList__alertState = false;
          }
        });
    }
  }
};
</script>
