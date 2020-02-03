<template>
  <v-content
    :class="[
      { 'white--text': lightSwitch == 1 },
      { 'black--text': lightSwitch == 0 }
    ]"
  >
    <div id="top">
      <v-content class="pr-3 text-right">
        <v-icon
          id="icon__share"
          small
          :class="[
            { 'white--text': lightSwitch == 1 },
            { 'black--text': lightSwitch == 0 }
          ]"
          @click="shareActivity"
          >mdi-share-variant</v-icon
        >
      </v-content>
      <!-- top -->
      <v-content>
        <v-row class="ml-3 mr-1 mt-1 mb-1">
          <v-col class="mr-9 mb-0 py-0 vt_realized">
            <v-row class="mt-1 pl-3 caption">
              Position
            </v-row>
            <v-row class="mt-1 mb-1">
              <v-col md="12" class="text-right pb-0 pl-0 pr-3">
                {{ open.position | numeral("0,0.00") }}
              </v-col>
            </v-row>
          </v-col>

          <v-col class="mr-9 mb-0 py-0 vt_realized">
            <v-row class="mt-1 pl-3 caption">
              Ave. Price (<span class="caption">PHP</span>)
            </v-row>
            <v-row class="mt-1 mb-1">
              <v-col md="12" class="text-right pb-0 pl-0 pr-3">
                {{ open.average_price | numeral("0,0.00") }}
              </v-col>
            </v-row>
          </v-col>

          <v-col class="mr-9 mb-0 py-0 vt_realized">
            <v-row class="mt-1 pl-3 caption">
              Total Cost (<span class="caption">PHP</span>)
            </v-row>
            <v-row class="mt-1 mb-1">
              <v-col md="12" class="text-right pb-0 pl-0 pr-3">
                {{ open.total_cost | numeral("0,0.00") }}
              </v-col>
            </v-row>
          </v-col>

          <v-col class="mr-9 mb-0 py-0 vt_realized">
            <v-row class="mt-1 pl-3 caption">
              Market Value (<span class="caption">PHP</span>)
            </v-row>
            <v-row class="mt-1 mb-1">
              <v-col md="12" class="text-right pb-0 pl-0 pr-3">
                {{ open.market_value | numeral("0,0.00") }}
              </v-col>
            </v-row>
          </v-col>

          <v-col class="mr-9 mb-0 py-0 vt_realized">
            <v-row class="mt-1 pl-3 caption">
              Profit (<span class="caption">PHP</span>)
            </v-row>
            <v-row class="mt-1 mb-1">
              <v-col
                md="12"
                class="text-right pb-0 pl-0 pr-3"
                :class="[
                  { increase: changeType(open.profit_loss) == 1 },
                  { decrease: changeType(open.profit_loss) == 2 },
                  { neutral: changeType(open.profit_loss) == 0 }
                ]"
              >
                {{ open.profit_loss | numeral("0.00a") }}
              </v-col>
            </v-row>
          </v-col>

          <v-col class="mr-1 mb-0 py-0 vt_realized">
            <v-row class="mt-1 pl-3 caption">
              Perf. (%)
            </v-row>
            <v-row class="mt-1 mb-1">
              <v-col
                md="12"
                class="text-right pb-0 pl-0 pr-3"
                :class="[
                  { increase: changeType(open.pl_percentage) == 1 },
                  { decrease: changeType(open.pl_percentage) == 2 },
                  { neutral: changeType(open.pl_percentage) == 0 }
                ]"
              >
                {{ open.pl_percentage | numeral("0.00a") }}
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-content>
    </div>

    <v-content class="mx-1">
      <span class="subtitle-2 ml-2 text-uppercase">Trade History</span>
      <v-divider class="mt-2"></v-divider>
      <v-data-table
        :headers="headers"
        :items="items"
        class="data_table-container"
        :dark="lightSwitch == 1"
        dense
        :loading="loading"
        fixed-header
        calculate-widths
        disable-pagination
        hide-default-footer
        :style="{ background: cardBackground }"
        :height="`${tablesize}`"
      >
        <template v-slot:item="props">
          <tr class="tr_custom">
            <td class="text-left pl-2" style="width:10%">
              <span>{{
                $moment(props.item.meta.date).format("YYYY-MM-DD")
              }}</span>
            </td>
            <td class="text-right" style="width:10%">
              <span>{{ props.item.amount }}</span>
            </td>
            <td class="text-right" style="width:13%">
              <span>{{
                props.item.meta.average_price | numeral("0,0.000")
              }}</span>
            </td>
            <td class="text-right" style="width:13%">
              <span>{{ displayBuyValue(props.item) | numeral("0,0.00") }}</span>
            </td>
            <td class="text-right" style="width:13%">
              <span>{{ props.item.meta.sell_price | numeral("0,0.00") }}</span>
            </td>
            <td class="text-right" style="width:13%">
              <span>{{ props.item.total_value | numeral("0,0.00") }}</span>
            </td>
            <td class="text-right" style="width:13%">
              <span
                :class="[
                  { increase: displayProfLoss(props.item) > 0 },
                  { decrease: displayProfLoss(props.item) < 0 },
                  { neutral: displayProfLoss(props.item) == 0 }
                ]"
              >
                {{ displayProfLoss(props.item) | numeral("0,0.00") }}
              </span>
            </td>
            <td class="text-right pr-2" style="width:13%">
              <span
                :class="[
                  { increase: displayPercentage(props.item) > 0 },
                  { decrease: displayPercentage(props.item) < 0 },
                  { neutral: displayPercentage(props.item) == 0 }
                ]"
                >{{ displayPercentage(props.item) | numeral("0,0.00") }}</span
              >
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-content>
  </v-content>
</template>

<script>
import { mapGetters } from "vuex";
import { BuyFees } from "~/assets/js/helpers/taxation";

export default {
  data() {
    return {
      loading: "success",
      open: [],
      min: "105px",
      max: "calc(100vh - 295px)",
      headers: [
        {
          text: "Date",
          value: "date",
          class: "text-left pl-2 caption font-weight-bold"
        },
        {
          text: "Volume",
          value: "volume",
          class: "text-right caption font-weight-bold"
        },
        {
          text: "Ave. Price",
          value: "aveprice",
          class: "text-right caption font-weight-bold"
        },
        {
          text: "Buy Value",
          value: "buyvalue",
          class: "text-right caption font-weight-bold"
        },
        {
          text: "Sell Price",
          value: "sellprice",
          class: "text-right caption font-weight-bold"
        },
        {
          text: "Sell Value",
          value: "sellvalue",
          class: "text-right caption font-weight-bold"
        },
        {
          text: "Profit/Loss",
          value: "profitloss",
          class: "text-right caption font-weight-bold"
        },
        {
          text: "%",
          value: "percentage",
          class: "text-right caption font-weight-bold pr-2"
        }
      ],
      items: [
        {
          id: null,
          transactionable_id: null,
          transactionable_type: null,
          action: null,
          amount: null,
          total_value: null,
          meta: {
            strategy: null,
            average_price: null,
            plan: null,
            emotion: null,
            notes: null,
            date: null,
            stock_id: null,
            sell_price: null,
            user_stock: null
          }
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      fullscreen: "chart/getTableFullscreen",
      ticker: "chart/getTicker",
      lightSwitch: "global/getLightSwitch",
      stock: "chart/stock",
      sseInfo: "chart/sseInfo",
      sseTrade: "chart/sseTrade",
      symbolid: "chart/symbolid"
    }),
    tablesize() {
      return this.fullscreen ? this.max : this.min;
    },
    cardBackground() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    }
  },
  watch: {
    /**
     * watch sym_id changes and re-initialise
     *
     * @param   {String}  symbolid  stock id
     *
     * @return
     */
    symbolid(symbolid) {
      this.initActivity(symbolid);
    },
    /**
     * update table size depends on ticker visibility
     *
     * @param   {Boolean}  value  true = open / false = close
     *
     * @return
     */
    ticker(value) {
      if (value) {
        this.max = "calc(100vh - 295px)";
      } else {
        this.max = "calc(100vh - 245px)";
      }
    },
    /**
     * enable sse once loading is done
     *
     * @param   {Boolean}  value  true/false
     *
     * @return
     */
    sseTrade(value) {
      if (this.loading === false) {
        this.sseTradeFilter(value);
      }
    }
  },
  mounted() {
    this.initActivity(this.symbolid);
  },
  methods: {
    /**
     * share activity once clicked
     * // TODO
     * @return
     */

    shareActivity() {},

    /**
     * initialise and request from journal API
     *
     * @param   {String}  symid  stock symbol id
     *
     * @return
     */
    async initActivity(symid) {
      try {
        this.loading = "success";
        const open = await this.$api.journal.portfolio.open({
          fund: "real",
          stock_id: symid
        });
        this.open = open.data.open;

        const logs = await this.$api.journal.portfolio.tradelogs({
          fund: "real",
          stock: symid
        });
        this.items = logs.data.logs;
        this.loading = false;
      } catch (error) {
        this.items = [];
        this.loading = false;
      }
    },
    /**
     * detemine the color dymanically
     *
     * @param   {String}  value  change value
     *
     * @return  {Integer}       1 = Increase, 2 = Decrease, 0 = Neutral
     */
    changeType(value) {
      if (value > 0) {
        return 1;
      } else if (value < 0) {
        return 2;
      } else {
        return 0;
      }
    },
    /**
     * display Buy Value after computation
     *
     * @param   {Object}  item  object values
     *
     * @return  {Float}      computed result
     */
    displayBuyValue(item) {
      return item.meta.average_price * item.amount;
    },
    /**
     * diplay profit / loss after computation
     *
     * @param   {Object}  item  object values
     *
     * @return  {Float}      computed result
     */
    displayProfLoss(item) {
      const bv = item.meta.average_price * item.amount;
      return item.total_value - bv;
    },
    /**
     * display computed value of percentage
     *
     * @param   {Object}  item  object values
     *
     * @return  {Float}      computed result
     */
    displayPercentage(item) {
      const bv = item.meta.average_price * item.amount;
      const pl = item.total_value - bv;
      const result = (pl / bv) * 100;
      return isNaN(result) ? 0 : result;
    },
    /**
     * initialise and listen to stock trade sse
     *
     * @param   {Object}  data  stock trade data
     *
     * @return
     */
    sseTradeFilter(data) {
      try {
        if (this.symbolid == undefined) return;
        if (this.symbolid !== data.sym_id) return;

        if (parseInt(this.open.position) == 0) return;

        // market value
        const p = this.open.position * data.exp;
        const mv = BuyFees(p);

        // profit / loss
        const bv = this.open.average_price * this.open.position;
        const pl = mv - bv;
        this.open.profit_loss = pl;

        // percentage
        const perc = (pl / bv) * 100;
        this.open.pl_percentage = isNaN(perc) ? 0 : perc;
      } catch (error) {}
    }
  }
};
</script>

<style scoped>
#top {
  height: 120px;
}
#icon__share {
  cursor: pointer;
}
#div__share {
  position: absolute;
  right: 8px;
}
.tr_custom {
  line-height: 1.5rem !important;
  cursor: pointer;
}
.positive {
  color: #03dac5;
}
.negative {
  color: #fe4949;
}
.vt_realized {
  border: rgb(182, 182, 182, 0.2) 1px solid;
}
.neutral {
  color: #dddddd !important;
}
.increase {
  color: #03dac5 !important;
}
.decrease {
  color: #f44336 !important;
}
</style>
