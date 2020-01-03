<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="userStockData"
      class="elevation-1"
      style="background-color: transparent"
      :loading="tableLoading"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-dialog v-model="dialog" max-width="500px">
            <v-card :loading="watchCardModalLoading">
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.stock_id"
                        label="Stock"
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.entry_price"
                        type="number"
                        label="Entry Price"
                        prefix="₱"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.take_profit"
                        type="number"
                        label="Take Profit"
                        prefix="₱"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.stop_loss"
                        type="number"
                        label="Stop Loss"
                        prefix="₱"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
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
    tableLoading: true,
    watchList__alert: false,
    watchList__alertState: null,
    post__responseMsg: "",
    watchCardModalLoading: false,
    headers: [
      {
        text: "Stock",
        align: "left",
        sortable: false,
        value: "stock_id"
      },
      { text: "Entry Price", value: "entry_price", sortable: false },
      { text: "Take Profit", value: "take_profit", sortable: false },
      { text: "Stop Loss", value: "stop_loss", sortable: false },
      { text: "Actions", value: "action", sortable: false }
    ],
    userStockData: [],
    keyCounter: 1,
    editedIndex: -1,
    editedItem: {
      stock_id: "",
      entry_price: "",
      take_profit: "",
      stop_loss: ""
    },
    defaultItem: {
      stock_id: "",
      entry_price: "",
      take_profit: "",
      stop_loss: ""
    }
  }),

  computed: {
    ...mapGetters({
      userWatchedStocks: "watchers/getUserWatchedStocks",
      renderChartKey: "watchers/getRenderChartKey"
    }),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    userWatchedStocks() {
      this.populateStockDropdown();
    }
  },

  mounted() {
    this.populateStockDropdown();
  },

  methods: {
    ...mapActions({
      setUserWatchedStocks: "watchers/setUserWatchedStocks",
      setRenderChartKey: "watchers/setRenderChartKey"
    }),
    populateStockDropdown() {
      // GET Data from User Watchlist
      // Converts stock symbol_id to stock code like; 123123123 = 'JFC'
      this.shemes = JSON.parse(JSON.stringify(this.userWatchedStocks)); //removes vuex pointer and two way data binding
      this.userStockData = this.shemes;
      for (let i = 0; i < this.userStockData.length; i++) {
        //Just converts stock_id to stock symbol
        //INEFFICIENT AS FUCK; todo Refactor and improve
        const params = {
          "symbol-id": this.userStockData[i].stock_id
        };
        this.$api.chart.stocks.list(params).then(
          function(result) {
            this.userStockData[i].stock_id = result.data.symbol;
            this.tableLoading = false;
          }.bind(this)
        );
      }
    },
    editItem(item) {
      this.editedIndex = this.userStockData.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.watchCardModalLoading = "primary";
      const index = this.userStockData.indexOf(item);
      if (confirm("Are you sure you want to delete this item?")) {
        this.$api.watchlist.watchlists
          .delete(this.userWatchedStocks[index].id)
          .then(
            function(response) {
              if (response.success) {
                this.watchList__alert = true;
                this.post__responseMsg = response.message;
                this.watchList__alertState = true;
                this.watchCardModalLoading = false;
                this.keyCounter = this.renderChartKey;
                this.keyCounter++;
                this.setRenderChartKey(this.keyCounter);
                this.userStockData.splice(index, 1);
              } else {
                this.watchList__alert = true;
                this.post__responseMsg = response.message;
                this.watchList__alertState = false;
              }
            }.bind(this)
          );
      }
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      this.tableLoading = "primary";
      if (this.editedIndex > -1) {
        let params = {
          entry_price: this.editedItem.entry_price,
          take_profit: this.editedItem.take_profit,
          stop_loss: this.editedItem.stop_loss
        };
        this.$api.watchlist.watchlists
          .put(this.userWatchedStocks[this.editedIndex].id, params)
          .then(response => {
            if (response.success) {
              this.watchList__alert = true;
              this.post__responseMsg = response.message;
              this.watchList__alertState = true;
              this.keyCounter = this.renderChartKey;
              this.keyCounter++;
              this.setRenderChartKey(this.keyCounter);
            } else {
              this.watchList__alert = true;
              this.post__responseMsg = response.message;
              this.watchList__alertState = false;
            }
            this.tableLoading = false;
          });
        Object.assign(this.userStockData[this.editedIndex], this.editedItem);
      }
      this.close();
    }
  }
};
</script>
<style>
header {
  height: 0px !important; /* if present, naay empty header element na 64px */
}
</style>
