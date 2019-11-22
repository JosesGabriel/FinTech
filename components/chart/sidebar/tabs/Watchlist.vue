<template>
  <v-content>
    <v-content class="mt-1">
      <span class="caption ml-4 font-weight-bold white--text">Watchlist</span>
      <span class="float-right mr-4">
        <v-icon size="15" class="icon__add-watchlist" @click="addWatchlist"
          >mdi-plus-circle-outline</v-icon
        >
      </span>

      <v-content class="content__card-watchlist">
        <v-card
          v-for="(item, key) in items"
          :key="item.id"
          elevation="5"
          color="#0c1a2b"
          class="card__watchlist mb-1"
        >
          <v-card-text class="pa-0 px-2">
            <v-row class="ma-0">
              <!-- Container -->
              <v-col
                :id="`watch_${item.id}`"
                class="pa-0"
                :class="[columnStyle]"
              >
                <v-row class="ma-0">
                  <v-col
                    class="col__title pa-0 col-6 title white--text"
                    md="6"
                    sm="12"
                  >
                    <v-btn
                      small
                      color="#0c1a2b"
                      class="span__title"
                      @click="selectStock(item)"
                      @dblclick="showRemoveButton(item)"
                      >{{ item.title }}</v-btn
                    >
                  </v-col>
                  <v-col
                    class="col__value pa-0 col-6 text-right white--text"
                    md="6"
                    sm="12"
                  >
                    <div class="div__value">
                      {{ item.value | numeral("0,0.00") }}
                    </div>
                  </v-col>
                </v-row>
                <v-row class="ma-0">
                  <v-col
                    class="col_description py-0 col-7 overline"
                    md="6"
                    sm="12"
                  >
                    <span>{{
                      $globalMethod.limitDisplayString(
                        item.description,
                        10,
                        true
                      )
                    }}</span>
                  </v-col>
                  <v-col
                    class="col__volume py-0 col-5 text-right caption"
                    md="6"
                    sm="12"
                  >
                    <v-content>
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
                    </v-content>
                  </v-col>
                </v-row>
              </v-col>
              <!-- Remove button -->

              <v-col
                :id="`show_${item.id}`"
                class="pa-0 text-center showColumnStyle"
                style="display:none"
              >
                <v-icon size="15" @click="confirmRemove(key)"
                  >mdi-minus-circle-outline</v-icon
                >
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-content>
    </v-content>
  </v-content>
</template>

<script>
export default {
  name: "Watchlist",
  data() {
    return {
      showColumn: false,
      columnStyle: "col-12",
      items: [
        {
          id: 1,
          title: "JFC",
          description: "Jollibee Foods Corp.",
          value: "232.23",
          volume: "-0.20(0.10%)",
          changetype: 2
        },
        {
          id: 2,
          title: "PAL",
          description: "Pal Holdings Inc.",
          value: "31.23",
          volume: "0.20(0.09%)",
          changetype: 1
        },
        {
          id: 3,
          title: "IRC",
          description: "Infradev Holdings Inc.",
          value: "442.2",
          volume: "-0.20(0.90%)",
          changetype: 2
        },
        {
          id: 4,
          title: "JAS",
          description: "Jaskstone Inc.",
          value: "561.23",
          volume: "0.20(0.09%)",
          changetype: 1
        }
      ]
    };
  },
  methods: {
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
    selectStock: stock => {
      console.log("stock selected");
      console.log(stock);
    }
  }
};
</script>

<style scoped>
.icon__add-watchlist {
  cursor: pointer;
}
.content__card-watchlist {
  height: calc(100vh - 315px);
  overflow-x: auto;
}
.card__watchlist {
  /* cursor: pointer; */
}
.v-card__text {
  /* line-height: 0.375rem; */
}
.col__title {
}
.col__value {
}
.col_description {
}
.col__volume {
}
.span__title {
  cursor: pointer;
}
.watchColumnStyle {
  background: #24333c;
}
.showColumnStyle {
  margin-top: auto;
  margin-bottom: auto;
}
.div__value {
  line-height: 2;
  margin-right: 14px;
  margin-top: 10px;
}
.increase {
  color: #48ffd5 !important;
}
.decrease {
  color: #ff4848 !important;
}
</style>
