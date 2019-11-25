<template>
  <!-- Mestro Meny -->
  <v-col class="pa-0">
    <v-content class="content__btncontainer">
      <v-btn
        small
        icon
        :color="ticker ? '#48FFD5' : '#BBB'"
        title="Ticker"
        @click="toggleTicker"
      >
        <v-icon class="icon-flipped-y">mdi-dock-bottom</v-icon>
      </v-btn>
      <v-btn
        small
        icon
        :class="[{ div__disable: !jockey }]"
        :color="!table && jockey ? '#48FFD5' : '#BBB'"
        title="Maximize Table"
        @click="toggleTable"
      >
        <v-icon>mdi-window-maximize</v-icon>
      </v-btn>
      <v-btn
        small
        icon
        :color="sidebarboard ? '#48FFD5' : '#BBB'"
        title="Sidebar"
        @click="toggleSidebarBoard"
      >
        <v-icon>mdi-dock-right</v-icon>
      </v-btn>
      <!-- <div id="div__btn">
        <div
          id="btn__ticker"
          :class="{ div__hide: !ticker }"
          @click="toggleTicker"
        ></div>
        <div
          id="btn__tools"
          class="div__disable"
          :class="{ div__hide: !tools }"
          @click="toggleTools"
        ></div>
        <div
          id="btn__table"
          :class="[{ div__hide: !table }, { div__disable: !jockey }]"
          @click="toggleTable"
        ></div>
        <div id="btn__sidebar"></div>
        <div
          id="btn__sidebarboard"
          :class="{ div__hide: !sidebarboard }"
          @click="toggleSidebarBoard"
        ></div>
      </div> -->
    </v-content>

    <v-tabs height="30" color="#48FFD5" background-color="#00121e" dark>
      <v-tab
        :disabled="fullscreen"
        color="#fff"
        class="tab_menu-top text-capitalize subtitle-1"
        :href="`#tab-1`"
        @click="toggleJockey"
        >Jockey</v-tab
      >
      <v-tab
        color="#fff"
        class="tab_menu-top text-capitalize subtitle-1"
        :href="`#tab-2`"
        >Activity</v-tab
      >
      <v-tab
        disabled
        color="#fff"
        class="tab_menu-top text-capitalize subtitle-1"
        :href="`#tab-3`"
        >Trade</v-tab
      >

      <v-tab-item
        dark
        color="#48FFD5"
        background-color="black"
        :value="'tab-' + 1"
        style="background: #00121e;"
      >
        <Jockey v-show="jockey" />
      </v-tab-item>
      <v-tab-item
        dark
        color="#48FFD5"
        background-color="#00121e"
        :value="'tab-' + 2"
      >
        <v-container class="pa-0"> </v-container>
      </v-tab-item>
      <v-tab-item
        dark
        color="#48FFD5"
        background-color="#00121e"
        :value="'tab-' + 3"
      >
        <v-container class="pa-0"> </v-container>
      </v-tab-item>
    </v-tabs>
  </v-col>
</template>
<script>
import { mapActions } from "vuex";
import Jockey from "~/components/chart/Jockey";
export default {
  components: {
    Jockey
  },
  data() {
    return {
      ticker: true,
      sidebarboard: true,
      table: false,
      tools: true,
      maximize: false,
      fullscreen: false,
      jockey: false
    };
  },
  methods: {
    ...mapActions({
      setTicker: "chart/setTicker",
      setTable: "chart/setTable",
      setSidebar: "chart/setSidebar",
      setTableMaximize: "chart/setTableMaximize",
      setTableFullscreen: "chart/setTableFullscreen"
    }),
    toggleTicker: function() {
      this.ticker = !this.ticker;
      this.setTicker(this.ticker);
      this.$bus.$emit("adjustChartView");
    },
    toggleTools: function() {
      this.tools = !this.tools;
      // console.log(this.tools);
      console.log("test");
    },
    toggleTable: function() {
      if (this.maximize == true) {
        this.table = true;
        this.maximize = false;
        this.fullscreen = true;
      } else {
        this.fullscreen = false;
        this.maximize = true;
        this.table = false;
      }
      this.jockey = true;
      this.setTableFullscreen(this.table);
      this.$bus.$emit("adjustChartView");
    },
    toggleSidebarBoard: function() {
      this.sidebarboard = !this.sidebarboard;
      this.setSidebar(this.sidebarboard);
    },
    toggleJockey: function() {
      // default hide
      this.fullscreen = false;
      this.table = false;
      this.setTableFullscreen(this.table);
      // main event
      this.jockey = !this.jockey;
      this.maximize = !this.maximize;
      this.setTableMaximize(this.maximize);
      this.$bus.$emit("adjustChartView");
    }
  }
};
</script>

<style scoped>
.content__btncontainer {
  padding: 0px;
  position: absolute;
  right: 0;
  height: 30px;
  z-index: 1;
  width: 150px;
  margin-right: 5px;
  /* background: red; */
  text-align: right;
}
.icon-flipped-x {
  -o-transform: scaleX(-1);
  -moz-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  -ms-transform: scaleX(-1);
  transform: scaleX(-1);
}
.icon-flipped-y {
  -o-transform: scaleY(-1);
  -moz-transform: scaleY(-1);
  -webkit-transform: scaleY(-1);
  -ms-transform: scaleY(-1);
  transform: scaleY(-1);
}
.div__hide {
  /* background: #ddd !important; */
  color: #bbb;
  /* background: #0c1a2b !important;
  border: #48ffd5 1px solid !important; */
}
.div__disable {
  /* background: #37474f !important; */
  cursor: not-allowed !important;
  pointer-events: none;
}
#div__btn {
  height: 45px;
  width: 50px;
  margin-top: -10px;
}
#btn__ticker {
  position: absolute;
  height: 35%;
  width: 80%;
  background: #48ffd5;
  border: 1px solid #000;
  cursor: pointer;
}
#btn__tools {
  position: absolute;
  height: 94%;
  width: 20%;
  bottom: 0;
  background: #48ffd5;
  border: 1px solid #000;
  cursor: pointer;
}
#btn__sidebar {
  position: absolute;
  height: 72%;
  width: 20%;
  bottom: 0px;
  right: 0;
  /* background: #48ffd5; */
  border: 1px solid #000;
  background: #37474f;
  cursor: not-allowed;
}
#btn__table {
  position: absolute;
  height: 95%;
  width: 60%;
  bottom: 0;
  left: 20%;
  background: #48ffd5;
  border: 1px solid #000;
  cursor: pointer;
}
#btn__sidebarboard {
  position: absolute;
  width: 20%;
  right: 0;
  top: -10px;
  background: #48ffd5;
  border: 1px solid #000;
  cursor: pointer;
  height: 128%;
}
</style>
