<template>
  <v-col cols="12" sm="12" md="12">
    <v-row class="mt-3 ml-0 mb-10 mr-2">
      <v-col
        class="ml-0 mb-2 pt-0 pb-0 vt_realized"
        :style="{ border: cardbackground2 }"
        style="width:20%;"
      >
        <v-row :style="{ color: fontcolor }" class="mt-2 pl-3 caption">Realized P/L (PHP)</v-row>
        <v-row class="mt-1 mb-2">
          <v-col
            md="12"
            :class="(this.realized > 0 ? 'positive' : this.realized < 0 ? 'negative' : 'neutral')"
            class="text-right pb-0 pl-0 pr-3"
          >{{ this.addcomma(this.realized) }}</v-col>
        </v-row>
      </v-col>
      <v-col
        class="ml-3 mb-2 pt-0 pb-0 vt_realized"
        :style="{ border: cardbackground2 }"
        style="width:20%;"
      >
        <v-row :style="{ color: fontcolor }" class="mt-2 pl-3 caption">Unrealized P/L (PHP)</v-row>
        <v-row class="mt-1">
          <v-col
            md="12"
            :class="(this.unrealized > 0 ? 'positive' : this.unrealized < 0 ? 'negative' : 'neutral')"
            class="text-right pb-0 pl-0 pr-3"
          >{{ this.addcomma(this.unrealized) }}</v-col>
        </v-row>
      </v-col>
      <v-col
        class="ml-3 mb-2 pt-0 pb-0 vt_realized"
        :style="{ border: cardbackground2 }"
        style="width:20%;"
      >
        <v-row :style="{ color: fontcolor }" class="mt-2 pl-3 caption">Port Performance %</v-row>
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
        :style="{ border: cardbackground2 }"
        style="width:20%;"
      >
        <v-row :style="{ color: fontcolor }" class="mt-2 pl-3 caption">Max Drawdown %</v-row>
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
        :style="{ border: cardbackground2 }"
        style="width:20%;"
      >
        <v-row :style="{ color: fontcolor }" class="mt-2 pl-3 caption">Equity</v-row>
        <v-row class="mt-1">
          <v-col
            md="12"
            :class="((this.port_total + 100000) > 0 ? 'positive' : 'negative')"
            class="text-right pb-0 pl-0 pr-3"
          >{{ this.addcomma(this.port_total + 100000) }}</v-col>
        </v-row>
      </v-col>
      <v-col
        class="ml-3 mb-2 pt-0 pb-0 vt_realized"
        :style="{ border: cardbackground2 }"
        style="width:20%;"
      >
        <v-row :style="{ color: fontcolor }" class="mt-2 pl-3 caption">Day Change</v-row>
        <v-row class="mt-0">
          <v-col md="12" class="text-right pt-0 pb-0 pl-0 pr-3">
            <v-row class="ma-0 pa-0 overline">
              <v-col
                :class="(this.daychangepercentage > 0 ? 'positive' : this.daychangepercentage < 0 ? 'negative' : 'neutral')"
                class="ma-0 pa-0"
              >( {{ this.addcomma(this.daychangepercentage) }}%)</v-col>
            </v-row>
            <v-row class="ma-0 pa-0">
              <v-col
                :class="(this.daychange > 0 ? 'positive' : this.daychange < 0 ? 'negative' : 'neutral')"
                class="ma-0 pa-0"
              >{{ this.addcomma(this.daychange) }}</v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-tabs
      color="#03dac5"
      background-color="transparent"
      :dark="lightSwitch == true"
      :style="{ background: cardbackground }"
      dark
    >
      <v-tab
        :style="{ color: fontcolor }"
        class="tab_menu-top text-capitalize subtitle-1"
        :href="`#tab-1`"
      >Live Portfolio</v-tab>
      <v-tab
        :style="{ color: fontcolor }"
        class="tab_menu-top text-capitalize subtitle-1"
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
            background-color="#03DAC5"
            label="Select Portfolio"
            dense
            solo
          >
            <template slot="item" slot-scope="data">
              <v-list-item-content
                :dark="lightSwitch == true"
                :style="{ background: cardbackground }"
                style="padding: 12px 12px; margin: -16px;"
              >
                <v-list-item-title v-html="data.item.name" class="text-uppercase"></v-list-item-title>
              </v-list-item-content>
            </template>

            <template
              v-slot:append-item
              :dark="lightSwitch == true"
              :style="{ background: cardbackground }"
            >
              <v-list-item
                ripple
                :dark="lightSwitch == true"
                :style="{ background: cardbackground }"
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
        color="#03dac5"
        background-color="black"
        :value="'tab-' + 1"
        :style="(this.lightSwitch == 0 ? 'background:transparent; border-top: 1px solid #b6b6b6' : 'background:transparent; border-top: 1px solid #535358')"
      >
        <v-container class="pa-0">
          <VirtualLivePortfolio
            v-on:DayChange="DayChange"
            v-on:DayChangePerc="ChangePerc"
            v-on:totalUnrealized="Unrealized"
            v-on:totalMarketValue="TotalMValue"
          />
        </v-container>
      </v-tab-item>
      <v-tab-item
        dark
        color="#03dac5"
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
    <!-- <ChartTesting/> -->
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
      state: false
    };
  },
  created() {},
  computed: {
    ...mapGetters({
      simulatorPortfolioID: "tradesimulator/getSimulatorPortfolioID",
      lightSwitch: "global/getLightSwitch"
    }),
    cardbackground: function() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    },
    fontcolor: function() {
      return this.lightSwitch == 0
        ? "#000000 !important"
        : "#ffffff !important";
    },
    cardbackground2: function() {
      return this.lightSwitch == 0 ? "1px solid #dadada" : "1px solid #172431";
    },
    tabsborder: function() {
      return this.lightSwitch == 0 ? "1px solid #b6b6b6" : "1px solid #535358";
    }
  },
  watch: {
    simulatorPortfolioID: function() {
      this.realized = 0;
      this.unrealized = 0;
      this.totalmvalue = 0;
      this.totalmax = 0;
      this.balance = 0;
      this.daychange = 0;
      this.daychangepercentage = 0;
      this.equity = 0;
      this.port_total = 0;
    },

    unrealized: function() {
      this.getTradeLogs();
    }
  },
  methods: {
    ...mapActions({
      setSimulatorPortfolioID: "tradesimulator/setSimulatorPortfolioID"
    }),
    getOpenPosition(selectObj) {
      this.setSimulatorPortfolioID(selectObj);
      this.default_port = selectObj;
      this.state = false;
    },
    Realized(value) {
      this.realized = value;
    },
    Unrealized(value) {
      this.unrealized = value;
    },
    TotalMValue(value) {
      this.totalmvalue = value;
    },
    TotalMax(value) {
      this.totalmax = value;
    },
    DayChange(value) {
      this.daychange = value;
    },
    ChangePerc(value) {
      this.daychangepercentage = value;
    },
    portperf() {
      this.port_total = parseFloat(this.realized) + parseFloat(this.unrealized);
      let portperf = (this.port_total / 100000) * 100;
      return this.addcomma(portperf);
    },

    addcomma(n, sep, decimals) {
      sep = sep || "."; // Default to period as decimal separator
      decimals = decimals || 2; // Default to 2 decimals
      return (
        n.toLocaleString().split(sep)[0] + sep + n.toFixed(2).split(sep)[1]
      );
    },

    //===============================================

    getTradeLogs() {
      const tradelogsparams = {
        fund: this.simulatorPortfolioID
      };

      let totalProfitLoss = 0;
      let totalProfitLossPerf = 0;
      this.$api.journal.portfolio.tradelogs(tradelogsparams).then(
        function(result) {
          //console.log('Result', result.data);
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

    arrayMax(arr) {
      var len = arr.length,
        min = Infinity;
      while (len--) {
        if (arr[len] < min) {
          min = arr[len];
        }
      }
      return min;
    }
  },
  mounted() {
    /*const openparams = {
        user_id: "2d5486a1-8885-47bc-8ac6-d33b17ff7b58"
      };*/
    this.$api.journal.portfolio.portfolio().then(
      function(result) {
        //console.log('Portfolio', result);
        let defaultPort = false;
        for (let i = 0; i < result.data.logs.length; i++) {
          if (
            result.data.logs[i].type == "virtual" &&
            result.data.logs[i].name != "Default Virtual Portfolio"
          ) {
            let portfolio_params = {
              name: result.data.logs[i].name,
              id: result.data.logs[i].id
            };
            this.portfolio.push(portfolio_params);
            if (result.data.logs[i].name == "My Virtual Portfolio") {
              this.setSimulatorPortfolioID(result.data.logs[i].id);
              this.default_port = result.data.logs[i].id;
              defaultPort = true;
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
.v-menu__content > .v-select-list > .v-list {
  padding: unset;
  border: 1px solid rgb(23, 36, 49);
}
.select_portfolio > .v-input__control {
  padding-top: 16px !important;
}

.v-menu__content {
  border-radius: unset !important;
}

.v-menu__content
  .v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  color: #03dac5 !important;
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
  font-size: 13px;
  font-weight: 100;
}

.select_portfolio > .v-input__control > .v-input__slot > .v-select__slot {
  height: 30px;
}
.select_portfolio > .v-input__control > .v-input__slot {
  min-height: initial;
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
</style>