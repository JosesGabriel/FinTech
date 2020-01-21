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
          color="success"
          class="tl_searchfields"
        ></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
      <v-btn small dark text color="success" class="body-2 text-capitalize" elevation="0">Day</v-btn>
      <v-btn small dark text color="success" class="body-2 text-capitalize" elevation="0">Week</v-btn>
      <v-btn small dark text color="success" class="body-2 text-capitalize" elevation="0">Month</v-btn>
      <v-btn small dark text color="success" class="body-2 text-capitalize" elevation="0">Year</v-btn>
      <v-btn small dark text color="success" class="body-2 text-capitalize" elevation="0">Custom</v-btn>
      <v-spacer></v-spacer>
      <v-btn
        outlined
        color="success"
        dark
        class="rtf_top-btn text-capitalize mr-2"
        @click.stop="showRecordTrade=true"
        height="23"
      >
        <span class="v-btn__content">Record</span>
      </v-btn>

      <v-btn icon small @click="showShareModal()" :dark="lightSwitch == 0 ? false : true">
        <v-icon small color="tertiary">mdi-share-variant</v-icon>
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
      :loading="liveTradelogsLoading"
      loading-text="Loading..."
      class="data_table-container pl-10 secondary--text"
    >
      <template v-slot:item.stock_id="{ item }">
        <span class="pl-2" :style="{ color: fontcolor2 }">{{ item.meta.stock_id }}</span>
      </template>
      <template v-slot:item.date="{ item }">
        <span class="pl-2" :style="{ color: fontcolor2 }">{{ item.meta.date.substr(0, 10) }}</span>
      </template>
      <template v-slot:item.amount="{ item }">
        <span class="pl-2" :style="{ color: fontcolor2 }">{{ item.amount }}</span>
      </template>
      <template v-slot:item.average_price="{ item }">
        <span
          class="pl-2"
          :style="{ color: fontcolor2 }"
        >{{ formatAvePrice(item.meta.average_price) }}</span>
      </template>
      <template v-slot:item.buy_value="{ item }">
        <span class="pl-2" :style="{ color: fontcolor2 }">{{ formatPrice(item.buy_value) }}</span>
      </template>
      <template v-slot:item.sell_price="{ item }">
        <span class="pl-2" :style="{ color: fontcolor2 }">{{ formatPrice(item.meta.sell_price) }}</span>
      </template>
      <template v-slot:item.total_value="{ item }">
        <span class="pl-2" :style="{ color: fontcolor2 }">{{ formatPrice(item.total_value) }}</span>
      </template>
      <template v-slot:item.profit_loss="{ item }">
        <span
          :class="item.profit_loss > 0 ? 'positive' : item.profit_loss < 0 ? 'negative' : 'neutral' "
        >{{ formatPrice(item.profit_loss) }}</span>
      </template>
      <template v-slot:item.profit_loss_percentage="{ item }">
        <span
          :class="item.profit_loss_percentage > 0 ? 'positive' : item.profit_loss_percentage < 0 ? 'negative' : 'neutral' "
        >{{ formatPrice(item.profit_loss_percentage) }}%</span>
      </template>
      <template v-slot:item.action="{ item }">
        <div
          v-show="menuShow"
          :dark="lightSwitch == true"
          :style="{ background: cardbackground }"
          class="sidemenu_actions"
          :id="`tl_${item.id}`"
          @mouseover="tradelogsmenuLogsShow(item)"
          @mouseleave="tradelogsmenuLogsHide(item)"
        >
          <v-btn
            small
            class="caption btn_sidemenu"
            text
            @click.stop="showSellDetails=true"
            v-on:click="detailsLive(item)"
          >Details</v-btn>
          <v-btn
            small
            class="caption btn_sidemenu"
            text
            @click.stop="showSellDelete=true"
            v-on:click="deleteLive(item)"
          >Delete</v-btn>
        </div>
        <v-icon
          small
          class="mr-2 tertiary--text"
          @mouseover="tradelogsmenuLogsShow(item)"
        >mdi-dots-horizontal</v-icon>
      </template>
    </v-data-table>
    <v-row>
      <v-col class="text-right font-weight-bold caption" width="100%">
        <span class="font-weight-bold" :style="{ color: this.lightSwitch == 0 ? '#000000' : '#FFFFFF' }">Total Profit/Loss as of {{date}}:</span>
        <span
          class="ml-3"
          :class="(totalProfitLoss < 0 ? 'negative' : 'positive')"
        >{{ totalProfitLoss.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span>
      </v-col>
    </v-row>
    <v-card class="d-flex flex-row-reverse" color="transparent" elevation="0">
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
    <share-modal v-if="showShareForm" :imageid="shareLink" @closeModal="showShareForm = false" />
    <sell-delete
      :visible="showSellDelete"
      :itemDetails="itemDetails"
      @close="showSellDelete=false"
    />
    <sell-details
      :visible="showSellDetails"
      :itemDetails="itemDetails"
      @close="showSellDetails=false"
    />
    <record-trade :visible="showRecordTrade" @close="showRecordTrade=false" />
  </v-col>
</template>
<script>
import shareModal from "~/components/modals/Share";
import sellDelete from "~/components/modals/SellDelete";
import sellDetails from "~/components/modals/SellDetails";
import recordTrade from "~/components/modals/Record";

import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    shareModal,
    sellDelete,
    sellDetails,
    recordTrade
  },
  data() {
    return {
      shareLink: "",
      showShareForm: false,
      liveTradelogsLoading: "success",
      showScheduleForm: false,
      showSellDelete: false,
      showSellDetails: false,
      showRecordTrade: false,
      itemDetails: null,

      itemsPerPage: 10,
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
      page: 1,
      pageCount: 0,
      menuShow: false,

      selectedProfile: null,
      date: new Date().toISOString().substr(0, 10),
      totalProfitLoss: 0,
      totalProfitLossPerf: 0
    };
  },
  mounted() {
    if (this.defaultPortfolioId != 0 ? this.getTradeLogs() : "");
    this.formatDate();
  },
  computed: {
    ...mapGetters({
      defaultPortfolioId: "journal/getDefaultPortfolioId",
      renderPortfolioKey: "journal/getRenderPortfolioKey",
      renderEditKey: "journal/getRenderEditKey",
      lightSwitch: "global/getLightSwitch"
    }),
    /**
     * returns secondary font color
     *
     * @return  {string}  returns string
     */
    fontColor() {
      return this.lightSwitch == 0 ? "#494949" : "#e5e5e5";
    },
    /**
     * returns tertiary font color
     *
     * @return  {string}  returns string
     */
    fontcolor2() {
      return this.lightSwitch == 0 ? "#535358" : "#b6b6b6"; // #eae8e8
    },
    /**
     * returns background color
     *
     * @return  {string}  returns string
     */
    cardbackground() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    }
  },
  methods: {
    ...mapActions({
      setRenderPortfolioKey: "journal/setRenderPortfolioKey"
    }),
    async showShareModal() {
      const el = this.$refs.componentWrapper;
      const options = {
        type: "dataURL"
      };
      this.shareLink = await this.$html2canvas(el, options);
      this.showShareForm = true;
    },
    deleteLive: function(item) {
      this.itemDetails = item;
    },
    detailsLive: function(item) {
      this.itemDetails = item;
    },
    editLive: function(item) {
      this.itemDetails = item;
    },
    getTradeLogs() {
      const tradelogsparams = {
        fund: this.defaultPortfolioId
      };
      this.$api.journal.portfolio.tradelogs(tradelogsparams).then(
        function(result) {
          this.tradeLogs = result.data.logs;

          this.totalProfitLoss = 0;
          this.totalProfitLossPerf = 0;
          for (let i = 0; i < this.tradeLogs.length; i++) {
            const params = {
              "symbol-id": this.tradeLogs[i].meta.stock_id
            };
            this.$api.chart.stocks.list(params).then(
              function(result) {
                this.tradeLogs[i].meta.stock_id = result.data.symbol;
              }.bind(this)
            );

            let buyvalueResult =
              this.tradeLogs[i].meta.average_price * this.tradeLogs[i].amount;
            let average_price = {
              ...this.tradeLogs[i],
              buy_value: buyvalueResult,
              profit_loss: 0,
              profit_loss_percentage: 0
            };
            this.tradeLogs[i] = { ...average_price };

            this.tradeLogs[i].profit_loss =
              this.tradeLogs[i].total_value - this.tradeLogs[i].buy_value;
            this.tradeLogs[i].profit_loss_percentage =
              (this.tradeLogs[i].profit_loss / this.tradeLogs[i].buy_value) *
              100;

            this.totalProfitLoss =
              this.totalProfitLoss + parseFloat(this.tradeLogs[i].profit_loss);
            this.totalProfitLossPerf =
              this.totalProfitLossPerf +
              parseFloat(this.tradeLogs[i].profit_loss_percentage);
          }
          this.liveTradelogsLoading = false;
        }.bind(this)
      );
      this.componentKeys++;
    },
    tradelogsmenuLogsShow: function(item) {
      let tl = document.getElementById(`tl_${item.id}`);
      tl.style.display = "block";
    },
    tradelogsmenuLogsHide: function(item) {
      let tl = document.getElementById(`tl_${item.id}`);
      tl.style.display = "none";
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    formatAvePrice(value) {
      let val = (value / 1).toFixed(3).replace(".", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    /**
     * current date formatted
     *
     * @return  {string}  returns date
     */
    formatDate() {
      let date = new Date();
      let monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];

      let day = date.getDate();
      let monthIndex = date.getMonth();
      let year = date.getFullYear();

      this.date = monthNames[monthIndex] + " " + day + ", " + year;
    }
  },
  watch: {
    defaultPortfolioId: function() {
      this.getTradeLogs();
    },
    renderPortfolioKey: function() {
      this.getTradeLogs();
    },
    renderEditKey: function() {
      this.getTradeLogs();
    }
  }
};
</script>

<style scoped>
.sidemenu_actions {
  position: absolute;
  width: auto;
  right: 0;
  margin-top: -6.5px;
  border: 1px solid rgb(0, 255, 195);
  border-radius: 4px;
}
.data_table-container {
  background: transparent;
}
.rtf_top-btn .v-btn__content {
  font-size: 12px !important;
}
.btn_sidemenu:hover {
  color: #03dac5;
}
.data_table-container {
  background: transparent;
}
</style>
<style>
.data_table-container.theme--light.v-data-table thead tr th {
  color: #494949;
}
.tl_searchfields .v-input__slot {
  margin: 0;
}
.tl_searchfields {
  transform: scale(0.7);
  transform-origin: left;
}
</style>