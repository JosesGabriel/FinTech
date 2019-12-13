<template>
  <v-content>
    <div
      class="sub__title"
      :class="[
        { 'black--text': lightSwitch == 0 },
        { 'white--text': lightSwitch == 1 }
      ]"
    >
      <div class="title__left">Watchlist</div>
      <div class="title__right">
        <v-icon size="15" class="icon__add-watchlist" @click="addWatchlist"
          >mdi-plus-circle-outline</v-icon
        >
      </div>
    </div>
    <v-card
      :dark="lightSwitch == 1"
      :color="lightSwitch == 0 ? 'lightchart' : 'darkchart'"
      :loading="loading"
      :max-height="`calc(100vh - ${responsive_height - 170}px)`"
      style="overflow-y: auto;"
      class="mt-2 mr-2"
      flat
      tile
    >
      <v-card
        v-for="(item, key) in items"
        :id="`watch__${item.id}`"
        :key="item.id"
        tile
        flat
        :color="onHoverEffect(item.color)"
        class="mb-1 pt-1"
        @mouseover.native="item.color = true"
        @mouseleave.native="item.color = false"
      >
        <div class="watchlist__top">
          <div class="top__left pl-2">
            <span
              class="span__symbolid"
              @click="setSymbolID(item.id)"
              @dblclick="showRemoveButton(item)"
              >{{ item.title }}</span
            >
          </div>
          <div class="top__right pr-2">
            <span class="">{{ item.value | numeral("0,0.00") }}</span>
          </div>
        </div>
        <div class="watchlist__bottom">
          <div class="bottom__left pl-2">
            <span
              class="text-uppercase"
              :class="[
                { darkmode__text: lightSwitch == 1 },
                { lightmode__text: lightSwitch == 0 }
              ]"
              >{{
                $globalMethod.limitDisplayString(item.description, 18, true)
              }}</span
            >
          </div>
          <div class="bottom__right pr-2">
            <span
              ><v-icon v-show="item.changetype == 1" class="increase"
                >mdi-chevron-up</v-icon
              ><v-icon v-show="item.changetype == 2" class="decrease"
                >mdi-chevron-down</v-icon
              >
            </span>
            <span
              :class="[
                {
                  increase: item.changetype == 1,
                  decrease: item.changetype == 2
                }
              ]"
              >{{ item.volume }}</span
            >
          </div>
        </div>
      </v-card>
    </v-card>
  </v-content>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Watchlist",
  data() {
    return {
      loading: false,
      showColumn: false,
      columnStyle: "col-12",
      items: [
        {
          id: "29235363595681792",
          title: "JFC",
          description: "Jollibee Foods Corp.",
          value: "232.23",
          volume: "-0.20(0.10%)",
          changetype: 2,
          color: false
        },
        {
          id: "29235365000773632",
          title: "PAL",
          description: "Pal Holdings Inc.",
          value: "31.23",
          volume: "0.20(0.09%)",
          changetype: 1,
          color: false
        }
        // {
        //   id: 3,
        //   title: "IRC",
        //   description: "Infradev Holdings Inc.",
        //   value: "442.2",
        //   volume: "-0.20(0.90%)",
        //   changetype: 2
        // },
        // {
        //   id: 4,
        //   title: "JAS",
        //   description: "Jaskstone Inc.",
        //   value: "561.23",
        //   volume: "0.20(0.09%)",
        //   changetype: 1
        // }
      ]
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch",
      responsive_height: "chart/responsive_height"
    }),
    cardbackground: function() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    }
  },
  methods: {
    onHoverEffect: function(value) {
      if (value == true) {
        return "rgb(182, 182, 182, 0.2)";
        //return this.lightSwitch == 0 ? "#e6e6e6" : "#142a46";
      }
    },
    showRemoveButton: function(item) {
      //   this.showColumn = !this.showColumn;
      //   let watch = document.getElementById(`watch_${item.id}`);
      //   let show = document.getElementById(`show_${item.id}`);
      //   if (this.showColumn) {
      //     watch.classList.remove("col-12");
      //     watch.classList.add("col-11");
      //     watch.classList.add("watchColumnStyle");
      //     show.style.display = "block";
      //   } else {
      //     watch.classList.add("col-12");
      //     watch.classList.remove("watchColumnStyle");
      //     show.style.display = "none";
      //   }
    },
    confirmRemove: function(item) {
      if (confirm("Are you sure to remove this stock?")) {
        //   console.log(item);
        this.$delete(this.items, item);
        //  console.log("removed");
      }
    },
    addWatchlist: function() {
      // console.log("add new watchlist");
      //this.$router.push("/watchlist");
      let routeData = this.$router.resolve({
        name: "watchlist"
        //query: { data: "someData" }
      });
      window.open(routeData.href, "_blank");
    },
    changeStock: stock => {
      // console.log("stock selected");
      // console.log(stock.id);
    },
    ...mapActions({
      setSymbolID: "chart/setSymbolID"
    })
  }
};
</script>

<style scoped>
.theme--light.v-card {
  background-color: #f2f2f2;
  color: rgba(0, 0, 0, 0.87);
}

.theme--dark.v-card {
  background-color: #00121e;
  color: #fff;
}

.sub__title {
  display: flex;
}
.title__left {
  flex: 0 0 130px;
}
.title__right {
  flex: 0 0 125px;
  text-align: right;
  font-size: 11px;
}
.watchlist__top {
  display: flex;
  font-size: 11px;
}

.watchlist__top :hover {
  /* background: red; */
}

.top__left {
  flex: 0 0 136px;
  font-size: 16px;
}
.top__right {
  flex: 0 0 136px;
  text-align: right;
  font-size: 14px;
}
.watchlist__bottom {
  display: flex;
}
.bottom__left {
  flex: 0 0 136px;
  color: #bbb;
  font-size: 11px;
  margin-top: -4px;
}
.span__symbolid {
  cursor: pointer;
}
.bottom__right {
  flex: 0 0 136px;
  text-align: right;
  margin-top: -4px;
}
.icon__add-watchlist {
  cursor: pointer;
}
.content__card-watchlist {
  /* ${responsive_height - 175} */
  height: calc(100vh - 335px);
  overflow-x: auto;
}
.hoverwatch {
  background: pink !important;
}
.increase {
  color: #03dac5 !important;
  font-size: 11px;
}
.decrease {
  color: #f44336 !important;
  font-size: 11px;
}
.lightmode__text {
  color: #494949;
}
.darkmode__text {
  color: #e5e5e5;
}
</style>
