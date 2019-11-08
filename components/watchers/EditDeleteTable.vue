<template>
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
          <v-card>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Dessert name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.entry_price"
                      label="entry_price"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.take_profit"
                      label="take_profit (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.stop_loss"
                      label="stop_loss (g)"
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
</template>
<style>
header {
  height: 0px !important; /* if present, naay empty header element na 64px */
}
</style>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    dialog: false,
    tableLoading: true,
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
    yawa: [],
    editedIndex: -1,
    editedItem: {
      stock_id: "",
      entry_price: 0,
      take_profit: 0,
      stop_loss: 0
    },
    defaultItem: {
      stock_id: "",
      entry_price: 0,
      take_profit: 0,
      stop_loss: 0
    }
  }),

  computed: {
    ...mapGetters({
      userWatchedStocks: "watchers/getUserWatchedStocks"
    }),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  mounted() {
    // GET Data from User Watchlist
    this.shemes = JSON.parse(JSON.stringify(this.userWatchedStocks));
    this.userStockData = this.shemes;
    for (let i = 0; i < this.userStockData.length; i++) {
      //Just converts stock_id to stock symbol
      //INEFFECIENT AS FUCKK; todo Refractor and improve
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

  methods: {
    ...mapActions({
      setUserWatchedStocks: "watchers/setUserWatchedStocks"
    }),

    editItem(item) {
      this.editedIndex = this.userStockData.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.userStockData.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.userStockData.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.userStockData[this.editedIndex], this.editedItem);
      } else {
        this.userStockData.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
