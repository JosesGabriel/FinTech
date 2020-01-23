<template>
  <v-content>
    <span class="mx-3 mb-3 body-2">Available Funds 100,000,000.00</span>
    <v-row class="ma-0 mt-4 pa-0">
      <v-col class="col___left col-9 pa-0">
        <v-container class="d-flex flex-row pa-0">
          <v-card
            v-for="item in cardContent"
            :key="item.id"
            class="ml-4 pa-0"
            tile
            outlined
            min-width="165"
            min-height="70"
            :style="{ background: cardBackground }"
            :dark="lightSwitch == 1"
          >
            <v-card-text class="pa-0">
              <v-row class="ma-0">
                <v-col class="text-left pa-0 pl-2 pt-2">
                  <span
                    class="overline font-weight-bold"
                    :class="[
                      { 'black--text': lightSwitch == 0 },
                      { 'white--text': lightSwitch == 1 }
                    ]"
                    >{{ item.title }}</span
                  >
                </v-col>
              </v-row>
              <v-row class="ma-0">
                <v-col
                  class="text-right pa-0 pr-2 pt-2 body-1"
                  :class="[
                    { 'black--text': lightSwitch == 0 },
                    { 'white--text': lightSwitch == 1 }
                  ]"
                  ><span v-show="item.php" class="overline">PHP</span
                  >{{ item.amount }}</v-col
                >
              </v-row>
            </v-card-text>
          </v-card>
        </v-container>
      </v-col>
      <v-col class="col___right col-3 pa-0">
        <v-container class="d-flex flex-row-reverse pa-0 pt-10 pr-3">
          <v-btn
            small
            :color="lightSwitch == 1 ? 'lightchart' : 'darkchart'"
            outlined
            :dark="lightSwitch == 1"
            class="caption ml-2"
            >BUY</v-btn
          >
          <v-btn
            small
            :color="lightSwitch == 1 ? 'lightchart' : 'darkchart'"
            outlined
            :dark="lightSwitch == 1"
            class="caption"
            >SELL</v-btn
          >
        </v-container>
      </v-col>
    </v-row>
    <v-row class="ma-0 mt-1 pa-0">
      <v-col class="col-3 pa-0 ma-0">
        <v-content class="pa-0 ma-0 pt-3 px-4">
          <v-select
            :items="items"
            class="select__trade ma-0 pa-0"
            item-color="success"
            append-icon="mdi-chevron-down"
            background-color="success"
            label="Select Strategy"
            color="success"
            dense
            solo
          ></v-select>
          <v-select
            :items="items"
            class="select__trade ma-0 pa-0"
            item-color="success"
            append-icon="mdi-chevron-down"
            background-color="success"
            label="Select Trade Plan"
            color="success"
            dense
            solo
          ></v-select>
          <v-select
            :items="items"
            class="select__trade ma-0 pa-0"
            item-color="success"
            append-icon="mdi-chevron-down"
            background-color="success"
            label="Select Emotion"
            color="success"
            dense
            solo
          ></v-select>
        </v-content>
      </v-col>
      <v-col class="col-7">
        <v-content
          ><v-textarea
            outlined
            no-resize
            color="success"
            :dark="lightSwitch == 1"
            full-width
            height="110px"
            label="Notes"
          ></v-textarea
        ></v-content>
      </v-col>
      <v-col class="col-2 text-left">
        <br />
        <br />
        <br />
        <v-btn
          small
          color="success"
          :dark="lightSwitch == 1"
          class="caption mt-2"
          @click="setShowBrokers(true)"
          >ENTER</v-btn
        >
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "TradeView",
  data: () => ({
    cardContent: [
      { id: 1, title: "Price", amount: "10,000.00", php: true },
      { id: 2, title: "Quantity", amount: "10,000", php: false },
      { id: 3, title: "Total", amount: "1,000,000.00", php: true }
    ],
    items: ["test 1", "test 2"]
  }),
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    }),
    /**
     * Toggle between dark/light
     *
     * @return
     */
    cardBackground: function() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    }
  },
  methods: {
    ...mapActions({
      setShowBrokers: "chart/setShowBrokers"
    })
  }
};
</script>

<style></style>
