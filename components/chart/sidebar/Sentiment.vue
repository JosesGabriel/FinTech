<template>
  <v-content class="template">
    <div id="sentiment__caption">Members Sentiment</div>
    <div id="sentiment__container">
      <div id="bull__container">
        <v-img
          class="bull-circle"
          src="/icon/chart/bull-circle.svg"
          @click="bullCircle"
        >
        </v-img>
      </div>
      <div id="prgbr__container">
        <v-progress-linear
          background-color="error"
          color="#48FFD5"
          value="70"
          height="5"
          class="mt-3"
        ></v-progress-linear>
        <v-content>
          <span class="float-left percentage">70.00%</span>
          <span class="float-right percentage">30.00%</span>
        </v-content>
      </div>
      <div id="bear__container">
        <v-img
          class="bear-circle"
          src="/icon/chart/bear-circle.svg"
          @click="bearCircle"
        ></v-img>
      </div>
    </div>
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
  height: 30px;
  width: 30px;
  margin-left: 20px;
}
.bear-circle {
  cursor: pointer;
  height: 30px;
  width: 30px;
}
#sentiment__container {
  display: flex;
}
#bull__container {
  flex: 0 0 50px;
  /* background: red; */
}
#bear__container {
  flex: 0 0 50px;
  /* background: blue; */
}
#prgbr__container {
  flex: 0 0 170px;
  /* background: green; */
  padding-left: 5px;
  padding-right: 5px;
}
#sentiment__caption {
  width: 100%;
  margin-top: 10px;
  text-align: center;
  font-size: 11px;
}
.percentage {
  font-size: 8px;
}
</style>
