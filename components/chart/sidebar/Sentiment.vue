<template>
  <v-content class="pa-0 my-0 mx-4 text-center">
    <div class="mt-3 body-2">Members Sentiment</div>
    <v-row>
      <v-col class="col-2 py-0">
        <v-img
          class="bull-circle"
          width="30px"
          height="30px"
          src="/Icon/chart/bull-circle.svg"
        ></v-img
      ></v-col>
      <v-col class="col-8 pa-0">
        <v-progress-linear
          background-color="error"
          color="#48FFD5"
          value="70"
          rounded
          height="10"
          class="mt-2"
        ></v-progress-linear>
        <v-content>
          <span class="float-left overline">70.00%</span>
          <span class="float-right overline">30.00%</span>
        </v-content>
      </v-col>
      <v-col class="col-2 py-0"
        ><v-img
          class="bear-circle"
          width="30px"
          height="30px"
          src="/Icon/chart/bear-circle.svg"
        ></v-img
      ></v-col>
    </v-row>
  </v-content>
</template>

<script>
export default {
  name: "Sentiment"
};
</script>

<style scoped>
.header {
  widows: 100%;
  background: grey;
  text-align: center;
  margin-top: 10px;
  font-size: 12px;
}
</style>
