<template>
  <v-content>
    <div
      class="sub__title"
      :class="[
        { 'black--text': lightSwitch == 0 },
        { 'white--text': lightSwitch == 1 }
      ]"
    >
      All Stock
    </div>
    <v-card
      :dark="lightSwitch == 1"
      :color="lightSwitch == 0 ? 'lightchart' : 'darkchart'"
      :loading="loading"
      class="pl-3 pr-2"
      :style="`height: calc(100vh - ${responsive_height - 170}px)`"
      flat
      tile
    >
      <v-data-table
        :headers="headers"
        :items="all_stocks"
        class="data_table-container custom_table"
        dense
        :dark="lightSwitch == 1"
        fixed-header
        disable-pagination
        hide-default-footer
        :height="`calc(100vh - ${responsive_height - 160}px)`"
        :style="{ background: cardbackground }"
      >
        <!-- <template #item.symbol="{item}">
            SYM
        </template> -->
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
                {{ props.item.last | numeral("0.0a") }}
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
            <td class="text-right" style="width:60px">
              <span class="text-uppercase">{{
                props.item.value | numeral("0.00a")
              }}</span>
            </td>
            <td class="text-right text-uppercase" style="width:45px">
              <span class="">{{ props.item.trades | numeral("0,0") }}</span>
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
          value: "change",
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
      loading: "#03dac5",
      all_stocks: []
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch",
      responsive_height: "chart/responsive_height",
      allstocks: "chart/allstocks",
      sseInfo: "chart/sseInfo",
      blink: "chart/blink"
    }),
    /**
     * toggle card background on light/dark mode
     *
     * @return
     */
    cardbackground() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    }
  },
  watch: {
    sseInfo(value) {
      if (this.loading === false) {
        this.sseAllInfo(value);
      }
    }
  },
  methods: {
    ...mapActions({
      setSymbolID: "chart/setSymbolID",
      setAllstocks: "chart/setAllstocks"
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
      this.loading = "#03dac5";
      try {
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
            description
          } = data;
          this.all_stocks.push({
            stockidstr,
            symbol,
            change,
            last,
            changepercentage,
            value,
            trades,
            description
          });
        });
        //this.setAllstocks(this.all_stocks);
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
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
        const stock = this.all_stocks.find(
          resp => resp.stockidstr == data.sym_id
        );
        const key = this.all_stocks.indexOf(stock);
        this.all_stocks.splice(key, 1, {
          stockidstr: stock.stockidstr,
          symbol: stock.symbol,
          change: data.chg,
          last: data.l,
          changepercentage: data.chgpc,
          value: data.val,
          trades: data.tr
        });
        this.updateEffect(stock.stockidstr);
      } catch (error) {
        console.log(error);
      }
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
</style>
