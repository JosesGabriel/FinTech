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
          <span class="font-weight-bold title">PHILIPPINE INFRA...</span>
        </v-content>
        <v-content>
          <span class="headline">15.01</span>
          <span
            class="subtitle-2"
            :class="[
              { increase: changetype == 1 },
              { decrease: changetype == 2 }
            ]"
            >-0.03(1.95%)</span
          >
        </v-content>
        <v-content class="mt-0">
          <span class="caption">Market Capitalization: 9.517B</span>
        </v-content>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
export default {
  name: "Headline",
  data() {
    return {
      changetype: 1
    };
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
/*

.head {
  font-size: 16px;
  position: absolute;
  top: 4px;
}
.price {
  position: absolute;
  top: 30px;
  font-size: 26px;
}
.changeperc {
  font-size: 14px;
}
.marcap {
  padding: 0px;
  position: absolute;
  top: 48px;
}
*/
.increase {
  color: #48ffd5;
}
.decrease {
  color: #ff4848;
}
</style>
