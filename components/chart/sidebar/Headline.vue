<template>
  <v-content class="template">
    <div id="headline">
      <div class="headline__arrow">
        <v-content>
          <v-icon v-show="changetype == 1" size="60" class="arrow-icon increase"
            >mdi-chevron-up</v-icon
          >
          <v-icon v-show="changetype == 2" size="60" class="arrow-icon decrease"
            >mdi-chevron-down</v-icon
          >
        </v-content>
      </div>
      <div
        class="headline_description"
        :class="[
          { darkmode__text: lightSwitch == 1 },
          { lightmode__text: lightSwitch == 0 }
        ]"
      >
        <div class="hcontainer_top">
          <span class="htitle">{{
            $globalMethod.limitDisplayString(stock.description, 18, true)
          }}</span>
        </div>
        <div class="hcontainer_mid">
          <span class="hlast">{{ stock.last | numeral("0,0.00") }}</span>
          <span
            class="hchange"
            :class="[
              { increase: changetype == 1 },
              { decrease: changetype == 2 }
            ]"
            >{{ stock.change | numeral("0.00a") }} ({{
              stock.changepercentage | numeral("0.00a")
            }}%)</span
          >
        </div>
        <div class="hcontainer_bot">
          <span class="hmarcap"
            >Market Capitalization:
            <span class="hmarcap text-uppercase font-weight-bold">{{
              stock.marketcap | numeral("0.000a")
            }}</span></span
          >
        </div>
      </div>
    </div>
  </v-content>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Headline",
  computed: {
    ...mapGetters({
      stock: "chart/stock",
      lightSwitch: "global/getLightSwitch"
    }),
    changetype() {
      let value = this.stock.change;
      if (value > 0) {
        return 1;
      } else if (value < 0) {
        return 2;
      } else {
        return 0;
      }
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
div {
  margin: 0;
  padding: 0;
}
.htitle {
  font-size: 16px;
}
.hlast {
  font-size: 22px;
}
.hchange {
  font-size: 14px;
}
.hmarcap {
  font-size: 11px;
}
.template {
  /* font-size: x-small; */
  color: #fff;
  /* font-family: 'Karla', sans-serif !important; */
}
.hcontainer_top {
  margin-top: 2px;
}
.hcontainer_mid {
  margin-top: -7px;
}
.hcontainer_bot {
  margin-top: -10px;
}
.arrow-icon {
  position: absolute;
  right: 40%;
  left: 60%;
  top: -5px;
}
.increase {
  color: #03dac5 !important;
}
.decrease {
  color: #f44336 !important;
}
#headline {
  display: flex;
  /* height: 70px; */
}
.headline__arrow {
  flex: 0 0 60px;
  /* background: red; */
}
.headline_description {
  flex: 0 0 210px;
  /* background: blue; */
}
</style>
