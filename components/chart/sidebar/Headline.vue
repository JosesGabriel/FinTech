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
        <v-content>
          <span class="font-weight-bold title">{{ displaytitle }}</span>
        </v-content>
        <v-content>
          <span class="headline">{{ stock.last }}</span>
          <span
            class="subtitle-2"
            :class="[
              { increase: changetype == 1 },
              { decrease: changetype == 2 }
            ]"
            >{{ stock.change }}({{ stock.changepercentage }})</span
          >
        </v-content>
        <v-content class="mt-0">
          <span class="caption"
            >Market Capitalization: {{ stock.marketcap }}</span
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
    displaytitle() {
      if (this.stock.description == undefined) {
        return "";
      }
      let str = this.stock.description;
      return str.length > 16 ? str.substring(0, 16) + "..." : str;
    },
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
.neutral{
  color: gold !important;
}
</style>
