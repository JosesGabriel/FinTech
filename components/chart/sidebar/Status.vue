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
            <td class="tleft__column">{{ stock.close | numeral("0,0.00") }}</td>
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
              {{ stock.low | numeral("0,0.00") }}
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
              {{ stock.weekyearlow | numeral("0,0.00") }}
            </td>
          </tr>
          <tr>
            <td class="tleft__label">Volume</td>
            <td class="tleft__column">
              {{ stock.volume | numeral("0.00a") }}
            </td>
          </tr>
          <tr>
            <td class="tleft__label">Trades</td>
            <td class="tleft__column">{{ stock.trades | numeral("0,0") }}</td>
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
              {{ stock.open | numeral("0,0.00") }}
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
              {{ stock.high | numeral("0,0.00") }}
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
              {{ stock.weekyearhigh | numeral("0,0.00") }}
            </td>
          </tr>
          <tr>
            <td class="tright__label">Value</td>
            <td class="tright__column">
              {{ stock.value | numeral("0.00a") }}
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
              {{ stock.average | numeral("0,0.00") }}
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
      textcolor: "blue",
      close: 0
    };
  },
  computed: {
    ...mapGetters({
      stock: "chart/stock",
      lightSwitch: "global/getLightSwitch"
    })
<<<<<<< HEAD
  },
  watch: {
    stock(value) {
      console.log(value);
    }
  },
  mounted() {
    // console.log("status");
    // console.log(this.lightSwitch);
=======
>>>>>>> c19ec011808a38ce0103788ee60ad34b6021d53d
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
