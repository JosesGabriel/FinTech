<template>
  <v-content class="template">
    <v-row class="ma-0 ml-4 mt-1 mb-1">
      <v-col class="col-3 pa-0">
        <!-- arrow -->
        <v-content>
          <v-icon v-show="changetype == 1" size="80" class="arrow-icon increase"
            >mdi-chevron-up</v-icon
          >
          <v-icon v-show="changetype == 2" size="80" class="arrow-icon decrease"
            >mdi-chevron-down</v-icon
          >
        </v-content>
      </v-col>

      <v-col class="col-9 pa-0">
        <v-content class="content__title">
          <span class="font-weight-bold title">{{
            $globalMethod.limitDisplayString(stock.description, 16, true)
          }}</span>
        </v-content>
        <v-content class="content__headline">
          <span class="headline ma-0">{{
            stock.last | numeral("0,0.00")
          }}</span>
          <span
            class="subtitle-2"
            :class="[
              { increase: changetype == 1 },
              { decrease: changetype == 2 }
            ]"
            >{{ stock.change | numeral("0.00") }}% ({{
              stock.changepercentage | numeral("0.00")
            }}%)</span
          >
        </v-content>
        <v-content class="mt-0">
          <span class="caption"
            >Market Capitalization:
            <span class="text-uppercase font-weight-bold">{{
              stock.marketcap | numeral("0.000a")
            }}</span></span
          >
        </v-content>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Headline",
  computed: {
    ...mapGetters({
      stock: "chart/stock"
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
.template {
  font-size: x-small;
  color: #fff;
}
.row {
  line-height: 1.6 !important;
}
.arrow-icon {
  position: absolute;
  right: 50%;
  left: 50%;
  top: -15px;
}
.increase {
  color: #48ffd5 !important;
}
.decrease {
  color: #ff4848 !important;
}
@media (max-width: 1800px) {
  .template {
    font-size: calc(9px + 0.1vw) !important;
  }
}
@media (max-width: 1280px) {
  .title {
    font-size: calc(18px - 0.2vw) !important;
  }
  .headline {
    font-size: calc(24px - 0.2vw) !important;
  }
  .subtitle-2 {
    font-size: calc(14px - 0.2vw) !important;
  }
  .content__title {
    height: 25px !important;
  }
  .content__headline {
    height: 25px !important;
  }
}
</style>
