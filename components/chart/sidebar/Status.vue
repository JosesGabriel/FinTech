<template>
  <v-content class="pa-0 my-0 ml-9 mt-2">
    <v-row class="ma-0 pa-0">
      <v-col :class="colStyle">PREVIOUS</v-col>
      <v-col :class="colStyle">1.56</v-col>
      <v-col :class="colStyle">OPEN</v-col>
      <v-col :class="colStyle">1.61</v-col>
    </v-row>
    <v-row class="ma-0 pa-0">
      <v-col :class="colStyle">LOW</v-col>
      <v-col :class="colStyle">1.56</v-col>
      <v-col :class="colStyle">HIGH</v-col>
      <v-col :class="colStyle">1.61</v-col>
    </v-row>
    <v-row class="ma-0 pa-0">
      <v-col :class="colStyle">52WKLOW</v-col>
      <v-col :class="colStyle">1.56</v-col>
      <v-col :class="colStyle">52WKHIGH</v-col>
      <v-col :class="colStyle">1.61</v-col>
    </v-row>
    <v-row class="ma-0 pa-0">
      <v-col :class="colStyle">VOLUME</v-col>
      <v-col :class="colStyle">1.56</v-col>
      <v-col :class="colStyle">VALUE</v-col>
      <v-col :class="colStyle">1.61</v-col>
    </v-row>
    <v-row class="ma-0 pa-0">
      <v-col :class="colStyle">TRADES</v-col>
      <v-col :class="colStyle">1.56</v-col>
      <v-col :class="colStyle">AVERAGE</v-col>
      <v-col :class="colStyle">1.61</v-col>
    </v-row>
  </v-content>
</template>

<script>
export default {
  name: "Status",
  data() {
    return {
      colStyle: "col-3 pa-0 caption"
    };
  }
};
</script>

<style></style>
