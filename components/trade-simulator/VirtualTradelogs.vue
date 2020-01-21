<template>
  <v-col class="pa-0" ref="componentWrapper">
    <!-- Don't remove ref value. Used for sharing -->
    <v-card-title class="text-left justify-center align-center px-0 py-3 pt-5">
      <v-col class="pa-0 pr-3" cols="12" sm="3" md="3">
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Search"
          outlined
          dense
          hide-details
          :dark="lightSwitch == true"
          :style="{ background: cardBackground }"
          color="success"
          class="tl_searchfields"
        ></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
      <v-btn
        small
        dark
        text
        color="success"
        @click="filterDate('day')"
        class="text-capitalize"
        elevation="0"
        style="font-size:14px;"
      >Day</v-btn>
      <v-btn
        small
        dark
        text
        color="success"
        @click="filterDate('week')"
        class="text-capitalize"
        elevation="0"
        style="font-size:14px;"
      >Week</v-btn>
      <v-btn
        small
        dark
        text
        color="success"
        @click="filterDate('month')"
        class="text-capitalize"
        elevation="0"
        style="font-size:14px;"
      >Month</v-btn>
      <v-btn
        small
        dark
        text
        color="success"
        @click="filterDate('year')"
        class="text-capitalize"
        elevation="0"
        style="font-size:14px;"
      >Year</v-btn>
      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        persistent
        width="290px"
        :dark="lightSwitch == true"
        :style="{ background: cardBackground }"
      >
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" text class="px-1" color="success">
            <span class="text-capitalize">Custom</span>
          </v-btn>
        </template>
        <v-date-picker
          v-model="date"
          color="#00121e"
          :dark="lightSwitch == true"
          :style="{ background: cardBackground }"
          class="datepicker-container"
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn text color="success" @click="modal = false">Cancel</v-btn>
          <v-btn text color="success" @click="filterDate(date)">OK</v-btn>
        </v-date-picker>
      </v-dialog>
      <v-spacer></v-spacer>
      <v-btn icon small @click="showShareModal()" :dark="lightSwitch == 0 ? false : true">
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :search="search"
      :items="tradeLogs"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      @page-count="pageCount = $event"
      :dark="lightSwitch == true"
      :style="{ background: cardBackground }"
      class="data_table-container pl-10 secondary--text"
    >
      <template v-slot:item.stock_id="{ item }">
        <span :style="{ color: secondaryColor }">{{ item.stock_id }}</span>
      </template>
      <template v-slot:item.date="{ item }">
        <span :style="{ color: secondaryColor }">{{ item.meta.date.split(' ')[0] }}</span>
      </template>
      <template v-slot:item.amount="{ item }">
        <span :style="{ color: secondaryColor }">{{ item.amount }}</span>
      </template>
      <template v-slot:item.average_price="{ item }">
        <span :style="{ color: secondaryColor }">{{ addcomma(parseFloat(item.meta.average_price)) }}</span>
      </template>
      <template v-slot:item.buy_value="{ item }">
        <span :style="{ color: secondaryColor }">{{ addcomma(parseFloat(item.meta.buy_value)) }}</span>
      </template>
      <template v-slot:item.sell_price="{ item }">
        <span :style="{ color: secondaryColor }">{{ addcomma(parseFloat(item.meta.sell_price)) }}</span>
      </template>
      <template v-slot:item.total_value="{ item }">
        <span :style="{ color: secondaryColor }">{{ addcomma(parseFloat(item.total_value)) }}</span>
      </template>
      <template v-slot:item.profit_loss="{ item }">
        <span
          :class="item.meta.profit_loss > 0 ? 'positive' : item.meta.profit_loss < 0 ? 'negative' : 'neutral' "
        >{{ addcomma(parseFloat(item.meta.profit_loss)) }}</span>
      </template>
      <template v-slot:item.profit_loss_percentage="{ item }">
        <span
          :class="item.meta.profit_loss_percentage > 0 ? 'positive' : item.meta.profit_loss_percentage < 0 ? 'negative' : 'neutral' "
        >{{ addcomma(parseFloat(item.meta.profit_loss_percentage)) }}%</span>
      </template>

      <template v-slot:item.action="{ item }">
        <div
          v-show="menuShow"
          class="sidemenu_actions"
          :dark="lightSwitch == true"
          :style="{ background: cardBackground }"
          :id="`tl_${item.id}`"
          @mouseover="tradelogsmenuLogsShow(item)"
          @mouseleave="tradelogsmenuLogsHide(item)"
        >
          <v-btn small class="caption btn_sidemenu" text>Details</v-btn>
          <v-btn small class="caption btn_sidemenu" text>Edit</v-btn>
          <v-btn small class="caption btn_sidemenu"  @click.stop="showSellDelete=true" v-on:click="deleteLogs(item.action)" text>Delete</v-btn>
        </div>
        <v-icon
          small
          class="mr-2"
          @mouseover="tradelogsmenuLogsShow(item)"
          :style="{ color: secondaryColor }"
        >mdi-dots-horizontal</v-icon>
      </template>
    </v-data-table>
    <v-row>
      <v-col
        style="font-size: 12px;"
        class="text-right font-weight-regular mr-10"
        width="100%"
        :style="{ color: primaryColor }"
      >
        Total Profit/Loss as of {{ this.date }}:
        <span
          class="ml-3"
          :class="(this.totalProfitLoss < 0 ? 'negative' : 'positive')"
        >{{ this.totalProfitLoss.toFixed(2) }}</span>
        <span
          class="ml-8 mr-1"
          :class="(this.totalProfitLossPerf < 0 ? 'negative' : 'positive')"
        >{{ this.totalProfitLossPerf.toFixed(2) }}%</span>
      </v-col>
    </v-row>
    <v-card
      class="d-flex justify-space-between align-center my-5"
      color="transparent"
      elevation="0"
    >
     <!-- <v-card color="transparent" class="justify-center" elevation="0">
        <v-card-title class="pa-0" style="font-size:12px;">
          <span :style="{ color: secondaryColor }">Show Rows</span>
          <v-spacer></v-spacer>
          <v-text-field
            :value="itemsPerPage"
            type="number"
            min="5"
            max="10"
            @input="itemsPerPage = parseInt($event, 10)"
            :dark="lightSwitch == true"
            :style="{ background: cardBackground }"
            class="pt-0 pl-4 mt-0 ml-1 show_rows"
            style="font-size:12px;"
            color="success"
            dense
          ></v-text-field>
          <span class="pl-1" :style="{ color: secondaryColor }">of {{ tradeLogs.length }}</span>
        </v-card-title>
      </v-card> -->
      <v-card color="transparent" elevation="0">
        <v-pagination
          class="d-flex flex-end lp_data_table-pagination"
          color="transparent"
          dark
          v-model="page"
          :length="pageCount"
        ></v-pagination>
      </v-card>
    </v-card>
    <share-modal
      v-if="showShareForm"
      :imageid="shareLink"
      @closeModal="showShareForm = false"
    />
    <sell-delete
      v-on:confirmedDelete="deleteConfirm"
      :visible="showSellDelete"
      :itemDetails="itemDetails"
      @close="showSellDelete=false"
    />
  </v-col>
</template>
<script>
import shareModal from "~/components/modals/Share";
import sellDelete from "~/components/modals/SellDelete";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    shareModal,
    sellDelete
  },
  data() {
    return {
      shareLink: "",
      showShareForm: false,
      showScheduleForm: false,
      showSellDelete: false,
      itemDetails: null,
      itemsPerPage: 5,
      search: "",
      headers: [
        { text: "Stocks", value: "stock_id", align: "left", sortable: false },
        { text: "Date", value: "date", align: "right" },
        { text: "Volume", value: "amount", align: "right" },
        { text: "Ave. Price", value: "average_price", align: "right" },
        { text: "Buy Value", value: "buy_value", align: "right" },
        { text: "Sell Price", value: "sell_price", align: "right" },
        { text: "Sell Value", value: "total_value", align: "right" },
        { text: "Profit/Loss", value: "profit_loss", align: "right" },
        { text: "Perf. (%)", value: "profit_loss_percentage", align: "right" },
        { text: "", value: "action", sortable: false, align: "right" }
      ],
      tradeLogs: [],
      filter: [],
      tradelogs2: [],
      page: 1,
      pageCount: 0,
      menuShow: false,
      selectedProfile: null,
      componentKeys: 0,
      totalProfitLoss: 0,
      totalProfitLossPerf: 0,
      totalPerf: 0,
      date: new Date().toISOString().substr(0, 10),
      modal: false,
      confirmdelete: false,
      itemToDelete: '',
    };
  },
  props: ["item"],
  computed: {
    ...mapGetters({
      simulatorPortfolioID: "tradesimulator/getSimulatorPortfolioID",
      simulatorOpenPosition: "tradesimulator/getSimulatorOpenPosition",
      lightSwitch: "global/getLightSwitch"
    }),
    /**
     * Toggle background color (Dark/light Theme)
     *
     * @return  {String}  hex code
     */
    cardBackground() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    },
    /**
     * Toggle primary color (Dark/light Theme)
     *
     * @return  {String}  hex code
     */
    primaryColor() {
      return this.lightSwitch == 0 ? "#494949" : "#e5e5e5";
    },
    /**
     * Toggle secondary color (Dark/light Theme)
     *
     * @return  {String}  hex code
     */
    secondaryColor() {
      return this.lightSwitch == 0 ? "#535358" : "#b6b6b6"; // #eae8e8
    }
  },
  mounted() {
    if (this.simulatorPortfolioID != 0 ? this.getTradeLogs() : "");
  },
  watch: {
    simulatorPortfolioID() {
      this.getTradeLogs();
    },
    simulatorOpenPosition() {
      this.getTradeLogs();
    },
    confirmdelete(){
      this.execute(this.itemToDelete);
    }
  },
  methods: {
    ...mapActions({
      setSimulatorPortfolioID: "tradesimulator/setSimulatorPortfolioID",
      setSimulatorOpenPosition: "tradesimulator/setSimulatorOpenPosition"
    }),
     async showShareModal() {
      const el = this.$refs.componentWrapper;
      const options = {
        type: "dataURL"
      };
      this.shareLink = await this.$html2canvas(el, options);
      this.showShareForm = true;
    },
    /**
     * delete confirmation
     *
     * @param   {boolean}  value  true/false
     *
     */
    deleteConfirm(value){
      this.confirmdelete = value;
    },

    /**
     * Execute Delete
     *
     * @param   {[type]}  item  Stock ID
     *
     */
    execute(item){
      if(this.confirmdelete){
        let profit = 0;
        let perc = 0;
        let plossperc = [];
        for (let index = 0; index < this.tradeLogs.length; index++) {
           profit = this.tradeLogs[index].meta.profit_loss;
           perc = this.tradeLogs[index].meta.profit_loss_percentage;
          if(this.tradeLogs[index].id == item){            
            this.tradeLogs.splice(index, 1);
            this.totalProfitLoss = parseFloat(this.totalProfitLoss) - parseFloat(profit);
            this.totalProfitLossPerf = parseFloat(this.totalProfitLossPerf) - parseFloat(perc);   
             this.$emit("totalRealized", this.totalProfitLoss);
          }else { 
            if (
                  parseFloat(perc) < 0
                ) {
                  plossperc[index] = parseFloat(perc);
                  let maxx = this.arrayMax(plossperc);
                  this.$emit("MaxDrawdown", maxx.toFixed(2));
                }
          }
        }
      }
    },

    /**
     * delete initialization
     *
     * @param   {[type]}  item  details
     *
     */
    deleteLogs(item) {
      this.confirmdelete = false;
      this.itemDetails = item;
      this.itemToDelete = item.id;
    },

    /**
     * get Tradelogs Data
     *
     */
    getTradeLogs() {
      const tradelogsparams = {
        fund: this.simulatorPortfolioID
      };

      this.totalProfitLoss = 0;
      this.totalProfitLossPerf = 0;
      this.$api.journal.portfolio.tradelogs(tradelogsparams).then(

        function(result) {

          this.tradeLogs = result.data.logs;
          this.tradelogs2 = this.tradeLogs;
          let plossperc = [];
          for (let i = 0; i <  this.tradeLogs.length; i++) {
            const params = {
              "symbol-id": this.tradeLogs[i].meta.stock_id
            };
            this.$api.chart.stocks.list(params).then(
              function(results) {
                this.tradeLogs[i].stock_id = results.data.symbol;
                let buyvalueResult =
                  this.tradeLogs[i].meta.average_price *
                  this.tradeLogs[i].amount;
                let average_price = {
                  average_price: this.tradeLogs[i].meta.average_price,
                  date: new Date().toISOString().substr(0, 10),
                  ...this.tradeLogs[i].meta,
                  buy_value: buyvalueResult,
                  profit_loss: 0,
                  profit_loss_percentage: 0
                };
                this.tradeLogs[i].meta = { ...average_price };
                this.tradeLogs[i].meta.profit_loss =
                  this.tradeLogs[i].total_value -
                  this.tradeLogs[i].meta.buy_value;
                this.tradeLogs[i].meta.profit_loss_percentage =
                  (this.tradeLogs[i].meta.profit_loss /
                    this.tradeLogs[i].meta.buy_value) *
                  100;
                this.totalProfitLoss =
                  this.totalProfitLoss +
                  parseFloat(this.tradeLogs[i].meta.profit_loss);
                this.totalProfitLossPerf =
                  this.totalProfitLossPerf +
                  parseFloat(this.tradeLogs[i].meta.profit_loss_percentage);
                this.tradeLogs[i].action = {
                    id: this.tradeLogs[i].id
                  };
                this.$emit("totalRealized", this.totalProfitLoss);

                if (
                  parseFloat(this.tradeLogs[i].meta.profit_loss_percentage) < 0
                ) {
                  plossperc[i] = this.tradeLogs[i].meta.profit_loss_percentage;
                  let maxx = this.arrayMax(plossperc);
                  this.$emit("MaxDrawdown", maxx.toFixed(2));
                }
              }.bind(this)
            );
          }

        }.bind(this)
      );
    },

    /**
     * Calculate Max Drawdown
     *
     * @param   {array}  arr  tradelogs percentage
     *
     * @return  {[type]}     minimum percentage
     */
    arrayMax(arr) {
      var len = arr.length,
        min = Infinity;
      while (len--) {
        if (arr[len] < min) {
          min = arr[len];
        }
      }
      return min;
    },
    /**
     * Calculate Buy Fees
     *
     * @param   {[type]}  buyResult  (Position * last price)
     *
     * @return  {float}             total fees
     */
    buyfees(buyResult) {
      let dpartcommission = buyResult * 0.0025;
      let dcommission = dpartcommission > 20 ? dpartcommission : 20;
      // TAX
      let dtax = dcommission * 0.12;
      // Transfer Fee
      let dtransferfee = buyResult * 0.00005;
      // SCCP
      let dsccp = buyResult * 0.0001;
      let dall = dcommission + dtax + dtransferfee + dsccp;
      return buyResult + dall;
    },
    /**
     * Calculate Sell Fees
     *
     * @param   {[type]}  buyResult  (Position * last price)
     *
     * @return  {float}              total fees
     */
    sellfees(buyResult) {
      let dpartcommission = buyResult * 0.0025;
      let dcommission = dpartcommission > 20 ? dpartcommission : 20;
      // TAX
      let dtax = dcommission * 0.12;
      // Transfer Fee
      let dtransferfee = buyResult * 0.00005;
      // SCCP
      let dsccp = buyResult * 0.0001;
      let dsell = buyResult * 0.006;
      let dall = dcommission + dtax + dtransferfee + dsccp + dsell;
      return buyResult - dall;
    },
    
    tradelogsmenuLogsShow(item) {
      let tl = document.getElementById(`tl_${item.id}`);
      tl.style.display = "block";
    },
    tradelogsmenuLogsHide(item) {
      let tl = document.getElementById(`tl_${item.id}`);
      tl.style.display = "none";
    },

    /**
     * Add comma separator
     *
     * @param   {int}  n            number
     * @param   {char}  sep         separator character
     * @param   {int}  decimals     number of decimals
     *
     */
    addcomma(n, sep, decimals) {
      sep = sep || "."; // Default to period as decimal separator
      decimals = decimals || 2; // Default to 2 decimals
      return (
        n.toLocaleString().split(sep)[0] + sep + n.toFixed(2).split(sep)[1]
      );
    },

    /**
     * Filter Data by Date
     *
     * @param   {object}  data  tradelogs data
     *
     */
    filterDate(data) {
      let d = new Date();

      let day = d.getDate();
      let fweek = new Date(d.getTime() - 7 * 24 * 60 * 60 * 1000);
      let fmonth = d.getMonth() + 1;
      let fyear = d.getFullYear();
      this.tradeLogs = this.tradelogs2;
      this.filter = this.tradeLogs;
      this.tradeLogs = [];
      let num = 0;

      for (let i = 0; i < this.filter.length; i++) {
        let fil_date = this.filter[i].meta.date.split(" ")[0];
        let today = fil_date.split("/")[1];
        let month = fil_date.split("/")[0];
        let year = fil_date.split("/")[2];
        if (data == "day") {
          if (day == today) {
            this.tradeLogs[num] = this.filter[i];
            num++;
          }
        } else if (data == "month") {
          if (fmonth == month) {
            this.tradeLogs[num] = this.filter[i];
            num++;
          }
        } else if (data == "year") {
          if (fyear == year) {
            this.tradeLogs[num] = this.filter[i];
            num++;
          }
        } else if (data == "week") {
          let dayweek = fweek.getDate();
          let monthweek = fweek.getMonth() + 1;
          if (today >= dayweek && month == monthweek) {
            this.tradeLogs[num] = this.filter[i];
            num++;
          }
        } else {
          let cyr = data.split("-")[0];
          let cmo = data.split("-")[1];
          let cday = data.split("-")[2];
          if (year == cyr && month == cmo && today == cday) {
            this.tradeLogs[num] = this.filter[i];
            num++;
          }
          this.modal = false;
        }
      }
    }
  }
};
</script>

<style scoped>
.data_table-container {
  background: transparent;
}
.sidemenu_actions {
  position: absolute;
  width: auto;
  right: 0;
  background: #00121e;
  border: 1px solid #03dac5;
  border-radius: 4px;
  margin-top: -6px;
}
.positive {
  color: #03dac5;
}
.negative {
  color: #fe4949;
}
.btn_sidemenu:hover {
  color: #03dac5;
}
</style>
<style>
.theme--dark.v-picker__body {
  background: transparent;
}
.tl_searchfields .v-input__slot {
  margin: 0;
}
.tl_searchfields {
  transform: scale(0.7);
  transform-origin: left;
}
</style>
