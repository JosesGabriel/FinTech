<template>
  <v-content>
    <div
      class="sub__title"
      :class="[
        { 'black--text': lightSwitch == 0 },
        { 'white--text': lightSwitch == 1 }
      ]"
    >
      <div class="title__left">All Stock</div>
      <div class="title__right">
        <v-btn
          x-small
          :disabled="loading || marketOpen == false"
          class="ma-0 pa-0"
          text
          icon
          @click="initAllStock"
        >
          <v-icon size="15">mdi-refresh</v-icon>
        </v-btn>
      </div>
    </div>

    <v-card
      v-show="loading"
      :dark="lightSwitch == 1"
      :color="lightSwitch == 0 ? 'lightchart' : 'darkchart'"
      class="mt-2 mr-2"
      flat
      tile
    >
      <v-progress-linear
        color="success"
        indeterminate
        buffer-value="100"
        height="5"
        class="mt-3"
      ></v-progress-linear>
    </v-card>

    <v-card
      :dark="lightSwitch == 1"
      :color="lightSwitch == 0 ? 'lightchart' : 'darkchart'"
      class="pl-3 pr-2"
      :style="`height: calc(100vh - ${responsiveHeight - 170}px)`"
      flat
      tile
    >
      <v-data-table
        v-show="!loading"
        :headers="headers"
        :items="allStocks"
        class="data_table-container custom_table"
        dense
        :dark="lightSwitch == 1"
        fixed-header
        disable-pagination
        hide-default-footer
        :custom-sort="customSort"
        :height="`calc(100vh - ${responsiveHeight - 160}px)`"
        :style="{ background: cardBackground }"
      >
        <template v-slot:item="props">
          <tr
            :id="props.item.stockidstr"
            class="tr_custom"
            :class="[
              { darkmode__text: lightSwitch == 1 },
              { lightmode__text: lightSwitch == 0 }
            ]"
            @click="setSymbolID(props.item.stockidstr)"
          >
            <td class="text-left" style="width:40px;">
              <span>{{ props.item.symbol }}</span>
            </td>
            <td class="text-right" style="width:35px">
              <span
                :class="[
                  { increase: props.item.change > 0 },
                  { decrease: props.item.change < 0 }
                ]"
              >
                {{
                  props.item.last
                    | stockDecimalPriceScale(props.item.pricescale)
                }}
              </span>
            </td>
            <td class="text-right" style="width:55px">
              <span
                :class="[
                  { increase: props.item.change > 0 },
                  { decrease: props.item.change < 0 }
                ]"
              >
                {{ props.item.changepercentage | numeral("0,0.00") }}
              </span>
            </td>
            <td class="text-right" style="width:40px">
              <span class="text-uppercase">{{
                props.item.value | numeral("0.00a")
              }}</span>
            </td>
            <td class="text-right text-uppercase" style="width:45px">
              <span class="">
                {{ props.item.trades | numeral("0,0") }}
              </span>
            </td>
            <td style="width:5px"></td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-content>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AllStock",
  props: {
    activeTab: {
      default: "",
      type: String
    }
  },
  data() {
    return {
      headers: [
        {
          text: "Symbol",
          value: "symbol",
          class: "text-left"
        },
        { text: "Last", value: "last", class: "text-right" },
        {
          text: "%Change",
          value: "changepercentage",
          class: "text-right"
        },
        {
          text: "Value",
          value: "value",
          class: "text-right"
        },
        {
          text: "Trades",
          value: "trades",
          class: "text-right"
        }
      ],
      loading: true,
      currentTab: true,
      allStocks: [],
      latestDate: "",
      symbolDesc: null,
      templateHeader: true,
      sorted: false,
      sortctr: 0,
      sort: {
        items: 0,
        index: undefined,
        desc: undefined
      }
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch",
      responsiveHeight: "chart/responsiveHeight",
      sseInfo: "chart/sseInfo",
      blink: "chart/blink",
      marketOpen: "chart/marketOpen"
    }),
    /**
     * toggle card background on light/dark mode
     *
     * @return
     */
    cardBackground() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    }
  },
  watch: {
    /**
     * Temporary aid to add ctr, noticed that upon request data custom sort run twice
     * by default on the 3rd count run request all stock
     *
     * @param   {Bolean}  value  true/false
     *
     * @return
     */
    sorted(value) {
      if (
        this.loading == false &&
        this.sort.index != undefined &&
        this.sortctr >= 3
      ) {
        this.initAllStock();
      }
    },
    /**
     * enable sse once loading is done
     *
     * @param   {Boolean}  value  true/false
     *
     * @return
     */
    sseInfo(value) {
      if (this.loading === false && this.currentTab === true) {
        // this.sseAllInfo(value);
      }
    },
    /**
     * fetch what is the current active tab
     *
     * @param   {String}  value  tab id name
     *
     * @return
     */
    activeTab(value) {
      const tab = parseInt(value.substr(4));
      if (tab == 2) {
        this.initAllStock();
        this.currentTab = true;
      } else {
        this.currentTab = false;
      }
    }
  },
  methods: {
    ...mapActions({
      setSymbolID: "chart/setSymbolID"
    }),
    /**
     * add simpe blink animation effect
     *
     * @param   {String}  dom  id of element
     *
     * @return
     */
    updateEffect(dom) {
      const item = document.getElementById(dom);
      if (item == null) return;
      item.style.background = "rgb(182,182,182,.2)";
      setTimeout(() => {
        item.style.background = "";
      }, this.blink);
    },
    /**
     * initialize and request latest stock info on mount hook
     *
     * @return
     */
    async initAllStock() {
      this.sort.items = 0;
      this.sortctr = 0;
      this.sort.index = undefined;
      this.loading = true;
      this.allStocks = [];
      try {
        const latestDate = await this.$api.chart.stocks.activeDate();
        this.latestDate = latestDate.data.date;
        const response = await this.$api.chart.stocks.history({
          exchange: "PSE"
        });
        // this filter made to remove all index stocks
        const filtered = response.data.filter(data => parseInt(data.value) > 0);
        filtered.forEach(data => {
          let {
            stockidstr,
            symbol,
            change,
            last,
            changepercentage,
            value,
            trades,
            description,
            lastupdatetime,
            pricescale
          } = data;
          this.allStocks.push({
            stockidstr,
            symbol,
            change,
            last,
            changepercentage,
            value,
            trades,
            description,
            lastupdatetime,
            pricescale
          });
        });
        this.loading = false;
      } catch (error) {}
    },
    /**
     * initialise and listen to stock info sse
     *
     * @param   {Object}  data  stock info data
     *
     * @return
     */
    sseAllInfo(data) {
      try {
        const stock = this.allStocks.find(
          resp => resp.stockidstr == data.sym_id
        );
        const key = this.allStocks.indexOf(stock);

        this.allStocks.splice(key, 1, {
          stockidstr: stock.stockidstr,
          symbol: stock.symbol,
          change: data.chg,
          last: data.l,
          changepercentage: data.chgpc,
          value: data.val,
          trades: data.tr,
          pricescale: stock.pricescale
        });
        this.updateEffect(stock.stockidstr);
      } catch (error) {}
    },
    /**
     * sort all stock customized
     *
     * @param   {Array}  items   lists of stocks
     * @param   {Array}  index   array index - name of header
     * @param   {Boolean}  isDesc  is descending
     *
     * @return  {Array}        new list of item
     */
    customSort(items, index, isDesc) {
      this.sortctr += 1; // bandaid solution

      if (index[0] == "symbol") {
        // symbol was clicked
        this.symbolDesc = isDesc;
      } else {
        if (index[0] != undefined && this.sortctr >= 3) {
          this.sorted = !this.sorted;
          this.sort.items = items.length;
          this.sort.index = index[0];
          this.sort.desc = isDesc[0];
        }
      }

      if (index[0] != "symbol" && index.length > 0) {
        items = items.filter(data => {
          return (
            this.$moment(data.lastupdatetime).format("YYYYMMDD") ==
            this.$moment(this.latestDate).format("YYYYMMDD")
          );
        });
      }

      items.sort((a, b) => {
        const desc = isDesc[0];
        if (isDesc.length == 0 && this.symbolDesc != null) {
          // check if desc
          if (this.symbolDesc[0] == true) {
            return b["symbol"]
              .toLowerCase()
              .localeCompare(a["symbol"].toLowerCase());
          }
        } else if (index[0] == "symbol") {
          if (!desc) {
            return a[index].toLowerCase().localeCompare(b[index].toLowerCase());
          } else {
            return b[index].toLowerCase().localeCompare(a[index].toLowerCase());
          }
        } else {
          if (!desc) {
            // ascending
            return a[index] - b[index];
          } else {
            // descending
            return b[index] - a[index];
          }
        }
      });
      return items;
    }
  },
  mounted() {
    this.initAllStock();
  }
};
</script>

<style scoped>
.lightmode__text {
  color: #494949;
}
.darkmode__text {
  color: #e5e5e5;
}
.tr_custom {
  line-height: 0.1rem !important;
  cursor: pointer;
}
tr.tr_custom td {
  height: 20px !important;
}
.sub__title {
  display: flex;
}
.title__left {
  flex: 0 0 130px;
}
.title__right {
  flex: 0 0 125px;
  text-align: right;
  font-size: 11px;
}
</style>
