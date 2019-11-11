<template>
  <v-content class="template row-content ml-4 mb-2">
    <v-row class="ma-0 row-1">
      <v-col :class="colLabel">PREVIOUS</v-col>
      <v-col :class="colValue">1.56</v-col>
      <v-col :class="colLabel">OPEN</v-col>
      <v-col :class="colValue" class="increase">1.61</v-col>
    </v-row>
    <v-row class="ma-0 row-2">
      <v-col :class="colLabel">LOW</v-col>
      <v-col :class="colValue" class="increase">1.56</v-col>
      <v-col :class="colLabel">HIGH</v-col>
      <v-col :class="colValue" class="increase">1.61</v-col>
    </v-row>
    <v-row class="ma-0 row-3">
      <v-col :class="colLabel">52WKLOW</v-col>
      <v-col :class="colValue" class="decrease">1.56</v-col>
      <v-col :class="colLabel">52WKHIGH</v-col>
      <v-col :class="colValue" class="increase">1.61</v-col>
    </v-row>
    <v-row class="ma-0 row-4">
      <v-col :class="colLabel">VOLUME</v-col>
      <v-col :class="colValue">1.56</v-col>
      <v-col :class="colLabel">VALUE</v-col>
      <v-col :class="colValue">19.59M</v-col>
    </v-row>
    <v-row class="ma-0 row-5">
      <v-col :class="colLabel">TRADES</v-col>
      <v-col :class="colValue">1.56</v-col>
      <v-col :class="colLabel">AVERAGE</v-col>
      <v-col :class="colValue" class="increase">1.61</v-col>
    </v-row>
  </v-content>
</template>

<script>
export default {
  name: "Status",
  data() {
    return {
      colLabel: "col-3 pa-0",
      colValue: "col-3 pa-0 white--text"
    };
  }
};
</script>

<style scoped>
.template {
  font-size: x-small;
}
.increase {
  color: #48ffd5 !important;
}
.decrease {
  color: #ff4848 !important;
}
.row-content {
  height: 60px;
}
.row-1 {
  position: absolute;
  top: 0px;
  width: 100%;
}
.row-2 {
  position: absolute;
  top: 11px;
  width: 100%;
}
.row-3 {
  position: absolute;
  top: 22px;
  width: 100%;
}
.row-4 {
  position: absolute;
  top: 33px;
  width: 100%;
}
.row-5 {
  position: absolute;
  top: 44px;
  width: 100%;
}
</style>
