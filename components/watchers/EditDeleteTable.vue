<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="userStockData"
      style="background-color: transparent"
      :loading="tableLoading"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-dialog v-model="dialog" max-width="320px">
            <v-card
              :dark="lightSwitch == 0 ? false : true"
              :loading="watchCardModalLoading"
            >
              <v-card-title>
                <span class="body-1 font-weight-black">Edit Watched Stock</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" class="px-1">
                      <v-text-field
                        v-model="editedItem.stock_id"
                        color="success"
                        label="Watched Stock"
                        outlined
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="px-2 py-0">
                      <v-text-field
                        v-model="editedItem.entry_price"
                        color="success"
                        type="number"
                        label="Entry Price (Php)"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="px-2 py-0">
                      <v-text-field
                        v-model="editedItem.take_profit"
                        color="success"
                        type="number"
                        label="Take Profit (Php)"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="px-2">
                      <v-text-field
                        v-model="editedItem.stop_loss"
                        color="success"
                        type="number"
                        label="Stop Loss (Php)"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  :dark="lightSwitch == 0 ? false : true"
                  class="no-transform"
                  text
                  @click="close"
                  >Cancel</v-btn
                >
                <v-btn
                  :dark="lightSwitch == 0 ? false : true"
                  class="no-transform black--text px-6"
                  color="success"
                  @click="save"
                  >Save</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn class="no-transform" small text @click="editItem(item)"
          >Edit</v-btn
        >
        <v-btn class="no-transform" small text @click.stop="deleteDialog = true"
          >Delete</v-btn
        >
      </template>
    </v-data-table>

    <v-dialog v-model="deleteDialog" width="500">
      <v-card :dark="lightSwitch == 0 ? false : true">
        <v-card-title class="body-2 font-weight-black" primary-title>
          Delete Confirmation
        </v-card-title>

        <v-divider class="pb-2"></v-divider>
        <v-card-text>
          Are you sure you want to delete this watched stock?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="no-transform px-5" text @click="deleteDialog = false">
            Cancel
          </v-btn>
          <v-btn
            class="black--text no-transform px-5"
            color="success"
            @click="deleteItem(item)"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    dialog: false,
    tableLoading: false,
    watchCardModalLoading: false,
    headers: [
      {
        text: "Stock",
        class: "body-2",
        sortable: false,
        value: "stock_id"
      },
      {
        text: "Entry Price",
        class: "body-2",
        value: "entry_price",
        sortable: false
      },
      {
        text: "Take Profit",
        class: "body-2",
        value: "take_profit",
        sortable: false
      },
      {
        text: "Stop Loss",
        class: "body-2",
        value: "stop_loss",
        sortable: false
      },
      {
        text: "Actions",
        class: "body-2",
        align: "center",
        value: "action",
        sortable: false
      }
    ],
    userStockData: [],
    deleteDialog: false,
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
      renderChartKey: "watchers/getRenderChartKey",
      lightSwitch: "global/getLightSwitch"
    })
  },

  watch: {
    /**
     * Watches changes on dialog value, closes modal.
     *
     * @param   {string}  val
     *
     * @return
     */
    dialog(val) {
      val || this.close();
    },
    /**
     * Watches changes on userWatchedStocks. If user deletes/updates an item,
     * will execute GET function to update userWatchedStocks list
     *
     * @return
     */
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
      setRenderChartKey: "watchers/setRenderChartKey",
      setAlert: "global/setAlert"
    }),
    /**
     * GET Data from User Watchlist
     * Converts stock symbol_id to stock code like; 123123123 = 'JFC'
     *
     * @return
     */
    populateStockDropdown() {
      this.shemes = JSON.parse(JSON.stringify(this.userWatchedStocks)); //removes vuex pointer and two way data binding
      this.userStockData = this.shemes;
      for (let i = 0; i < this.userStockData.length; i++) {
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
    /**
     * fires when user is on edit mode
     *
     * @param   {string}  item
     *
     * @return
     */
    editItem(item) {
      this.editedIndex = this.userStockData.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    /**
     * fires when user clicks delete button
     *
     * @param   {string}  item
     *
     * @return
     */
    deleteItem(item) {
      this.watchCardModalLoading = "success";
      this.deleteDialog = false;
      const index = this.userStockData.indexOf(item);
      this.$api.watchlist.watchlists
        .delete(this.userWatchedStocks[index].id)
        .then(
          function(response) {
            if (response.success) {
              let alert = {
                model: true,
                state: true,
                message: response.message
              };
              this.setAlert(alert);

              this.watchCardModalLoading = false;
              this.keyCounter = this.renderChartKey;
              this.keyCounter++;
              this.setRenderChartKey(this.keyCounter);
              this.userStockData.splice(index, 1);
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
    },
    /**
     * Closes dialog
     *
     * @return
     */
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    /**
     * Will fire when user finishes editing and clicks save button.
     * Executes PUT request
     *
     * @return
     */
    save() {
      this.tableLoading = "success";
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
              let alert = {
                model: true,
                state: true,
                message: response.message
              };
              this.setAlert(alert);

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
.v-data-footer__select {
  display: none;
}
</style>
