<template>
  <v-col class="pt-3" cols="12" sm="12" md="12">
    <v-tabs color="success" background-color="transparent" dark>
      <v-tab
        class="tab_menu-top text-capitalize subtitle-1"
        :style="{ color: fontColor }"
        :href="`#tab-1`"
        @click="dashboardClicked()"
      >Dashboard</v-tab>
      <v-tab
        class="tab_menu-top text-capitalize subtitle-1"
        :style="{ color: fontColor }"
        :href="`#tab-2`"
      >Tradelogs</v-tab>
      <v-tab
        class="tab_menu-top text-capitalize subtitle-1"
        :style="{ color: fontColor }"
        :href="`#tab-3`"
      >Ledger</v-tab>
      <v-spacer></v-spacer>
      <v-col sm="3" md="2" class="pa-0">
        <v-select
          :dark="lightSwitch == true"
          :items="portfolioListPush"
          v-on:change="changePortfolio"
          v-model="portfolioDropdownModel"
          item-text="name"
          item-value="id"
          return-object
          :menu-props="{offsetY: false, dark: lightSwitch == true}"
          class="select_portfolio selectjournal_portfolio mt-2 success--text subtitle-2 text-uppercase"
          item-color="success"
          append-icon="mdi-chevron-down"
          background-color="success"
          label="Select Portfolio"
          color="grey"
          dense
          solo
          light
        >
          <template slot="item" slot-scope="data">
            <v-list-item-content
              :dark="lightSwitch == true"
              :style="{ background: cardbackground }"
              style="padding: 12px 12px; margin: -16px;"
            >
              <v-list-item-title v-html="data.item.name" class="text-uppercase caption"></v-list-item-title>
            </v-list-item-content>
          </template>
          <template v-slot:append-item>
            <v-list-item
              @click="setPortfolioReal(item)"
              class="sumportfolio_real"
              ripple
              :dark="lightSwitch == true"
              :style="{ background: cardbackground }"
              @click.stop="showCreatePortForm=true"
            >
              <v-list-item-content>
                <v-list-item-title class="text-uppercase caption">Sum of Real Portfolio</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              @click="setPortfolioVirtual()"
              ripple
              :dark="lightSwitch == true"
              :style="{ background: cardbackground }"
              @click.stop="showCreatePortForm=true"
            >
              <v-list-item-content>
                <v-list-item-title class="text-uppercase caption">Sum of Virtual Portfolio</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              ripple
              @click.stop="showManagePortfolio=true"
              :dark="lightSwitch == true"
              :style="{ background: cardbackground }"
            >
              <v-list-item-content>
                <v-list-item-title class="text-uppercase caption">Manage Portfolio</v-list-item-title>
              </v-list-item-content>
              <v-icon :color="lightSwitch == true ? 'white' : 'black'" class="body-2">mdi-settings-outline</v-icon>
            </v-list-item>
            <v-list-item
              ripple
              @click.stop="showCreatePortForm=true"
              :dark="lightSwitch == true"
              :style="{ background: cardbackground }"
            >
              <v-list-item-content>
                <v-list-item-title class="text-uppercase caption">Create Portfolio</v-list-item-title>
              </v-list-item-content>
              <v-icon :color="lightSwitch == true ? 'white' : 'black'" class="body-2">mdi-plus-circle-outline</v-icon>
            </v-list-item>
          </template>
        </v-select>
      </v-col>
      <v-tab-item color="success" background-color="black" :value="'tab-' + 1">
        <v-container class="pa-0">
          <div class="separator"></div>
          <JournalLivePortfolio />
          <div class="component_spacer"></div>
          <v-row no-gutters>
            <JournalPortfolioSnapshot />
            <JournalCurrentAllocation />
          </v-row>
          <div class="component_spacer"></div>
          <v-row no-gutters>
            <JournalEquityCurve />
          </v-row>
          <div class="component_spacer"></div>
          <v-row no-gutters>
            <JournalMonthlyPerfomance />
            <JournalTradeStats />
          </v-row>
          <div class="component_spacer"></div>
          <JournalStrategyStats />
          <div class="component_spacer"></div>
          <v-row no-gutters>
            <JournalTopStocks />
          </v-row>
          <div class="component_spacer"></div>
          <v-row no-gutters>
            <JournalEmotionalStats />
          </v-row>
          <div class="component_spacer"></div>
          <v-row no-gutters>
            <JournalExpenseReport />
          </v-row>
          <div class="component_spacer"></div>
          <v-row no-gutters>
            <v-col class="pa-0" cols="6" sm="6" md="6">
              <JournalBuyVolume />
            </v-col>
            <v-col class="pa-0" cols="6" sm="6" md="6">
              <JournalBuyValue />
            </v-col>
          </v-row>
          <div class="component_spacer"></div>
          <v-row no-gutters>
            <v-col class="pa-0" cols="4" sm="4" md="4">
              <JournalPerformance />
            </v-col>
            <v-col class="pa-0" cols="8" sm="8" md="8">
              <JournalGrossPL />
            </v-col>
          </v-row>
          <div class="component_spacer"></div>
        </v-container>
      </v-tab-item>

      <v-tab-item dark color="success" background-color="#0c1f33" :value="'tab-' + 2">
        <v-container class="pa-0">
          <div class="separator"></div>
          <TradelogsContent />
        </v-container>
      </v-tab-item>
      <v-tab-item dark color="success" background-color="#0c1f33" :value="'tab-' + 3">
        <v-container class="pa-0">
          <div class="separator"></div>
          <LedgerContent />
        </v-container>
      </v-tab-item>
    </v-tabs>
    <create-modal :visible="showCreatePortForm" @close="showCreatePortForm=false" />
    <manage-modal
      :visible="showManagePortfolio"
      @clicked="deletedItem"
      @close="showManagePortfolio=false"
    />
    <!-- <ChartTesting/> -->
  </v-col>
</template>
<script>
//Dashboard tab
import JournalLivePortfolio from "~/components/journal/dashboard/JournalLivePortfolio";
import JournalPortfolioSnapshot from "~/components/journal/dashboard/JournalPortfolioSnapshot";
import JournalCurrentAllocation from "~/components/journal/dashboard/JournalCurrentAllocation";
import JournalEquityCurve from "~/components/journal/dashboard/JournalEquityCurve";
import JournalMonthlyPerfomance from "~/components/journal/dashboard/JournalMonthlyPerfomance";
import JournalTradeStats from "~/components/journal/dashboard/JournalTradeStats";
import JournalStrategyStats from "~/components/journal/dashboard/JournalStrategyStats";
import JournalTopStocks from "~/components/journal/dashboard/JournalTopStocks";
import JournalEmotionalStats from "~/components/journal/dashboard/JournalEmotionalStats";
import JournalExpenseReport from "~/components/journal/dashboard/JournalExpenseReport";
import JournalBuyVolume from "~/components/journal/dashboard/JournalBuyVolume";
import JournalBuyValue from "~/components/journal/dashboard/JournalBuyValue";
import JournalPerformance from "~/components/journal/dashboard/JournalPerformance";
import JournalGrossPL from "~/components/journal/dashboard/JournalGrossPL";

//Ledger tab
import TradelogsContent from "~/components/journal/tradelogs/TradelogContent";

//Ledger tab
import LedgerContent from "~/components/journal/ledger/LedgerContent";
import createModal from "~/components/journal/dashboard/JournalCreatePortfolio";
import manageModal from "~/components/modals/Manage";

import { mapActions, mapGetters } from "vuex";

export default {
  layout: "main",
  components: {
    //Dashboard tab
    JournalLivePortfolio,
    JournalPortfolioSnapshot,
    JournalCurrentAllocation,
    JournalEquityCurve,
    JournalMonthlyPerfomance,
    JournalTradeStats,
    JournalStrategyStats,
    JournalTopStocks,
    JournalEmotionalStats,
    JournalExpenseReport,
    JournalBuyVolume,
    JournalBuyValue,
    JournalPerformance,
    JournalGrossPL,
    //Ledger tab
    TradelogsContent,
    //Ledger tab
    LedgerContent,
    createModal,
    manageModal
  },
  data() {
    return {
      tab: null,
      tabs: 3,
      portfolioListPush: [],
      portfolioList: [],
      portfolioDropdownModel: null,
      selectedProfile: null,
      showCreatePortForm: false,
      showManagePortfolio: false,
      componentKey: 0,
      showSelect: false
    };
  },
  computed: {
    ...mapGetters({
      userPortfolio: "journal/getUserPortfolio",
      defaultPortfolioId: "journal/getDefaultPortfolioId",
      renderPortfolioKey: "journal/getRenderPortfolioKey",
      portfolioKey: "journal/getPortfolioKey",
      lightSwitch: "global/getLightSwitch"
    }),
    /**
     * returns primary font color
     *
     * @return  {string}  returns string
     */
    fontColor() {
      return this.lightSwitch == 0 ? "#000000 !important" : "#ffffff !important";
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
  mounted() {
    this.getUserPortfolioList();
  },
  watch: {
    /**
     * Watch defaultPortfolioId vuex if id changed perform function inside
     *
     * @return  {string}  getting the current portfolio id
     */
    defaultPortfolioId() {
      this.getJournalCharts();
    },
    /**
     * Watch renderPortfolioKey vuex if key changed perform function inside
     *
     * @return  {number}  get increment key
     */
    renderPortfolioKey() {
      this.getJournalCharts();
    },
    /**
     * Watch portfolioKey vuex if key changed perform function inside
     *
     * @return  {number}  get increment key
     */
    portfolioKey() {
      this.getUserPortfolioList();
    }
  },
  methods: {
    ...mapActions({
      setUserPortfolio: "journal/setUserPortfolio",
      setRenderPortfolioKey: "journal/setRenderPortfolioKey",
      setPortfolioKey: "journal/setPortfolioKey",
      setDefaultPortfolioId: "journal/setDefaultPortfolioId",
      setJournalCharts: "journal/setJournalCharts"
    }),
    /**
     * when tab dashboard clicked all components with in dashboard tab will be refreshed
     *
     * @return
     */
    dashboardClicked() {
      this.keyCreateCounter = this.renderPortfolioKey;
      this.keyCreateCounter++;
      this.setRenderPortfolioKey(this.keyCreateCounter);
    },
    /**
     * on changed select funtion, assigning portfolio ID/portfolio info to state
     *
     * @param   {object}  obj  object of changed item
     *
     * @return  {object}       object data onchange
     */ 
    changePortfolio(obj) {
      this.setDefaultPortfolioId(this.portfolioDropdownModel.id);
      const openparams = {
        fund: this.portfolioDropdownModel.id
      };
      this.$api.journal.portfolio.open(openparams).then(
        function(result) {
          if (result.success) {
            this.keyCreateCounter = this.renderPortfolioKey;
            this.keyCreateCounter++;
            this.setRenderPortfolioKey(this.keyCreateCounter);
          }
        }.bind(this)
      );
    },
    /**
     * assigning portfolio ID with sum of portfolio real
     *
     * @param   {object}  item  object of selected item
     *
     * @return  {object}        [return description]
     */
    setPortfolioReal(item) {
      this.setDefaultPortfolioId("real");
      this.keyCreateCounter = this.renderPortfolioKey;
      this.keyCreateCounter++;
      this.setRenderPortfolioKey(this.keyCreateCounter);
    },
    /**
     * assigning portfolio ID with sum of portfolio virtual
     *
     * @param   {object}  item  object of selected item
     *
     * @return  {object}        [return description]
     */
    setPortfolioVirtual(item) {
      this.setDefaultPortfolioId("virtual");
      this.keyCreateCounter = this.renderPortfolioKey;
      this.keyCreateCounter++;
      this.setRenderPortfolioKey(this.keyCreateCounter);

      this.portfolioDropdownModel = "Sum of Virtual Portfolio";
    },
    /**
     * get all portfolio of a specific user
     *
     * @return  {array}  array of item, all portfolios
     */
    getUserPortfolioList() {
      this.portfolioListPush = []
      this.$api.journal.portfolio.portfolio().then(
        function(result) {
          this.portfolioList = result.data.logs;
          this.setUserPortfolio(result.data.logs);

          let defaultPort = false;
          for (let i = 0; i < this.portfolioList.length; i++) {
            let portfolioListPush1 = this.portfolioList[i];
            if (portfolioListPush1.type === "real") {
              this.portfolioListPush.push(portfolioListPush1);

              if (
                portfolioListPush1.name === "My Portfolio" &&
                portfolioListPush1.type === "real"
              ) {
                this.setDefaultPortfolioId(portfolioListPush1.id);
                this.portfolioDropdownModel = portfolioListPush1.id;
                defaultPort = true;
              }
            }
          }
          this.portfolioListPush.push({ divider: true });
          if (!defaultPort) {
            const createportfolioparams = {
              currency_code: "PHP",
              name: "My Portfolio",
              description: "My Portfolio",
              type: "real",
              balance: 100000
            };
            this.$api.journal.portfolio
              .createportfolio(createportfolioparams)
              .then(
                function(result) {
                  if (result.success) {
                  }
                }.bind(this)
              );
          }
          if (this.portfolioList.length != 0) {
            const toFindVirtual = "virtual"; // what we want to count
            for (let i = 0; i < this.portfolioList.length; i++) {
              let portfolioListPush2 = this.portfolioList[i];
              if (portfolioListPush2.type === toFindVirtual) {
                this.portfolioListPush.push(portfolioListPush2);
              }
            }
          }
        }.bind(this)
      );
      this.componentKeys++;
    },
    /**
     * function to get data for charts and assigned to journalCharts state
     *
     * @return  {object}  data to be save to state
     */
    getJournalCharts() {
      if (this.portfolioDropdownModel != null) {
        let journalchartsparams = {
          fund: this.defaultPortfolioId
        };
        this.$api.journal.portfolio
          .journalcharts(journalchartsparams)
          .then(response => {
            this.setJournalCharts(response);
          });
      }
      this.componentKeys++;
    },
    /**
     * catch the delete item then set render key to update the list or portfolio
     *
     * @param   {object}  value  object handler of item deleted
     *
     * @return  {number}         returns key to refresh portfolio list
     */
    deletedItem(value) {
      if (value.confirm == true) {
        this.keyCreateCounter = this.portfolioKey;
        this.keyCreateCounter++;
        this.setPortfolioKey(this.keyCreateCounter);
        this.setRenderPortfolioKey(this.keyCreateCounter);
      }
    }
  }
};
</script>
<style scoped>
.component_spacer {
  height: 50px;
}
.sumportfolio_real.theme--light {
  border-top: 1px solid;
  border-color: #c1c1c1;
}
.sumportfolio_real.theme--dark {
  border-top: 1px solid;
  border-color: #172431;
}
.tab_menu-top.v-tab--active {
  color: #03dac5 !important;
}
</style>
<style>
.select_portfolio.selectjournal_portfolio .v-input__control {
  padding: 0 !important;
}
.v-menu__content
  .v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  /* color: #03dac5 !important; */
}
/* reset trade fund css */
.rtf_top-btn.v-btn--outlined:hover,
.rtf_top-btn.v-btn--outlined:active,
.rtf_top-btn.v-btn--outlined:focus {
  background-color: #03dac5;
  border-color: #03dac5;
  color: #000 !important;
  font-weight: 600 !important;
}

.navbarDrawer__card-journal .v-navigation-drawer__border {
  background: #000 !important;
}
.apexcharts-tooltip-series-group,
.apexcharts-tooltip.dark,
.apexcharts-tooltip.light {
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5) !important;
}
.apexcharts-tooltip {
  box-shadow: none;
}
span.apexcharts-tooltip-text-label {
  display: none;
}
.apexcharts-tooltip.light {
  border: none;
}
#table_tr_port-cont:hover {
  background: rgb(9, 26, 43);
}
#table_td_port-cont {
  border: none;
  cursor: pointer;
}
#table_head_tr_port-cont {
  border: none;
}
#table_tr_snap-cont:hover {
  background: rgb(9, 26, 43);
}
#table_td_snap-cont {
  border: none;
  cursor: pointer;
}
#table_head_tr_snap-cont {
  border: none;
}
.select_portfolio .v-label {
  font-size: 14px;
  font-weight: 600;
}
.select_portfolio .v-select__selection--comma {
  color: black;
  font-size: 12px;
  font-weight: 600;
}
.select_portfolio .v-select__slot .v-label,
.select_portfolio .v-select__slot .v-icon {
  color: black !important;
}
.select_portfolio .v-input__slot {
  margin: 0;
  border-radius: 4px;
}
.select_portfolio .v-input__control {
  min-height: auto !important;
  border-radius: unset;
}
.apexcharts-canvas.dark {
  background: transparent !important;
}
.apexcharts-canvas.light svg .apexcharts-datalabel-label,
.apexcharts-canvas.light svg .apexcharts-datalabel-value,
.apexcharts-canvas.light svg .apexcharts-yaxis-label,
.apexcharts-canvas.light svg .apexcharts-xaxis-label {
  fill: #494949;
}
.apexcharts-canvas.dark svg .apexcharts-datalabel-label,
.apexcharts-canvas.dark svg .apexcharts-datalabel-value,
.apexcharts-canvas.dark svg .apexcharts-yaxis-label,
.apexcharts-canvas.dark svg .apexcharts-xaxis-label {
  fill: #e5e5e5;
}
.v-menu__content > .v-select-list > .v-list.theme--light {
  padding: unset;
  border-radius: unset !important;
}
.v-menu__content > .v-select-list > .v-list.theme--dark {
  padding: unset;
  border-radius: unset !important;
}
.v-menu__content.theme--light {
  border-radius: unset !important;
  border: 1px solid #c1c1c1;
}
.v-menu__content.theme--dark {
  border-radius: unset !important;
  border: 1px solid #172431;
}
.v-list hr.v-divider.theme--light {
  background: #c1c1c1;
}
.v-list hr.v-divider.theme--dark {
  background: #172431;
  border-top: 1px solid #172431;
}
</style>
