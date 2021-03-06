<template>
  <v-content>
    <div
      class="sub__title"
      :class="[
        { 'black--text': lightSwitch == 0 },
        { 'white--text': lightSwitch == 1 }
      ]"
    >
      <div class="title__left">Watchlist</div>
      <div class="title__right">
        <v-btn
          x-small
          :disabled="loading"
          class="ma-0 pa-0"
          text
          icon
          @click="addWatchlist"
        >
          <v-icon size="15">mdi-plus-circle-outline</v-icon>
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

    <h4 v-show="noItems === true" class="text-center">No Watchlist</h4>

    <v-card
      :dark="lightSwitch == 1"
      :color="lightSwitch == 0 ? 'lightchart' : 'darkchart'"
      :max-height="`calc(100vh - ${responsiveHeight - 170}px)`"
      style="overflow-y: auto;"
      class="mt-2 mr-2"
      flat
      tile
    >
      <v-card
        v-for="(item, key) in items"
        :id="`watch__${item.id}`"
        :key="item.id"
        tile
        flat
        :color="onHoverEffect(item.color)"
        class="mb-1 pt-1"
        @mouseover.native="item.color = true"
        @mouseleave.native="item.color = false"
      >
        <div class="watchlist__top">
          <div class="top__left pl-2">
            <span class="span__symbolid" @click="setSymbolID(item.sym_id)">{{
              item.market_code
            }}</span>
          </div>
          <div class="top__right pr-2">
            <span class="">{{
              item.last | stockDecimalPriceScale(item.pricescale)
            }}</span>
          </div>
        </div>
        <div class="watchlist__bottom">
          <div class="bottom__left pl-2">
            <span
              class="text-uppercase"
              :class="[
                { darkmode__text: lightSwitch == 1 },
                { lightmode__text: lightSwitch == 0 }
              ]"
              >{{ item.description | limitString(15, true) }}</span
            >
          </div>
          <div class="bottom__right pr-2">
            <span
              ><v-icon v-show="item.change > 0.0" class="increase"
                >mdi-chevron-up</v-icon
              ><v-icon v-show="item.change < 0.0" class="decrease"
                >mdi-chevron-down</v-icon
              >
            </span>
            <span
              :class="[
                {
                  increase: item.change > 0.0,
                  decrease: item.change < 0.0
                }
              ]"
              >{{ item.change | numeral("0.00a") }} ({{
                item.changepercentage | numeral("0.00a")
              }}%)</span
            >
          </div>
        </div>
      </v-card>
    </v-card>
  </v-content>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Watchlist",
  props: ["activeTab"],
  data() {
    return {
      currentTab: false,
      loading: true,
      noItems: false,
      items: []
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch",
      responsiveHeight: "chart/responsiveHeight",
      sseInfo: "chart/sseInfo",
      blink: "chart/blink"
    })
  },
  watch: {
    /**
     * run sse only once loading is finish
     *
     * @param   {Object}  value response info sse
     *
     * @return
     */
    sseInfo(value) {
      if (
        this.loading === false &&
        this.currentTab === true &&
        this.noItems === false
      ) {
        this.sseAllInfo(value);
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
      if (tab == 3) {
        this.initWatchlist();
        this.currentTab = true;
      } else {
        this.currentTab = false;
      }
    }
  },
  mounted() {
    this.initWatchlist();
  },
  methods: {
    ...mapActions({
      setSymbolID: "chart/setSymbolID"
    }),
    /**
     * initialise and request for wathclist data api
     *
     * @return
     */
    async initWatchlist() {
      this.loading = true;
      this.items = [];
      try {
        const response = await this.$api.watchlist.watchlists.index();
        const data = response.data.watchlist;
        data.forEach(async data => {
          const history = await this.$api.chart.stocks.history({
            "symbol-id": data.stock_id
          });
          const symbol = data.market_code.split(":");
          this.items.push({
            id: data.id,
            sym_id: data.stock_id,
            symbol: symbol.pop(),
            description: data.description,
            market_code: data.market_code,
            last: history.data.last,
            changepercentage: history.data.changepercentage,
            change: history.data.change,
            pricescale: history.data.pricescale,
            color: false
          });
        });
        this.loading = false;
        this.noItems = false;
      } catch (error) {
        this.loading = false;
        this.noItems = true;
      }
    },
    /**
     * initialize and listen to sse stock info
     *
     * @param   {Object}  data
     *
     * @return
     */
    sseAllInfo(data) {
      try {
        const stock = this.items.find(resp => resp.sym_id == data.sym_id);
        if (stock == undefined) return;
        const key = this.items.indexOf(stock);
        //console.log("stock sse", stock);
        //console.log("data sse", data);
        this.items.splice(key, 1, {
          id: stock.id,
          sym_id: stock.sym_id,
          symbol: stock.symbol,
          description: stock.description,
          market_code: stock.market_code,
          last: data.c,
          changepercentage: data.chgpc,
          change: data.chg,
          pricescale: stock.pricescale,
          color: true
        });
        this.updateEffect(stock.id);
      } catch (error) {}
    },
    /**
     * add simple hover effect
     *
     * @param   {String}  value
     *
     * @return
     */
    onHoverEffect(value) {
      if (value == true) {
        return "rgb(182, 182, 182, 0.2)";
      }
    },
    /**
     * add simple animation effect
     *
     * @param   {String}  dom  element id
     *
     * @return
     */
    updateEffect(dom) {
      const item = document.getElementById(`watch__${dom}`);
      const mouseoverEvent = new Event("mouseleave");
      setTimeout(() => {
        item.dispatchEvent(mouseoverEvent);
      }, this.blink);
    },
    /**
     * redirect to watchlist page
     *
     * @return
     */
    addWatchlist() {
      let routeData = this.$router.resolve({
        name: "watchlist"
      });
      window.open(routeData.href, "_blank");
    }
  }
};
</script>

<style scoped>
.theme--light.v-card {
  background-color: #f2f2f2;
  color: rgba(0, 0, 0, 0.87);
}

.theme--dark.v-card {
  background-color: #00121e;
  color: #fff;
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
.watchlist__top {
  display: flex;
  font-size: 11px;
}

.top__left {
  flex: 0 0 136px;
  font-size: 14px;
}
.top__right {
  flex: 0 0 136px;
  text-align: right;
  font-size: 14px;
}
.watchlist__bottom {
  display: flex;
}
.bottom__left {
  flex: 0 0 136px;
  color: #bbb;
  font-size: 11px;
  margin-top: -4px;
}
.span__symbolid {
  cursor: pointer;
}
.bottom__right {
  flex: 0 0 136px;
  text-align: right;
  margin-top: -4px;
  font-size: 11px;
}
.content__card-watchlist {
  height: calc(100vh - 335px);
  overflow-x: auto;
}
.hoverwatch {
  background: pink !important;
}
.increase {
  color: #03dac5 !important;
  font-size: 11px;
}
.decrease {
  color: #f44336 !important;
  font-size: 11px;
}
.lightmode__text {
  color: #494949;
}
.darkmode__text {
  color: #e5e5e5;
}
</style>
