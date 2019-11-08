<template>
  <v-content class="template">
    <v-row class="ma-0 ml-4 mt-2 mb-3">
      <v-col class="col-3 pa-0">
        <!-- arrow -->
        <v-content class="arrow-icon">
          <v-img src="/Icon/chart/up-arrow.svg"></v-img>
        </v-content>
      </v-col>

      <v-col class="col-9 pa-0">
        <v-content>
          <span class="head">PHILIPPINE INFRA...</span>
        </v-content>
        <v-content class="price">
          <span>15.01</span>
          <span class="changeperc increase">-0.03(1.95%)</span>
        </v-content>
        <v-content class="marcap">
          <span class="">Market Capitalization: 9.517B</span>
        </v-content>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
export default {
  name: "Headline"
};
</script>

<style scoped>
.template {
  font-size: x-small;
  color: #fff;
}
.arrow-icon {
  margin-top: -8px;
}
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
.increase {
  color: #48ffd5;
}
.decrease {
  color: #ff4848;
}
</style>
