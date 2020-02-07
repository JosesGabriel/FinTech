<template>
  <div>
    <v-dialog
      v-model="dialog"
      persistent
      :dark="lightSwitch == 0 ? false : true"
      max-width="320px"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="success"
          dark
          small
          class="text-capitalize mr-2 black--text font-weight-black"
          style="border-width: 2px"
          height="23"
          v-on="on"
          >Add</v-btn
        >
      </template>
      <v-card :dark="lightSwitch == 0 ? false : true">
        <v-card-title>
          <span class="subtitle-1 font-weight-medium">Add Watchlist</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" class="px-0">
                <v-select
                  v-model="stocksDropdownModel"
                  label="Select a Stock"
                  :items="stockList"
                  item-text="symbol"
                  item-value="id_str"
                  append-icon="mdi-chevron-down"
                  :dark="lightSwitch == 0 ? false : true"
                  outlined
                  standard-
                  color="success"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" class="px-1">
                <v-text-field
                  v-model="entryPriceModel"
                  label="Entry Price"
                  dense
                  :dark="lightSwitch == 0 ? false : true"
                  type="number"
                  color="success"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="px-1">
                <v-text-field
                  v-model="takeProfitModel"
                  label="Take Profit"
                  dense
                  :dark="lightSwitch == 0 ? false : true"
                  type="number"
                  color="success"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="px-1">
                <v-text-field
                  v-model="stopLossModel"
                  label="Stop Loss"
                  dense
                  :dark="lightSwitch == 0 ? false : true"
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
            class="no-transform"
            depressed
            color="transparent"
            @click="dialog = false"
            >Close</v-btn
          >
          <v-btn
            class="no-transform px-6"
            color="success"
            light
            depressed
            :disabled="saveButtonDisable"
            @click="addWatch()"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    addnewstock: {}
  },
  data: () => ({
    dialog: false,
    keyCounter: 2,
    stockList: [],
    stocksDropdownModel: null,
    entryPriceModel: "",
    takeProfitModel: "",
    stopLossModel: "",
    post__responseMsg: null,
    watchCardModalLoading: false,
    saveButtonDisable: true
  }),
  computed: {
    ...mapGetters({
      userWatchedStocks: "watchers/getUserWatchedStocks",
      renderChartKey: "watchers/getRenderChartKey",
      lightSwitch: "global/getLightSwitch"
    })
  },
  watch: {
    /**
     * Detects changes on entry price field and controls whether Save button on watchlist is clickable or not
     *
     * @return
     */
    entryPriceModel() {
      this.fieldsWatch();
    },
    /**
     * Detects changes on stop loss field and controls whether Save button on watchlist is clickable or not
     *
     * @return
     */
    stopLossModel() {
      this.fieldsWatch();
    },
    /**
     * Detects changes on take profit field and controls whether Save button on watchlist is clickable or not
     *
     * @return
     */
    takeProfitModel() {
      this.fieldsWatch();
    },
    addnewstock() {
      this.dialog = true;
      for (let i = 0; this.stockList.length > i; i++) {
        if (this.stockList[i].id_str == this.addnewstock) {
          this.stocksDropdownModel = this.stockList[i];
          break;
        }
      }
    }
  },
  mounted() {
    this.getStockList();
  },
  methods: {
    ...mapActions({
      setUserWatchedStocks: "watchers/setUserWatchedStocks",
      setRenderChartKey: "watchers/setRenderChartKey",
      setAlert: "global/setAlert"
    }),
    /**
     * GETs stocklist for stocks dropdown in modal
     *
     * @return
     */
    getStockList() {
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
    /**
     * controls save button disabled property based on whether user has completely
     * input on all fields
     *
     * @return
     */
    fieldsWatch() {
      if (
        this.stocksDropdownModel &&
        (this.entryPriceModel != "" ||
          this.stopLossModel != "" ||
          this.takeProfitModel != "")
      ) {
        this.saveButtonDisable = false;
      } else {
        this.saveButtonDisable = true;
      }
    },
    /**
     * Fires when user clicks add watch button.
     * First checks if user is already watching that specific stock
     * if not, execute POST request to api to add to watched stocks
     *
     * @return
     */
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
          user_id: this.$auth.user.data.user.uuid,
          stock_id:
            typeof this.stocksDropdownModel == "string"
              ? this.stocksDropdownModel
              : this.addnewstock,
          entry_price: this.entryPriceModel,
          take_profit: this.takeProfitModel,
          stop_loss: this.stopLossModel
        };
        this.$api.watchlist.watchlists.create(params).then(
          function(response) {
            this.watchCardModalLoading = false;
            if (response.success) {
              if (typeof this.stocksDropdownModel == "string") {
                this.$emit("addFromMostWatched");
              }
              let alert = {
                model: true,
                state: true,
                message: response.message
              };
              this.setAlert(alert);
              this.dialog = false;
              //This line sets vuex renderchartkey. Watchlist.vue watches this value, if it detects a change, chart is re-rendered
              this.keyCounter = this.renderChartKey;
              this.keyCounter++;
              this.setRenderChartKey(this.keyCounter);
            } else {
              let alert = {
                model: true,
                state: false,
                message: response.message
              };
              this.setAlert(alert);
            }
          }.bind(this)
        );
      } else {
        this.watchCardModalLoading = false;
        let alert = {
          model: true,
          state: false,
          message: "Watchlist already exists!"
        };
        this.setAlert(alert);
      }
      this.stocksDropdownModel = "";
      this.entryPriceModel = "";
      this.stopLossModel = "";
      this.takeProfitModel = "";
    }
  }
};
</script>
