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
      <v-btn
        small
        dark
        text
        color="success"
        @click="filterDate('all')"
        class="body-2 text-capitalize"
        elevation="0"
      >All</v-btn>
      <v-btn
        small
        dark
        text
        color="success"
        @click="filterDate('day')"
        class="body-2 text-capitalize"
        elevation="0"
      >Day</v-btn>
      <v-btn
        small
        dark
        text
        color="success"
        @click="filterDate('week')"
        class="body-2 text-capitalize"
        elevation="0"
      >Week</v-btn>
      <v-btn
        small
        dark
        text
        color="success"
        @click="filterDate('month')"
        class="body-2 text-capitalize"
        elevation="0"
      >Month</v-btn>
      <v-btn
        small
        dark
        text
        color="success"
        @click="filterDate('year')"
        class="body-2 text-capitalize"
        elevation="0"
      >Year</v-btn>
      <v-btn
        small
        dark
        text
        color="success"
        @click.stop="showCustomDate=true"
        class="body-2 text-capitalize"
        elevation="0"
      >Custom</v-btn>
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
        <span class="pl-2" :style="{ color: fontcolor2 }">{{ localFormat(item.meta.date, 'fs') }}</span>
      </template>
      <template v-slot:item.amount="{ item }">
        <span class="pl-2" :style="{ color: fontcolor2 }">{{ item.amount }}</span>
      </template>
      <template v-slot:item.average_price="{ item }">
        <span
          class="pl-2"
          :style="{ color: fontcolor2 }"
        >{{ item.meta.average_price | numeral("0,0.000") }}</span>
      </template>
      <template v-slot:item.buy_value="{ item }">
        <span class="pl-2" :style="{ color: fontcolor2 }">{{ item.buy_value | numeral("0,0.00") }}</span>
      </template>
      <template v-slot:item.sell_price="{ item }">
        <span
          class="pl-2"
          :style="{ color: fontcolor2 }"
        >{{ item.meta.sell_price | numeral("0,0.00") }}</span>
      </template>
      <template v-slot:item.total_value="{ item }">
        <span class="pl-2" :style="{ color: fontcolor2 }">{{ item.total_value | numeral("0,0.00") }}</span>
      </template>
      <template v-slot:item.profit_loss="{ item }">
        <span
          :class="item.profit_loss > 0 ? 'positive' : item.profit_loss < 0 ? 'negative' : 'neutral' "
        >{{ item.profit_loss | numeral("0,0.00") }}</span>
      </template>
      <template v-slot:item.profit_loss_percentage="{ item }">
        <span
          :class="item.profit_loss_percentage > 0 ? 'positive' : item.profit_loss_percentage < 0 ? 'negative' : 'neutral' "
        >{{ item.profit_loss_percentage | numeral("0,0.00") }}%</span>
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
        <span
          class="font-weight-bold"
          :style="{ color: lightSwitch == 0 ? '#000000' : '#FFFFFF' }"
        >Total Profit/Loss as of {{date}}:</span>
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
          :dark="lightSwitch == 1 ? true : false"
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
    <custom-date :visible="showCustomDate" @clicked="filterDate" @close="showCustomDate=false" />
  </v-col>
</template>
<script>
import shareModal from "~/components/modals/Share";
import sellDelete from "~/components/modals/SellDelete";
import sellDetails from "~/components/modals/SellDetails";
import recordTrade from "~/components/modals/Record";
import customDate from "~/components/modals/CustomDate";

import { LocalFormat } from "~/assets/js/helpers/datetime";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    shareModal,
    sellDelete,
    sellDetails,
    recordTrade,
    customDate
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
      showCustomDate: false,
      itemDetails: null,

      itemsPerPage: 10,
      search: "",
      headers: [
        { text: "Stocks", value: "stock_id", align: "left" },
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
      tradeLogsBackup: [],
      filter: [],
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
  watch: {
    /**
     * Watch defaultPortfolioId vuex if id changed perform function inside
     *
     * @return  {string}  getting the current portfolio id
     */
    defaultPortfolioId() {
      this.getTradeLogs();
    },
    /**
     * Watch renderPortfolioKey vuex if key changed perform function inside
     *
     * @return  {number}  get increment key
     */
    renderPortfolioKey() {
      this.getTradeLogs();
    },
    /**
     * if trade edit or remove succed renderEditKey will increment
     *
     * @return  {number}  increment key
     */
    renderEditKey() {
      this.getTradeLogs();
    }
  },
  methods: {
    ...mapActions({
      setRenderPortfolioKey: "journal/setRenderPortfolioKey"
    }),
    localFormat: LocalFormat,
    /**
     * Capture components then draw to canvas and share
     *
     * @return  {image}  get captured components as canvas
     */
    async showShareModal() {
      const el = this.$refs.componentWrapper;
      const options = {
        type: "dataURL"
      };
      this.shareLink = await this.$html2canvas(el, options);
      this.showShareForm = true;
    },
    /**
     * pushes object when user click the filter date buttons
     * Filters: All, Day, Week, Month, Year, Custom
     *
     * @param   {string}  str  watch the str which date filter should be used
     *
     * @return  {object}       returns objects
     */
    filterDate(str) {
      const now = new Date();
      //day date filter
      const d = new Date().getDate();
      //week date filter
      const fweek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const dayWeek = fweek.getDate();
      const monthWeek = fweek.getMonth() + 1;
      // month date filter
      const fmonth = now.getMonth() + 1;
      // year date filter
      const fyear = now.getFullYear();

      this.tradeLogs = [];

      // Show all trades
      if (str == "all") {
        this.tradeLogs = this.tradeLogsBackup;
      }

      this.filter = this.tradeLogsBackup;
      let num = 0;

      for (let i = 0; i < this.filter.length; i++) {
        let fil_date = this.filter[i].meta.date.split(" ")[0];
        const month = fil_date.split("-")[1];
        const year = fil_date.split("-")[0];
        const today = fil_date.split("-")[2];

        const dateFrom = this.localFormat(str.dateFrom, "unix");
        const dateTo = this.localFormat(str.dateTo, "unix");

        if (str == "day" && d == today && month == monthWeek) {
          this.tradeLogs.push(this.filter[i]);
        } else if (
          str == "week" &&
          today >= dayWeek &&
          month == monthWeek &&
          year == fyear
        ) {
          this.tradeLogs.push(this.filter[i]);
        } else if (str == "month" && month == fmonth && year == fyear) {
          this.tradeLogs.push(this.filter[i]);
        } else if (str == "year" && year == fyear) {
          this.tradeLogs.push(this.filter[i]);
        } else if (
          str.state == "custom" &&
          this.localFormat(this.filter[i].meta.date, "unix") >= dateFrom &&
          this.localFormat(this.filter[i].meta.date, "unix") <= dateTo
        ) {
          this.tradeLogs.push(this.filter[i]);
        }
      }
    },
    /**
     * passing credentials of each item to be deleted to this.itemDetails (to props)
     *
     * @param   {object}  item  object from hovered item
     *
     * @return  {string}        passing this string "block" to hovered item
     */
    deleteLive(item) {
      this.itemDetails = item;
    },
    /**
     * passing credentials of each item to details to this.itemDetails (to props)
     *
     * @param   {object}  item  object from hovered item
     *
     * @return  {string}        passing this string "block" to hovered item
     */
    detailsLive(item) {
      this.itemDetails = item;
    },
    /**
     * getTradeLogs gets update when getTradeLogs triggered
     *
     * @return  {[array]} returned array
     */
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

          this.tradeLogsBackup = this.tradeLogs;

          this.liveTradelogsLoading = false;
        }.bind(this)
      );
      this.componentKeys++;
    },
    /**
     * if trades are hovered item will show, item will assigned as hovered with this function
     *
     * @param   {object}  item  object from hovered item
     *
     * @return  {string}        passing this string "block" to hovered item
     */
    tradelogsmenuLogsShow(item) {
      let tl = document.getElementById(`tl_${item.id}`);
      tl.style.display = "block";
    },
    /**
     * if trades are hovered item will hide, item will assigned as hovered with this function
     *
     * @param   {object}  item  object from hovered item
     *
     * @return  {string}        passing this string "block" to hovered item
     */
    tradelogsmenuLogsHide(item) {
      let tl = document.getElementById(`tl_${item.id}`);
      tl.style.display = "none";
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