<template>
  <v-content class="template">
    <div id="status__container">
      <div id="con__left">
        <table
          id="table__left"
          :class="[
            { darkmode__text: lightSwitch == 1 },
            { lightmode__text: lightSwitch == 0 }
          ]"
        >
          <tr>
            <td class="tleft__label">Previous</td>
            <td class="tleft__column">
              <span id="stock__close">
                {{ stock.close | numeral("0,0.00") }}
              </span>
            </td>
          </tr>
          <tr>
            <td class="tleft__label">Low</td>
            <td
              class="tleft__column"
              :class="{
                increase: stock.low > stock.close,
                decrease: stock.low < stock.close
              }"
            >
              <span id="stock__low">
                {{ stock.low | numeral("0,0.00") }}
              </span>
            </td>
          </tr>
          <tr>
            <td class="tleft__label">52wklow</td>
            <td
              class="tleft__column"
              :class="{
                increase: stock.weekyearlow > stock.last,
                decrease: stock.weekyearlow < stock.last
              }"
            >
              <span id="stock__weekyearlow">
                {{ stock.weekyearlow | numeral("0,0.00") }}
              </span>
            </td>
          </tr>
          <tr>
            <td class="tleft__label">Volume</td>
            <td class="tleft__column">
              <span id="stock__volume">
                {{ stock.volume | numeral("0.00a") }}
              </span>
            </td>
          </tr>
          <tr>
            <td class="tleft__label">Trades</td>
            <td class="tleft__column">
              <span id="stock__trades">
                {{ stock.trades | numeral("0,0") }}
              </span>
            </td>
          </tr>
        </table>
      </div>
      <div id="con__right">
        <table
          id="table__right"
          :class="[
            { darkmode__text: lightSwitch == 1 },
            { lightmode__text: lightSwitch == 0 }
          ]"
        >
          <tr>
            <td class="tright__label">Open</td>
            <td
              class="tright__column"
              :class="{
                increase: stock.open > stock.close,
                decrease: stock.open < stock.close
              }"
            >
              <span id="stock__open">
                {{ stock.open | numeral("0,0.00") }}
              </span>
            </td>
          </tr>
          <tr>
            <td class="tright__label">High</td>
            <td
              class="tright__column"
              :class="{
                increase: stock.high > stock.close,
                decrease: stock.high < stock.close
              }"
            >
              <span id="stock__high">
                {{ stock.high | numeral("0,0.00") }}
              </span>
            </td>
          </tr>
          <tr>
            <td class="tright__label">52wkhigh</td>
            <td
              class="tright__column"
              :class="{
                increase: stock.weekyearhigh > stock.last,
                decrease: stock.weekyearhigh < stock.last
              }"
            >
              <span id="stock__weekyearhigh">
                {{ stock.weekyearhigh | numeral("0,0.00") }}
              </span>
            </td>
          </tr>
          <tr>
            <td class="tright__label">Value</td>
            <td class="tright__column">
              <span id="stock__value">
                {{ stock.value | numeral("0.00a") }}
              </span>
            </td>
          </tr>
          <tr>
            <td class="tright__label">Average</td>
            <td
              class="tright__column"
              :class="{
                increase: stock.average > stock.last,
                decrease: stock.average < stock.last
              }"
            >
              <span id="stock__average">
                {{ stock.average | numeral("0,0.00") }}
              </span>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </v-content>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Status",
  data() {
    return {
      textcolor: "blue"
    };
  },
  computed: {
    ...mapGetters({
      stock: "chart/stock",
      lightSwitch: "global/getLightSwitch",
      stock_close: "chart/stock_close",
      stock_open: "chart/stock_open",
      stock_low: "chart/stock_low",
      stock_high: "chart/stock_high",
      stock_volume: "chart/stock_volume",
      stock_value: "chart/stock_value",
      stock_average: "chart/stock_average",
      stock_trades: "chart/stock_trades",
      stock_weekyearlow: "chart/stock_weekyearlow",
      stock_weekyearhigh: "chart/stock_weekyearhigh",
      blink: "chart/blink"
    })
  },
  watch: {
    stock_close: function(value) {
      this.updateEffect("stock__close");
    },
    stock_open: function(value) {
      this.updateEffect("stock__open");
    },
    stock_low: function(value) {
      this.updateEffect("stock__low");
    },
    stock_high: function(value) {
      this.updateEffect("stock__high");
    },
    stock_volume: function(value) {
      this.updateEffect("stock__volume");
    },
    stock_value: function(value) {
      this.updateEffect("stock__value");
    },
    stock_average: function(value) {
      this.updateEffect("stock__average");
    },
    stock_trades: function(value) {
      this.updateEffect("stock__trades");
    },
    stock_weekyearlow: function(value) {
      this.updateEffect("stock__weekyearlow");
    },
    stock_weekyearhigh: function(value) {
      this.updateEffect("stock__weekyearhigh");
    }
  },
  methods: {
    updateEffect: function(dom) {
      const item = document.getElementById(dom);
      item.style.background = "rgb(182,182,182,.2)";
      setTimeout(() => {
        item.style.background = "";
      }, this.blink);
    }
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
.increase {
  color: #03dac5 !important;
}
.decrease {
  color: #f44336 !important;
}
#status__container {
  display: flex;
  margin-top: 5px;
  /* height: 200px; */
}
#con__left {
  flex: 0 0 146px;
}
#con__right {
  flex: 0 0 140px;
}
#table__left {
  width: 146px;
  font-size: 11px;
  line-height: 13px;
  padding-left: 5px;
  padding-right: 5px;
}
.tleft__label {
  padding: 0;
  text-transform: uppercase;
  padding-left: 10px;
}
.tleft__column {
  padding: 0;
  text-transform: uppercase;
  text-align: right;
  padding-right: 10px;
}

#table__right {
  width: 140px;
  font-size: 11px;
  line-height: 13px;
  padding-right: 10px;
}
.tright__label {
  padding: 0;
  text-transform: uppercase;
  padding-left: 5px;
}
.tright__column {
  padding: 0;
  text-transform: uppercase;
  text-align: right;
  padding-right: 10px;
}
</style>
