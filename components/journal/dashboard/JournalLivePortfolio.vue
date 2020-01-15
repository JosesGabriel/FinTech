<template>
  <v-col class="pa-0" ref="componentWrapper">
    <!-- Don't remove ref value. Used for sharing -->
    <v-card-title class="text-left justify-left px-0 py-3 pt-5">
      <h1 class="font-weight-regular subtitle-2" :style="{ color: fontColor }">OPEN POSITION/S (PHP)</h1>
      <v-spacer></v-spacer>
      <v-btn
        outlined
        color="success"
        dark
        class="rtf_top-btn text-capitalize mr-2"
        @click.stop="showResetForm=true"
        height="23"
      >
        <span class="v-btn__content">Reset</span>
      </v-btn>
      <v-btn
        outlined
        color="success"
        dark
        class="rtf_top-btn text-capitalize mr-2"
        @click.stop="showTradeViewForm=true"
        :disabled="ifVirtualShow"
        height="23"
      >
        <span class="v-btn__content">Trade</span>
      </v-btn>
      <v-btn
        outlined
        color="success"
        dark
        class="rtf_top-btn text-capitalize"
        @click.stop="showFundsForm=true"
        :disabled="fundsShow"
        height="23"
      >
        <span class="v-btn__content">Fund</span>
      </v-btn>

      <v-btn icon small @click="showShareModal()" :dark="lightSwitch == 0 ? false : true">
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="portfolioLogs"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      :dark="lightSwitch == true"
      hide-default-footer
      @page-count="pageCount = $event"
      :loading="livePortfolioLoading"
      loading-text="Loading..."
      class="data_table-container pl-10 secondary--text"
    >
      <template v-slot:item.stock_symbol="{ item }">
        <span class="pl-3" :style="{ color: fontcolor2 }">{{ item.stock_symbol }}</span>
      </template>
      <template v-slot:item.position="{ item }">
        <span
          class="pl-3"
          :style="{ color: fontcolor2 }"
        >{{ item.position.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span>
      </template>
      <template v-slot:item.average_price="{ item }">
        <span
          class="pl-3"
          :style="{ color: fontcolor2 }"
        >{{ formatPriceAvePrice(item.average_price) }}</span>
      </template>
      <template v-slot:item.total_value="{ item }">
        <span class="pl-3" :style="{ color: fontcolor2 }">{{ formatPrice(item.total_value) }}</span>
      </template>
      <template v-slot:item.market_value="{ item }">
        <span class="pl-3" :style="{ color: fontcolor2 }">{{ formatPrice(item.market_value) }}</span>
      </template>
      <template v-slot:item.profit_loss="{ item }">
        <span
          :class="item.profit_loss > 0 ? 'positive' : item.profit_loss < 0 ? 'negative' : 'neutral' "
        >{{ formatPrice(item.profit_loss) }}</span>
      </template>
      <template v-slot:item.pl_percentage="{ item }">
        <span
          :class="item.pl_percentage > 0 ? 'positive' : item.pl_percentage < 0 ? 'negative' : 'neutral' "
        >{{ formatPrice(item.pl_percentage) }}%</span>
      </template>
      <template v-slot:item.action="{ item }">
        <div
          v-show="menuShow"
          :dark="lightSwitch == true"
          :style="{ background: cardbackground }"
          class="sidemenu_actions"
          :id="`pl_${item.id}`"
          @mouseover="menuLogsShow(item)"
          @mouseleave="menuLogsHide(item)"
        >
          <v-btn
            small
            class="caption btn_sidemenu"
            text
            @click.stop="showTradeDetails=true"
            v-on:click="detailsLive(item)"
          >Details</v-btn>
          <v-btn
            small
            class="caption btn_sidemenu"
            text
            @click.stop="showEditDetails=true"
            v-on:click="editLive(item)"
          >Edit</v-btn>
          <v-btn
            small
            class="caption btn_sidemenu"
            text
            @click.stop="showDelete=true"
            v-on:click="deleteLive(item)"
          >Delete</v-btn>
        </div>
        <v-icon
          small
          class="mr-2 secondary--text"
          @mouseover="menuLogsShow(item)"
        >mdi-dots-horizontal</v-icon>
      </template>
    </v-data-table>
    <v-row>
      <v-col class="text-right total_bottom" :style="{ color: fontColor }" width="100%">
        Total Profit/Loss as of {{date}}:
        <span
          class="ml-3"
          :class="(totalProfitLoss < 0 ? 'negative' : 'positive')"
        >{{ totalProfitLoss.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span>
        <span
          class="ml-2"
          :class="(totalProfitLoss < 0 ? 'negative' : 'positive')"
        >{{ totalProfitLossPerf.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}%</span>
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
    <reset-modal :visible="showResetForm" @close="showResetForm=false" />
    <funds-modal :visible="showFundsForm" @close="showFundsForm=false" />
    <trade-view :visible="showTradeViewForm" @close="showTradeViewForm=false" />
    <trade-details
      :visible="showTradeDetails"
      :itemDetails="itemDetails"
      @close="showTradeDetails=false"
    />
    <trade-edits
      :visible="showEditDetails"
      :itemDetails="itemDetails"
      @close="showEditDetails=false"
    />
    <trade-delete :visible="showDelete" :itemDetails="itemDetails" @close="showDelete=false" />
    <!-- @click.stop="showResetForm=true" -->
  </v-col>
</template>
<script>
import resetModal from "~/components/modals/reset";
import shareModal from "~/components/modals/share";
import fundsModal from "~/components/modals/fund";
import tradeView from "~/components/modals/tradeView";
import tradeDetails from "~/components/modals/tradeDetails";
import tradeEdits from "~/components/modals/tradeEdits";
import tradeDelete from "~/components/modals/tradeDelete";

import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    shareModal,
    resetModal,
    fundsModal,
    tradeView,
    tradeDetails,
    tradeEdits,
    tradeDelete
  },
  data() {
    return {
      shareLink: "",
      showShareForm: false,
      post: {
        id: 1,
        title: "My Journey with Vue"
      },
      livePortfolioLoading: "success",
      showResetForm: false,
      showFundsForm: false,
      showTradeViewForm: false,
      showTradeDetails: false,
      showEditDetails: false,
      showDelete: false,
      itemDetails: null,

      ifVirtualShow: false,
      fundsShow: false,

      snackbar: false,
      timeoutNotification: 10000,

      itemsPerPage: 5,
      search: "",
      headers: [
        {
          text: "Stocks",
          value: "stock_symbol",
          align: "left",
          sortable: false
        },
        { text: "Position", value: "position", align: "right" },
        { text: "Avg. Price", value: "average_price", align: "right" },
        { text: "Total Cost", value: "total_value", align: "right" },
        { text: "Market Value", value: "market_value", align: "right" },
        { text: "Profit", value: "profit_loss", align: "right" },
        { text: "Perf. (%)", value: "pl_percentage", align: "right" },
        { text: "", value: "action", sortable: false, align: "right" }
      ],
      portfolioLogs: [],
      stockSym: [],
      page: 1,
      pageCount: 0,
      menuShow: false,
      componentKeys: 0,
      sse: null,
      counter: 0,

      totalProfitLoss: 0,
      totalProfitLossPerf: 0,
      date: new Date().toISOString().substr(0, 10)
    };
  },
  computed: {
    ...mapGetters({
      defaultPortfolioId: "journal/getDefaultPortfolioId",
      renderPortfolioKey: "journal/getRenderPortfolioKey",
      renderEditKey: "journal/getRenderEditKey",
      selectedPortfolio: "journal/getSelectedPortfolio",
      userPortfolio: "journal/getUserPortfolio",
      lightSwitch: "global/getLightSwitch"
    }),
    fontColor: function() {
      return this.lightSwitch == 0 ? "#494949" : "#e5e5e5";
    },
    fontcolor2: function() {
      return this.lightSwitch == 0 ? "#535358" : "#b6b6b6"; // #eae8e8
    },
    cardbackground: function() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    }
  },
  mounted() {
    if (this.defaultPortfolioId != null ? this.getOpenPositions() : "");
    if (!this.selectedPortfolio) {
      if (this.selectedPortfolio.type === "virtual") {
        this.ifVirtualShow = true;
      } else {
        this.ifVirtualShow = false;
      }
    }
    this.initSSE();
  },
  methods: {
    ...mapActions({
      setRenderPortfolioKey: "journal/setRenderPortfolioKey",
      setOpenPosition: "journal/setOpenPosition",
      setJournalCharts: "journal/setJournalCharts"
    }),
    async showShareModal() {
      const el = this.$refs.componentWrapper;
      const options = {
        type: "dataURL"
      };
      this.shareLink = await this.$html2canvas(el, options);
      this.showShareForm = true;
    },
    menuLogsShow: function(item) {
      let pl = document.getElementById(`pl_${item.id}`);

      pl.style.display = "block";
    },
    menuLogsHide: function(item) {
      let pl = document.getElementById(`pl_${item.id}`);

      pl.style.display = "none";
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
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    formatPriceAvePrice(value) {
      let val = (value / 1).toFixed(3).replace(".", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    getOpenPositions() {
      this.totalProfitLoss = 0;
      this.totalProfitLossPerf = 0;
      let filteredStocks = null;
      this.stockSym = [];

      const openparams = {
        fund: this.defaultPortfolioId
      };
      this.$api.journal.portfolio.open(openparams).then(
        function(result) {
          this.portfolioLogs = result.data.open;
          this.setOpenPosition(this.portfolioLogs);

          for (let i = 0; i < this.portfolioLogs.length; i++) {
            this.portfolioLogs[i].fund = this.defaultPortfolioId;
            this.stockSym[i] = this.portfolioLogs[i].metas.stock_id;
            this.totalProfitLoss =
              this.totalProfitLoss +
              parseFloat(this.portfolioLogs[i].profit_loss);
            this.totalProfitLossPerf =
              this.totalProfitLossPerf +
              parseFloat(this.portfolioLogs[i].pl_percentage);
            this.portfolioLogs[i].action = this.portfolioLogs[i].stock_id;
            this.portfolioLogs[i] = {
              ...this.portfolioLogs[i],
              execute: false
            };
          }
          // Loading on table
          console.log(this.portfolioLogs);
          this.livePortfolioLoading = false;
        }.bind(this)
      );
      this.componentKeys++;
    },
    initSSE() {
      let len = this.stockSym.length;
      const that = this;

      if (this.sse !== null) {
        this.sse.close();
        this.counter = 0;
      }
      this.sse = new EventSource(
        `${process.env.STREAM_API_URL}/sse/market-data/pse/all`
        // "http://localhost:8021/sse/market-data/pse/all"
      );
      this.sse.onopen = function() {
        console.log("[TEST OPEN] open sse");
      };
      this.sse.onerror = function(err) {
        console.log("[TEST ERROR]", err);
      };
      this.sse.addEventListener("trade", function(e) {
        const data = JSON.parse(e.data);
        for (let i = 0; i < that.stockSym.length; i++) {
          if (that.stockSym[i] == data.sym_id) {
            that.trigger(data.sym_id, data.exp);
          }
        }
      });
    },
    trigger: function(symbol, lprice) {
      let profit = 0;
      let perf = 0;
      console.log("Checked");
      for (let i = 0; i < this.portfolioLogs.length; i++) {
        if (this.portfolioLogs[i].stock_id == symbol) {
          console.log(this.portfolioLogs[i]);
          let buyResult = this.portfolioLogs[i].position * parseFloat(lprice);
          let mvalue = this.fees(buyResult);
          let tcost =
            this.portfolioLogs[i].position *
            this.portfolioLogs[i].average_price;
          profit = parseFloat(mvalue) - parseFloat(tcost);
          perf = (profit / tcost) * 100;

          this.portfolioLogs[i].market_value = mvalue;
          this.portfolioLogs[i].profit_loss = profit;
          this.portfolioLogs[i].pl_percentage = perf;

          let updatedItem = {
            ...this.portfolioLogs[i],
            ...{ market_value: this.portfolioLogs[i].market_value }
          };
          this.portfolioLogs.splice(i, 1, updatedItem);
        }
      }
    },
    fees(buyResult) {
      let dpartcommission = buyResult * 0.0025;
      let dcommission = dpartcommission > 20 ? dpartcommission : 20;
      // TAX
      let dtax = dcommission * 0.12;
      // Transfer Fee
      let dtransferfee = buyResult * 0.00005;
      let dsell = buyResult * 0.006;
      // SCCP
      let dsccp = buyResult * 0.0001;
      let dall = dcommission + dtax + dtransferfee + dsccp + dsell;
      return buyResult - dall;
    },
    closeSSE: function() {
      this.sse.close();
    }
  },
  beforeDestroy() {
    this.closeSSE();
  },
  watch: {
    selectedPortfolio: function() {
      if (this.selectedPortfolio.type === "virtual") {
        this.ifVirtualShow = true;
      } else {
        this.ifVirtualShow = false;
      }
    },
    defaultPortfolioId: function() {
      this.getOpenPositions();
    },
    renderPortfolioKey: function() {
      this.getOpenPositions();
    },
    renderEditKey: function() {
      this.getOpenPositions();
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
.data_table-container.v-data-table td,
.total_bottom {
  font-size: 12px !important;
}
.data_table-container i.v-icon.v-data-table-header__icon.mdi.mdi-arrow-up {
  float: left;
}
.v-data-table.data_table-container .v-data-footer {
  border: none;
}
.v-data-table.data_table-container td,
.v-data-table.data_table-container th {
  height: 36px;
}
.v-data-table.data_table-container
  tbody
  tr:hover:not(.v-data-table__expand-row) {
  background: transparent;
}
/* -------Pagination-------- */
.v-pagination.lp_data_table-pagination li .v-pagination__navigation {
  background: transparent;
  box-shadow: none;
  margin: 0;
  width: 10px;
}
.lp_data_table-pagination {
  color: #03dac5;
}
.v-pagination.lp_data_table-pagination .v-pagination__item--active {
  color: #03dac5;
}
.lp_data_table-pagination i.v-icon {
  font-size: 11px;
}
.v-pagination.lp_data_table-pagination .v-pagination__item {
  background: none;
  box-shadow: none;
  margin: 0;
  outline-color: transparent;
}
.v-data-table.data_table-container th:first-child {
  padding-left: 8px !important;
}
</style>