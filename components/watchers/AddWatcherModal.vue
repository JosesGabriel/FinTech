<template>
  <div>
    <v-dialog v-model="dialog" persistent dark max-width="310px">
      <template v-slot:activator="{ on }">
        <div class="text-center">
          <v-btn class="mx-2" fab dark large color="#132b46" v-on="on">
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </div>
      </template>
      <v-card :loading="watchCardModalLoading">
        <v-card-title>
          <span class="headline">New Stock To Watch</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="stocksDropdownModel"
                  :items="stockList"
                  item-text="stockCode"
                  item-value="stockID"
                  standard-
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="entryPriceModel"
                  label="Entry Price"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="takeProfitModel"
                  label="Take Profit"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="stopLossModel"
                  label="Stop Loss"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click="addWatch()">Save</v-btn>
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
export default {
  data: () => ({
    dialog: false,
    stockList: [],
    stocksDropdownModel: null,
    entryPriceModel: 0,
    takeProfitModel: 0,
    stopLossModel: 0,
    post__responseMsg: null,
    watchList__alert: false,
    watchList__alertState: null,
    watchCardModalLoading: false
  }),
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
