<template>
  <v-content class="template text-center">
    <div class="header">Members Sentiment</div>
    <v-row class="ma-0 px-4">
      <v-col class="col-2 pa-0">
        <v-content class="bull-circle ml-1">
          <v-img width="30px" height="30px" src="/Icon/chart/bull-circle.svg">
          </v-img></v-content
      ></v-col>
      <v-col class="col-8 pa-0">
        <v-content class="progress">
          <v-progress-linear
            background-color="error"
            color="#48FFD5"
            value="70"
            height="5"
            class="mt-3"
          ></v-progress-linear>
          <v-content>
            <span class="float-left">70.00%</span>
            <span class="float-right">30.00%</span>
          </v-content>
        </v-content>
      </v-col>
      <v-col class="col-2 pa-0">
        <v-content class="bear-circle">
          <v-img
            width="30px"
            height="30px"
            src="/Icon/chart/bear-circle.svg"
          ></v-img
        ></v-content>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
export default {
  name: "Sentiment"
};
</script>

<style scoped>
.template {
  font-size: xx-small;
  color: #fff;
}
.header {
  text-align: center;
  font-size: 11px;
}
.progress {
  padding: 0px;
  width: 130px;
  margin-left: auto;
  margin-right: auto;
  font-size: 10px;
}
.bull-circle {
}
.bear-circle {
}
</style>
