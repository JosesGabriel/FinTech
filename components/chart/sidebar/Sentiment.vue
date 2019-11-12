<template>
  <v-content class="template text-center">
    <div class="caption">Members Sentiment</div>
    <v-row class="ma-0 px-4">
      <v-col class="col-2 pa-0">
        <v-content class="float-right">
          <v-img
            class="bull-circle"
            src="/icon/chart/bull-circle.svg"
            @click="bullCircle"
          >
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
      <v-col class="col-2 pa-0 float-left">
        <v-content class="float-left">
          <v-img
            class="bear-circle"
            width="35px"
            height="35px"
            src="/Icon/chart/bear-circle.svg"
            @click="bearCircle"
          ></v-img
        ></v-content>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
export default {
  name: "Sentiment",
  methods: {
    bearCircle: function() {
      console.log("bear");
    },
    bullCircle: function() {
      console.log("bull");
    }
  }
};
</script>

<style scoped>
.template {
  font-size: xx-small;
  color: #fff;
}
.header {
  text-align: center;
}
.progress {
  padding: 0px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  font-size: 10px;
}
.bull-circle {
  cursor: pointer;
}
.bear-circle {
  cursor: pointer;
}
</style>
