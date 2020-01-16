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
        <v-icon size="15" class="icon__add-watchlist" @click="addWatchlist"
          >mdi-plus-circle-outline</v-icon
        >
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

    <h4 v-show="noitems === true" class="text-center">No Watchlist</h4>

    <v-card
      :dark="lightSwitch == 1"
      :color="lightSwitch == 0 ? 'lightchart' : 'darkchart'"
      :max-height="`calc(100vh - ${responsive_height - 170}px)`"
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
            <span
              class="span__symbolid"
              @click="setSymbolID(item.id)"
              @dblclick="showRemoveButton()"
              >{{ item.symbol }}</span
            >
          </div>
          <div class="top__right pr-2">
            <span class="">{{ item.last | numeral("0,0.00") }}</span>
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
              >{{
                $globalMethod.limitDisplayString(item.description, 15, true)
              }}</span
            >
          </div>
          <div class="bottom__right overline pr-2">
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
  data() {
    return {
      loading: true,
      noitems: false,
      items: []
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch",
      responsive_height: "chart/responsive_height",
      allstocks: "chart/allstocks",
      sseInfo: "chart/sseInfo"
    }),
    cardbackground: function() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    }
  },
  watch: {
    sseInfo: function(value) {
      if (this.loading === false) {
        //this.sseAllInfo(value);
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
    initWatchlist: async function() {
      try {
        this.items = [];
        const response = await this.$api.watchlist.watchlists.index();
        const data = response.data.watchlist;
        data.forEach(data => {
          const symbol = data.market_code.split(":");
          this.items.push({
            id: data.id,
            sym_id: data.stock_id,
            symbol: symbol.pop(),
            description: data.description,
            last: data.last,
            changepercentage: data.change_percentage,
            change: data.change,
            color: false
          });
        });
        //console.log(data);
        this.loading = false;
      } catch (error) {
        //console.log(error);
        this.noitems = true;
        this.loading = false;
      }
    },
    sseAllInfo: function(data) {
      try {
        const stock = this.items.find(resp => resp.sym_id == data.sym_id);
        if (stock == undefined) return;
        const key = this.items.indexOf(stock);
        this.items.splice(key, 1, {
          id: stock.id,
          sym_id: stock.sym_id,
          symbol: stock.symbol,
          description: stock.description,
          last: data.c,
          changepercentage: data.chgpc,
          change: data.chg,
          color: true
        });
        this.updateEffect(stock.id);
      } catch (error) {
        //console.log(error);
      }
    },
    onHoverEffect: function(value) {
      if (value == true) {
        return "rgb(182, 182, 182, 0.2)";
      }
    },
    updateEffect: dom => {
      const item = document.getElementById(`watch__${dom}`);
      const mouseoverEvent = new Event("mouseleave");
      setTimeout(function() {
        item.dispatchEvent(mouseoverEvent);
      }, 200);
    },
    showRemoveButton: function() {},
    addWatchlist: function() {
      let routeData = this.$router.resolve({
        name: "watchlist"
        //query: { data: "someData" }
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

.watchlist__top :hover {
  /* background: red; */
}

.top__left {
  flex: 0 0 136px;
  font-size: 16px;
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
}
.icon__add-watchlist {
  cursor: pointer;
}
.content__card-watchlist {
  /* ${responsive_height - 175} */
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
