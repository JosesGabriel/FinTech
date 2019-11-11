<template>
  <v-content>
    <v-content class="mt-1">
      <span class="caption ml-4 font-weight-bold white--text">Watchlist</span>
      <span class="float-right mr-4">
        <v-icon size="15" class="icon__add-watchlist" @click="addWatchlist"
          >add_circle_outline</v-icon
        >
      </span>
      <v-divider></v-divider>
      <v-content class="content__card-watchlist">
        <v-card
          v-for="item in items"
          :key="item.id"
          elevation="5"
          color="#0b1f33"
          class="card__watchlist"
          @dblclick="showRemoveButton(this)"
        >
          <v-card-text class="pa-2 mt-1">
            <v-row class="ma-0">
              <!-- Container -->
              <v-col class="pa-0" :class="[columnStyle, tableStyle]">
                <v-row class="ma-0">
                  <v-col class="col__title py-0 col-7 title white--text">{{
                    item.title
                  }}</v-col>
                  <v-col class="col__value py-0 col-5 text-right white--text">{{
                    item.value
                  }}</v-col>
                </v-row>
                <v-row class="ma-0">
                  <v-col class="col_description py-0 col-7 overline">{{
                    item.description
                  }}</v-col>
                  <v-col class="col__volume py-0 col-5 text-right caption">
                    <v-icon
                      v-show="item.changetype == 1"
                      class="float-left increase"
                      right=""
                      >keyboard_arrow_up</v-icon
                    >
                    <span
                      v-show="item.changetype == 1"
                      class="float-right increase"
                      >{{ item.volume }}</span
                    >
                    <v-icon
                      v-show="item.changetype == 2"
                      class="float-left decrease"
                      right=""
                      >keyboard_arrow_down</v-icon
                    >
                    <span
                      v-show="item.changetype == 2"
                      class="float-right decrease"
                      >{{ item.volume }}</span
                    >
                  </v-col>
                </v-row>
              </v-col>
              <!-- Remove button -->
              <v-col v-show="showColumn" class="col-1 pa-0 text-center">
                <v-icon size="15" @click="confirmRemove"
                  >remove_circle_outline</v-icon
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
          volume: "23322.23",
          changetype: 2
        },
        {
          id: 2,
          title: "PAL",
          description: "Pal Holdings Inc.",
          value: "232.23",
          volume: "23322.23",
          changetype: 1
        },
        {
          id: 3,
          title: "IRC",
          description: "Infradev Holdings Inc.",
          value: "232.23",
          volume: "23322.23",
          changetype: 2
        },
        {
          id: 4,
          title: "JAS",
          description: "Jaskstone Inc.",
          value: "232.23",
          volume: "23322.23",
          changetype: 1
        }
      ]
    };
  },
  computed: {
    tableStyle: function() {
      return {
        tableColumnStyle: this.showColumn == true
      };
    }
  },
  methods: {
    showRemoveButton: function(val) {
      console.log(val);
      this.columnStyle = this.showColumn ? "col-12" : "col-11";
      this.showColumn = !this.showColumn;
    },
    confirmRemove: function() {
      if (confirm("Are you sure to remove this stock?")) {
        console.log("removed");
      }
    },
    addWatchlist: function() {
      console.log("add new watchlist");
    }
  }
};
</script>

<style scoped>
.icon__add-watchlist {
  cursor: pointer;
}
.content__card-watchlist {
  height: 360px;
  overflow-x: auto;
}
.card__watchlist {
  cursor: pointer;
}
.v-card__text {
  /* line-height: 0.375rem; */
}
.col__title {
}
.col__value {
  vertical-align: bottom;
}
.col_description {
}
.col__volume {
}
.tableColumnStyle {
  background: #24333c;
}
</style>
