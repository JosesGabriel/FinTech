<template>
  <v-content
    class="template"
    :class="[
      { darkmode__text: lightSwitch },
      { lightmode__text: !ligthSwitch }
    ]"
  >
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
          color="success"
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
import { mapGetters } from "vuex";

export default {
  name: "Sentiment",
  methods: {
    bearCircle: function() {
      console.log("bear");
    },
    bullCircle: function() {
      console.log("bull");
    }
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    })
  }
};
</script>

<style scoped>
.lightmode__text {
  color: #494949;
}
.darkmode__text {
  color: #e5e5e5;
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
  flex: 0 0 190px;
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
  font-size: 9px;
}
</style>
