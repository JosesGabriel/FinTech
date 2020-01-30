<template>
  <v-col cols="12" sm="12" md="12">
    <v-row class="mt-3 ml-0 mb-10 mr-2">
      <v-col
        class="ml-0 mb-2 pt-0 pb-0 vt_realized"
        :style="{ border: secondaryBackground }"
        style="width:20%;"
      >
        <v-row :style="{ color: toggleFontColor }" class="mt-2 pl-3 label">Realized P/L (PHP)</v-row>
        <v-row class="mt-1 mb-2">
          <v-col
            md="12"
            :class="(this.realized > 0 ? 'positive' : this.realized < 0 ? 'negative' : 'neutral')"
            class="text-right pb-0 pl-0 pr-3"
          >{{ this.addComma(this.realized) }}</v-col>
        </v-row>
      </v-col>
      <v-col
        class="ml-3 mb-2 pt-0 pb-0 vt_realized"
        :style="{ border: secondaryBackground }"
        style="width:20%;"
      >
        <v-row :style="{ color: toggleFontColor }" class="mt-2 pl-3 label">Unrealized P/L (PHP)</v-row>
        <v-row class="mt-1">
          <v-col
            md="12"
            :class="(this.unrealized > 0 ? 'positive' : this.unrealized < 0 ? 'negative' : 'neutral')"
            class="text-right pb-0 pl-0 pr-3"
          >{{ this.addComma(this.unrealized) }}</v-col>
        </v-row>
      </v-col>
      <v-col
        class="ml-3 mb-2 pt-0 pb-0 vt_realized"
        :style="{ border: secondaryBackground }"
        style="width:20%;"
      >
        <v-row :style="{ color: toggleFontColor }" class="mt-2 pl-3 label">Port Performance %</v-row>
        <v-row class="mt-1">
          <v-col
            md="12"
            :class="(this.portperf() > 0 ? 'positive' : this.portperf() < 0 ? 'negative' : 'neutral')"
            class="text-right pb-0 pl-0 pr-3"
          >{{ this.portperf() }}%</v-col>
        </v-row>
      </v-col>
      <v-col
        class="ml-3 mb-2 pt-0 pb-0 vt_realized"
        :style="{ border: secondaryBackground }"
        style="width:20%;"
      >
        <v-row :style="{ color: toggleFontColor }" class="mt-2 pl-3 label">Max Drawdown %</v-row>
        <v-row class="mt-1">
          <v-col
            md="12"
            :class="(this.totalmax > 0 ? 'positive' : this.totalmax < 0 ? 'negative' : 'neutral')"
            class="text-right pb-0 pl-0 pr-3"
          >{{ this.totalmax }}%</v-col>
        </v-row>
      </v-col>
      <v-col
        class="ml-3 mb-2 pt-0 pb-0 vt_realized"
        :style="{ border: secondaryBackground }"
        style="width:20%;"
      >
        <v-row :style="{ color: toggleFontColor }" class="mt-2 pl-3 label">Equity</v-row>
        <v-row class="mt-1">
          <v-col
            md="12"
            :style="{ color: toggleFontColor }"
            :class="((this.port_total + parseFloat(this.port_capital)) > 0 ? '__white' : 'negative')"
            class="text-right pb-0 pl-0 pr-3"
          >{{ this.addComma(this.port_total + parseFloat(this.port_capital)) }}</v-col>
        </v-row>
      </v-col>
      <v-col
        class="ml-3 mb-2 pt-0 pb-0 vt_realized"
        :style="{ border: secondaryBackground }"
        style="width:20%;"
      >
        <v-row :style="{ color: toggleFontColor }" class="mt-2 pl-3 label">Day Change</v-row>
        <v-row class="mt-0">
          <v-col md="12" class="text-right pt-0 pb-0 pl-0 pr-3">
            <v-row class="ma-0 pa-0 overline">
              <v-col
                :class="(this.changep > 0 ? 'positive' : this.changep < 0 ? 'negative' : 'neutral')"
                class="ma-0 pa-0"
              >( {{ this.addComma(this.changep) }}%)</v-col>
            </v-row>
            <v-row class="ma-0 pa-0">
              <v-col
                :class="(this.change > 0 ? 'positive' : this.change < 0 ? 'negative' : 'neutral')"
                class="ma-0 pa-0"
              >{{ this.addComma(this.change) }}</v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-tabs
      color="success"
      background-color="transparent"
      :dark="lightSwitch == true"
      :style="{ background: primaryBackground }"
      dark
    >
      <v-tab           
        class="tab_menu-top text-capitalize"
        :href="`#tab-1`"
      >Live Portfolio</v-tab>
      <v-tab
        class="tab_menu-top text-capitalize"
        :href="`#tab-2`"  
      >Tradelogs</v-tab>

      <v-row>
        <v-col
          md="3"
          class="text-right caption px-2 ma-0"
          style="position:absolute; right:0; top: -26px; width: 180px;"
        >
          <v-select
            offset-y="true"
            class="select_portfolio mt-2 black--text text-uppercase"
            item-color="success"
            append-icon="mdi-chevron-down"
            :value="this.default_port"
            item-text="name"
            item-value="id"
            :items="portfolio"
            dark
            v-on:change="getOpenPosition"
            background-color="success"
            label="Select Portfolio"
            dense
            solo
          >
            <template slot="item" slot-scope="data">
              <v-list-item-content
                :dark="lightSwitch == true"
                :style="{ background: primaryBackground }"
                style="padding: 12px 12px; margin: -16px;"
              >
                <v-list-item-title v-html="data.item.name" class="text-uppercase"></v-list-item-title>
              </v-list-item-content>
            </template>

            <template
              v-slot:append-item
              :dark="lightSwitch == true"
              :style="{ background: primaryBackground }"
            >
              <v-list-item
                ripple
                :dark="lightSwitch == true"
                :style="{ background: primaryBackground }"
                @click.stop="showCreatePortForm=true"
              >
                <v-list-item-content>
                  <v-list-item-title class="text-uppercase">
                    Create Portfolio
                    <v-icon color="success" class="body-2">mdi-plus-circle-outline</v-icon>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-select>
        </v-col>
      </v-row>
      <v-tab-item
        dark
        color="success"
        background-color="black"
        :value="'tab-' + 1"
        :style="(this.lightSwitch == 0 ? 'background:transparent; border-top: 1px solid #dadada' : 'background:transparent; border-top: 1px solid #172431')"
      >
        <v-container class="pa-0">
          <VirtualLivePortfolio
           :Capital="port_capital"
            v-on:DayChange="DayChange"
            v-on:DayChangePerc="ChangePerc"
            v-on:totalUnrealized="Unrealized"
            v-on:totalMarketValue="TotalMValue"
          
          />
        </v-container>
      </v-tab-item>
      <v-tab-item
        dark
        color="success"
        background-color="transparent"
        :value="'tab-' + 2"
        :style="(this.lightSwitch == 0 ? 'background:transparent; border-top: 1px solid #b6b6b6' : 'background:transparent; border-top: 1px solid #535358')"
      >
        <v-container class="pa-0">
          <TradelogsContent
            :item="item"
            ref="tradelogsComponent"
            v-on:totalRealized="Realized"
            v-on:MaxDrawdown="TotalMax"
          />
        </v-container>
      </v-tab-item>
    </v-tabs>
    <create-modal :visible="showCreatePortForm" @close="showCreatePortForm=false" />
  </v-col>
</template>
<script>
import VirtualLivePortfolio from "~/components/trade-simulator/VirtualLivePortfolio";
import TradelogsContent from "~/components/trade-simulator/VirtualTradelogs";
import createModal from "~/components/trade-simulator/VirtualCreatePortfolio";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      portfolio: [],
      showCreatePortForm: false,
      default_port: "0",
      realized: 0,
      unrealized: 0,
      totalmvalue: 0,
      totalmax: 0,
      balance: 0,
      daychange: 0,
      daychangepercentage: 0,
      equity: 0,
      currentchange: 0,
      priorchange: 0,
      item: {},
      state: false,
      port_capital: 0,
      change: 0,
      changep: 0,
    };
  },
  created() {},
  computed: {
    ...mapGetters({
      simulatorPortfolioID: "tradesimulator/getSimulatorPortfolioID",
      RenderPortfolioKey: "journal/getRenderPortfolioKey",
      lightSwitch: "global/getLightSwitch"
    }),
    /**
     * Toggle primary Background color (Dark/Light) Theme
     *
     * @return  {string}  hex code
     */
    primaryBackground() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    },
    /**
     * Toggle Font Color (Dark/Light Theme)
     *
     * @return  {String}  hex code
     */
    toggleFontColor() {
      return this.lightSwitch == 0
        ? "#000000 !important"
        : "#ffffff !important";
    },
    /**
     * Toggle secondary Background color (Dark/Light) Theme
     *
     * @return  {string}  hex code
     */
    secondaryBackground() {
      return this.lightSwitch == 0 ? "1px solid #dadada" : "1px solid #172431";
    },

  },
  watch: {
    /**
     * Initialized Cards when POrtfolio ID is changed
     *
     */
    simulatorPortfolioID() {
      this.realized = 0;
      this.unrealized = 0;
      this.totalmvalue = 0;
      this.totalmax = 0;
      this.balance = 0;
      this.daychange = 0;
      this.daychangepercentage = 0;
      this.equity = 0;
      this.port_total = 0;
      this.default_port = this.simulatorPortfolioID;
      this.getPorfolio('newdata');
    },
    unrealized() {
      this.getTradeLogs();
      this.getDayChange();
    },
    realized(){
      this.getTradeLogs();
      this.getDayChange();
    }
  },
  methods: {
    ...mapActions({
      setSimulatorPortfolioID: "tradesimulator/setSimulatorPortfolioID"
    }),
    /**
     * Get Data in Live Portfolio
     *
     * @param   {string}  selectObj  Portfolio ID
     *
     */
    getOpenPosition(selectObj) {
      this.getCapital(selectObj);
      this.setSimulatorPortfolioID(selectObj);
      this.default_port = selectObj;
      this.state = false;
    },
    /**
     * Get Capital 
     *
     * @param   {String}  id  Portfolio ID
     *
     */
    getCapital(id){
          this.$api.journal.portfolio.portfolio().then(
            function(result) {             
                for (let i = 0; i < result.data.logs.length; i++) {
                  if(id == result.data.logs[i].id){
                    this.port_capital = result.data.logs[i].capital; 
                  }              
                }
            }.bind(this)
          );
    },
    /**
     * Initialized Realized Card
     *
     * @param   {float}  value  realized value
     *
     */
    Realized(value) {
      this.realized = value;
    },
    /**
     * Initialized Unrealized Card
     *
     * @param   {float}  value  unrealized value
     *
     */
    Unrealized(value) {
      this.unrealized = value;
    },
    /**
     * Initialized Total Market Value
     *
     * @param   {float}  value  total market value
     *
     */
    TotalMValue(value) {
      this.totalmvalue = value;
    },
    /**
     * Initialized Max Drawdown 
     *
     * @param   {float}  value  total max drawdown
     *
     */
    TotalMax(value) {
      this.totalmax = value;
    },
    /**
     * Initialized Day Change
     *
     * @param   {float}  value  total day change
     *
     */
    DayChange(value) {
      this.daychange = value;
    },
    /**
     * Initialized Change Percentage
     *
     * @param   {float}  value  change percentage
     *
     */
    ChangePerc(value) {
      this.daychangepercentage = value;
    },
    /**
     * Initialized Port Performance
     *
     * @param   {float}  value  port performance
     *
     */
    portperf() {
      this.port_total = parseFloat(this.realized) + parseFloat(this.unrealized);
      let portperf = (this.port_total / parseFloat(this.port_capital)) * 100;
      //return this.addComma(portperf);
      return portperf.toFixed(2);
    },

    getDayChange(){

      if(this.daychange == 0){
        let getlocal = localStorage.getItem(this.simulatorPortfolioID);
        getlocal = JSON.parse(getlocal);
        if(getlocal != null){
          this.daychange = getlocal.priorprofit;
        }else{
          this.daychange = 0;
        }
      }
           let yesterdaysProfit = this.daychange;
           this.change = parseFloat(this.unrealized) - parseFloat(yesterdaysProfit);
           let dperf = parseFloat(this.port_capital) + parseFloat(yesterdaysProfit); 
           this.changep = (this.change / dperf) * 100;
    },

    /**
 * Add comma separator
 *
 * @param   {float}  n        number
 * @param   {char}  sep       separator character
 * @param   {int}  decimals   number of decimal points
 * @return  {string}          number with comma separator
 */
    addComma(n, sep, decimals) {
      sep = sep || "."; // Default to period as decimal separator
      decimals = decimals || 2; // Default to 2 decimals
      return (
        n.toLocaleString().split(sep)[0] + sep + n.toFixed(2).split(sep)[1]
      );
    },

    //===============================================
  /**
   * get Trade Logs Data
   *
   */
    getTradeLogs() {
      const tradelogsparams = {
        fund: this.simulatorPortfolioID
      };

      let totalProfitLoss = 0;
      let totalProfitLossPerf = 0;
      this.$api.journal.portfolio.tradelogs(tradelogsparams).then(
        function(result) {
         
          let plossperc = [];
          let profitLoss = 0;
          let profitLossPer = 0;
          for (let i = 0; i < result.data.logs.length; i++) {
            let buyvalueResult =
              result.data.logs[i].meta.average_price *
              result.data.logs[i].amount;
            profitLoss = result.data.logs[i].total_value - buyvalueResult;
            totalProfitLoss = totalProfitLoss + parseFloat(profitLoss);
            profitLossPer = (profitLoss / buyvalueResult) * 100;

            this.realized = totalProfitLoss;

            if (parseFloat(profitLossPer) < 0) {
              plossperc[i] = profitLossPer;
              let maxx = this.arrayMax(plossperc);
              this.totalmax = maxx.toFixed(2);
            }
          }
        }.bind(this)
      );
    },

  /**
   * Calculate Max Drawdown
   *
   * @param   {array}  arr  tradelogs percentage
   *
   * @return  {int}      minimum tradelogs percentage
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
     * Get Data for the Select Portfolio Dropdown
     *
     * @param   {[type]}  key  Portfolio ID
     *
     */
    getPorfolio(key){
        this.getTradeLogs();
        this.$api.journal.portfolio.portfolio().then(
          function(result) {
            let defaultPort = false;
            for (let i = 0; i < result.data.logs.length; i++) {
              //console.log('Portfolio- ', result);
              if (
                result.data.logs[i].type == "virtual"
              ) {

                let portfolio_params = {
                  name: result.data.logs[i].name,
                  id: result.data.logs[i].id,
                  capital: result.data.logs[i].capital
                };
                this.portfolio.push(portfolio_params);
                if(key == 'initial'){
                    if (result.data.logs[i].name == "My Virtual Portfolio") {
                      this.setSimulatorPortfolioID(result.data.logs[i].id);
                      this.default_port = result.data.logs[i].id;
                      this.port_capital = result.data.logs[i].capital;
                      defaultPort = true;
                    }
                 }else{
                    if(this.simulatorPortfolioID == result.data.logs[i].id){
                      this.default_port = result.data.logs[i].id;
                      this.port_capital = result.data.logs[i].capital;
                      defaultPort = true;
                    }
                 }
              }
            }
           
            if (!defaultPort) {
              const createportfolioparams = {
                currency_code: "PHP",
                name: "My Virtual Portfolio",
                description: "My Virtual Portfolio",
                type: "virtual",
                balance: 100000
              };
              this.$api.journal.portfolio
                .createportfolio(createportfolioparams)
                .then(
                  function(result) {
                    if (result.success) {
                      //TODO: snack bar
                    }
                  }.bind(this)
                );
            }
          }.bind(this)
        );
    }
  },
  mounted() {
      this.getPorfolio('initial');   
  },
  components: {
    VirtualLivePortfolio,
    TradelogsContent,
    createModal
  }
};
</script>
<style >
.v-select__slot .v-label,
.v-select__slot .v-icon {
  color: #03dac5 !important;
}
.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
    border-radius: unset;
}
.v-menu__content > .v-select-list > .v-list {
  padding: unset;
  border: 1px solid #172431;
}
.select_portfolio > .v-input__control {
  padding-top: 16px !important;
}

.v-menu__content {
  border-radius: unset !important;
}

.v-menu__content
  .v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  /* color: #03dac5 !important; */
}
.select_portfolio .v-select__slot .v-label,
.select_portfolio .v-select__slot .v-icon {
  color: black !important;
  font-weight: 600;
}

.select_portfolio
  > .v-input__control
  > .v-input__slot
  > .v-select__slot
  > .v-select__selections
  > .v-select__selection--comma {
  color: black;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Nunito Sans', sans-serif !important;
  font-style: normal;
  line-height: 106.5%;
}

.select_portfolio > .v-input__control > .v-input__slot > .v-select__slot {
  height: 30px;
}
.select_portfolio > .v-input__control > .v-input__slot {
  min-height: initial;
  border-radius: 3px;
}

.v-slide-group__content.v-tabs-bar__content:before {
  content: "";
  width: 100%;
  position: absolute;
  bottom: -3px;
  z-index: 1;
  height: 4px;
}

.positive {
  color: #03dac5;
}
.negative {
  color: #f44336;
}
.neutral {
  color: #535358;
}

.__white {
  color: #fff;
}

.selector
  > .v-input__control
  > .v-input__slot
  > .v-select__slot
  > .v-select__selections {
  color: black;
}
.v-text-field.v-text-field--solo .v-label {
  color: black;
}

.vt_realized:hover {
  box-shadow: 0px 5px 6px -2px rgba(0, 0, 0, 0.1),
    0px 10px 15px 2px rgba(0, 0, 0, 0.1), 0px 1px 5px 2px rgba(0, 0, 0, 0.1) !important;
}
.select_portfolio .v-input__slot {
  margin: 0;
  border-radius: unset;
}
.selector .v-input__control {
  min-height: auto !important;
}
.label {
  font-family: 'Nunito Sans', sans-serif !important;
  font-size: 12px;
}
</style>