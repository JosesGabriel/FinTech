<template>
  <v-dialog v-model="show" max-width="320px">
    <v-card :dark="lightSwitch == true">
      <v-card-title
        class="text-left justify-left pa-3 px-5 success--text text-uppercase subtitle-1 font-weight-bold"
      >Edit Details</v-card-title>
      <v-container class="px-5">
        <v-row no-gutters>
          <v-col class="px-5" cols="12" sm="12" md="12">
            <div>
              <v-select
                v-model="strategyModel"
                offset-y="true"
                item-color="success"
                append-icon="mdi-chevron-down"
                class="py-2 body-2"
                :items="strategy"
                label="Select Strategy"
                :dark="lightSwitch == true"
                :menu-props="{offsetY: true, dark: lightSwitch == true}"
                light
                dense
              >
                <template slot="item" slot-scope="data">
                  <v-list-item-content
                    :dark="lightSwitch == true"
                    :style="{ background: cardbackground }"
                    style="padding: 12px 12px; margin: -16px;"
                  >
                    <v-list-item-title v-html="data.item" class="text-capitalize caption"></v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-select>
            </div>
            <div>
              <v-select
                v-model="tradeplanModel"
                offset-y="true"
                item-color="success"
                append-icon="mdi-chevron-down"
                class="py-2 body-2"
                :items="tradeplan"
                label="Select Trade Plan"
                :dark="lightSwitch == true"
                :menu-props="{offsetY: true, dark: lightSwitch == true}"
                light
                dense
              >
                <template slot="item" slot-scope="data">
                  <v-list-item-content
                    :dark="lightSwitch == true"
                    :style="{ background: cardbackground }"
                    style="padding: 12px 12px; margin: -16px;"
                  >
                    <v-list-item-title v-html="data.item" class="text-capitalize caption"></v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-select>
            </div>
            <div>
              <v-select
                v-model="emotionsModel"
                offset-y="true"
                item-color="success"
                class="py-2 body-2"
                append-icon="mdi-chevron-down"
                :items="emotions"
                label="Select Emotions"
                :dark="lightSwitch == true"
                :menu-props="{offsetY: true, dark: lightSwitch == true}"
                light
                dense
              >
                <template slot="item" slot-scope="data">
                  <v-list-item-content
                    :dark="lightSwitch == true"
                    :style="{ background: cardbackground }"
                    style="padding: 12px 12px; margin: -16px;"
                  >
                    <v-list-item-title v-html="data.item" class="text-capitalize caption"></v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-select>
            </div>
            <div>
              <v-textarea
                color="white"
                class="white--text trading_notes-textarea body-2 mt-3"
                :background-color="lightSwitch == 0 ? '#e3e9ed' : '#172431'"
                v-model="notesModel"
                placeholder="Trading Notes"
                filled
                :dark="lightSwitch == true"
              ></v-textarea>
            </div>
          </v-col>
        </v-row>
        <v-row no-gutters class="mt-5">
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            class="text-capitalize"
            depressed
            text
            :dark="lightSwitch == true"
            light
            @click.stop="show = false"
          >Cancel</v-btn>
          <v-btn
            color="success"
            class="text-capitalize ml-1 black--text"
            depressed
            light
            @click="editNow"
            @click.stop="show = false"
          >Save</v-btn>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["visible", "itemDetails"],
  data() {
    return {
      details: null,
      strategy: [
        "Bottom Picking",
        "Breakout Play",
        "Trend Following",
        "1-2-3 Reversal"
      ],
      strategyModel: null,
      tradeplan: ["Day Trade", "Swing Trade", "Investments"],
      tradeplanModel: null,
      emotions: ["Neutral", "Greedy", "Fearful"],
      emotionsModel: null,
      notesModel: "",
      fund: null,
      stockid: null
    };
  },
  computed: {
    ...mapGetters({
      renderEditKey: "journal/getRenderEditKey",
      lightSwitch: "global/getLightSwitch"
    }),
    /**
     * depend on current theme mode function that change card background
     *
     * @return  {string}  return string hexcode color
     */
    cardbackground() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    },
    show: {
      get() {
        if (this.visible) {
          this.details = this.itemDetails;
          this.strategyModel = this.itemDetails.strategy;
          this.tradeplanModel = this.itemDetails.tradeplan;
          this.emotionsModel = this.itemDetails.emotion;
          this.notesModel = this.itemDetails.notes;
          this.fund = this.itemDetails.fund;
          this.stockid = this.itemDetails.action;
        }
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      }
    }
  },
  methods: {
    ...mapActions({
      setRenderEditKey: "journal/setRenderEditKey"
    }),
    /**
     * editNow function, posting editted info
     *
     * @return  {[type]}  returns object data
     */
    editNow() {
      let confirmed = true;
      this.$emit("confirmedUpdate", confirmed);
      const fund_id = this.fund;
      const stock_id = this.stockid;
      const params = {
        strategy: this.strategyModel,
        plan: this.tradeplanModel,
        emotion: this.emotionsModel,
        notes: this.notesModel
      };
      this.$api.journal.portfolio
        .tradeedit(fund_id, stock_id, params)
        .then(response => {
          if (response.success) {
            this.keyCreateCounter = this.renderEditKey;
            this.keyCreateCounter++;
            this.setRenderEditKey(this.keyCreateCounter);
          }
        });
    }
  }
};
</script>