<template>
  <v-col class="pa-0">
    <v-content class="content__vynduebutton pl-2">
        <img class="img__vyndue" src="/icon/vyndue2.svg" title="Vyndue" @click="showVyndueChat"></img
      >
    </v-content>
    <!---------------->
    <!--<template>
      <v-container :class="this.show ? 'display' : 'no_display' " class="vyndue__chat">
          <ChatClient @showChat="ShowDialog"/>
      </v-container>
    </template>-->
    <!---------------->
    <v-content class="content__btncontainer">
      
    <v-btn
        v-show="maximize && !fullscreen"
        small
        icon
        color="success"
        :class="[{ button__disable: !maximize && !fullscreen }]"
        title="Hide"
        @click="toggleTabs(activeTab)"
      >
        <v-icon>mdi-chevron-double-down</v-icon>
       
      </v-btn>


      <v-btn
        v-show="maximize || fullscreen"
        small
        icon
        color="success"
        :class="[{ button__disable: !maximize && !fullscreen }]"
        :title="fullscreen ? 'Minimize' : 'Maximize'"
        @click="toggleTabsFullscreen"
      >
        <v-icon>    
            {{ fullscreen ? 'mdi-chevron-down-box' : 'mdi-chevron-up-box' }}
        </v-icon>
       
      </v-btn>

      <v-btn
        v-show="false"
        small
        icon
        :color="ticker ? 'success' : '#BBB'"
        title="Ticker"
        @click="toggleTicker"
      >
        <v-icon class="icon-flipped-y">mdi-dock-bottom</v-icon>
      </v-btn>

      <v-btn
        small
        icon
        :color="sidebarboard ? 'success' : '#b6b6b6'"
        title="Sidebar"
        @click="toggleSidebarBoard"
      >
        <v-icon>mdi-dock-right</v-icon>
      </v-btn>
    </v-content>

    <v-tabs
      height="30"
      color="success"
      class="table__tabs"
      :background-color="lightSwitch == 0 ? 'lightchart' : 'darkchart'"
      :dark="lightSwitch == true"
    >
      <v-tab
        v-for="item in tabsContent"
        :key="item.id"
        :href="`#tab-${item.id}`"
        class="text-capitalize subtitle-1"
        style="font-size: .8rem !important;"
        :disabled="item.disabled"
        @click="toggleTabs(item.id)"
      >
        {{ item.title }}
      </v-tab>

      <v-tab-item
        v-for="item in tabsContent"
        :key="item.id"
        :value="`tab-${item.id}`"
        :style="{ background: cardBackground }"
      >
        <component :is="item.component" v-show="tabsShow" />
      </v-tab-item>
    </v-tabs>
  </v-col>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Jockey from "~/components/chart/table/Jockey";
import Activity from "~/components/chart/table/Activity";
import Trade from "~/components/chart/table/Trade";
// FIXME  removed because of access token error import ChatClient from "~/components/modals/VyndueChatClient";

export default {
  components: {
    Jockey,
    Activity,
    Trade,
  },
  data() {
    return {
      tabsShow: false,
      activeTab: 0,
      tabsContent: [
        {
          id: 1,
          icon: "mdi-cash-usd-outline",
          title: "Jockey",
          component: "Jockey",
          disabled: true
        },
        {
          id: 2,
          icon: "mdi-format-list-bulleted-square",
          title: "Activity",
          component: "Activity",
          disabled: true
        },
        {
          id: 3,
          icon: "mdi-card-search-outline",
          title: "Trade",
          component: "Trade",
          disabled: true
        }
      ],
      show: false,
    };
  },
  mounted(){
      this.hideTicker();
  },
  computed: {
    ...mapGetters({
      ticker: "chart/getTicker",
      maximize: "chart/getTableMaximize",
      fullscreen: "chart/getTableFullscreen",
      sidebarboard: "chart/getSidebar",
      lightSwitch: "global/getLightSwitch",
      index: "chart/index"
    }),
    /**
     * toggle card background dark/light
     *
     * @return  {String} 
     */
    cardBackground() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    }
  },
  watch: {
      /**
     * check if stock selected is index
     *
     * @param   {Boolean}  value  true/false
     *
     * @return 
     */
    index(value){
        this.tabsContent.forEach((val, key) => {
            this.tabsContent[key].disabled = value;
        });
        // close the table tabs
        if(value===true){
            if(this.maximize){
                this.toggleTabs(this.activeTab);
            }
        }
    }
  },
  methods: {
    ...mapActions({
      setTicker: "chart/setTicker",
      setSidebar: "chart/setSidebar",
      setTable: "chart/setTable",
      setTableMaximize: "chart/setTableMaximize",
      setTableFullscreen: "chart/setTableFullscreen"
    }),
    /**
     * show/hide ticker via bus emit
     *
     * @return 
     */
    toggleTicker() {
      this.setTicker(!this.ticker);
      this.$bus.$emit("adjustChartView");
    },
    /**
     * show/hide sidebar
     *
     * @return 
     */
    toggleSidebarBoard() {
      this.setSidebar(!this.sidebarboard);
    },
    /**
     * toggle tabs in sidebar
     *
     * @param   {String}  tab  tab string name
     *
     * @return  
     */
    toggleTabs(tab) {
      if (this.fullscreen) return;
      if (this.activeTab == tab || this.maximize == false) {
        this.tabsShow = !this.tabsShow;
        this.setTableMaximize(!this.maximize);
        this.$bus.$emit("adjustChartView");
      }
      this.activeTab = tab;
    },
    /**
     * hide ticker upon load
     * // TODO 
     * @return 
     */
    hideTicker(){
      this.setTicker(false);
      this.$bus.$emit("adjustChartView");
    },
    /**
     * toggle view fullscreen of table component
     *
     * @return 
     */
    toggleTabsFullscreen() {
      this.setTableFullscreen(!this.fullscreen);
      this.$bus.$emit("adjustChartView");
    },
    showVyndueChat: function() {
      if(this.show ? this.show = false : this.show = true);
    },
    ShowDialog(value) {
      this.show = value;
    },
  }
};
</script>

<style>
.table__tabs .v-slide-group__wrapper {
  padding-left: 55px !important;
}
</style>

<style scoped>
.img__vyndue {
  margin-top:6px;
  height: 20px;
  cursor: pointer;
  padding-left: 10px;
}
.content__vynduebutton {
  height: 30px;
  width: 55px;
  position: absolute;
  z-index: 9;
}
.content__btncontainer {
  padding: 0px;
  position: absolute;
  right: 0;
  height: 30px;
  z-index: 1;
  width: 150px;
  margin-right: 5px;
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
.button__disable {
  cursor: not-allowed !important;
  pointer-events: none;
}
.no_display {
  display: none;
}
.display {
  display: block;
}
.vyndue__chat {
  position: fixed;
  bottom: 5%;
  left: 40px;
  width: 500px;
  z-index: 3;
}
</style>
