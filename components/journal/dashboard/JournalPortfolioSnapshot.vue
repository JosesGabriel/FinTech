<template>
  <v-col ref="componentWrapper" class="pa-0" cols="4" sm="4" md="4">
    <!-- Don't remove ref value. Used for sharing -->
    <v-card-title class="text-left justify-left px-0 pb-2 pt-5">
      <span
        class="font-weight-bold subtitle-2"
        :style="{ color: this.lightSwitch == 0 ? 'black' : 'white' }"
      >PORTFOLIO SNAPSHOT</span>
      <v-spacer></v-spacer>
      <v-btn icon small @click="showShareModal()" :dark="lightSwitch == 0 ? false : true">
        <v-icon small color="tertiary">mdi-share-variant</v-icon>
      </v-btn>
    </v-card-title>
    <v-col class="pa-0">
      <v-card
        :color="cardbackground"
        elevation="0"
        :dark="lightSwitch == true"
        class="pb-2"
        :style="{ border: borderColor }"
      >
        <v-card-title class="py-2 px-3">
          <span class="font-weight-bold caption">Trading Result (PHP)</span>
        </v-card-title>
        <v-simple-table
          id="liveportfolio-table"
          :dense="true"
          :style="{ color: fontColor }"
          :dark="lightSwitch == true"
        >
          <template v-slot:default>
            <tbody>
              <tr
                id="table_tr_snap-cont"
                :class="lightSwitch == 1 ? 'tertiary--text' : 'black--text'"
              >
                <td class="item_position-prop px-3 py-1 caption">Starting Capital</td>
                <td
                  class="item_position-prop text-right px-3 py-1 caption"
                >{{ startingCapital | numeral("0,0.00") }}</td>
              </tr>
              <tr
                id="table_tr_snap-cont"
                :class="lightSwitch == 1 ? 'tertiary--text' : 'black--text'"
              >
                <td class="item_position-prop px-3 py-1 caption">Year to Date P/L</td>
                <td
                  class="item_position-prop text-right px-3 py-1 caption"
                >{{ yearTDPL | numeral("0,0.00") }}</td>
              </tr>
              <tr
                id="table_tr_snap-cont"
                :class="lightSwitch == 1 ? 'tertiary--text' : 'black--text'"
              >
                <td class="item_position-prop px-3 py-1 caption">Portfolio YTD %</td>
                <td
                  class="item_position-prop text-right px-3 py-1 caption"
                >{{ portfolioTDPL | numeral("0,0.00") }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
      <v-card
        :color="cardbackground"
        elevation="0"
        :dark="lightSwitch == true"
        class="mt-3 pb-2"
        :style="{ border: borderColor }"
      >
        <v-card-title class="py-2 px-3">
          <span class="font-weight-bold caption">Funds Transfers (PHP)</span>
        </v-card-title>
        <v-simple-table
          id="liveportfolio-table"
          :dense="true"
          :style="{ color: fontColor }"
          :dark="lightSwitch == true"
        >
          <template v-slot:default>
            <tbody>
              <tr
                id="table_tr_snap-cont"
                :class="lightSwitch == 1 ? 'tertiary--text' : 'black--text'"
              >
                <td class="item_position-prop px-3 py-1 caption">Deposits</td>
                <td
                  class="item_position-prop text-right px-3 py-1 caption"
                >{{ Deposits | numeral("0,0.00") }}</td>
              </tr>
              <tr
                id="table_tr_snap-cont"
                :class="lightSwitch == 1 ? 'tertiary--text' : 'black--text'"
              >
                <td class="item_position-prop px-3 py-1 caption">Withdrawals</td>
                <td
                  class="item_position-prop text-right px-3 py-1 caption"
                >{{ Withdrawals | numeral("0,0.00") }}</td>
              </tr>
              <tr
                id="table_tr_snap-cont"
                :class="lightSwitch == 1 ? 'tertiary--text' : 'black--text'"
              >
                <td class="item_position-prop px-3 py-1 caption">Equity</td>
                <td
                  class="item_position-prop text-right px-3 py-1 caption"
                >{{ Equity | numeral("0,0.00") }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-col>
    <share-modal v-if="showShareForm" :imageid="shareLink" @closeModal="showShareForm = false" />
  </v-col>
</template>
<script>
import shareModal from "~/components/modals/Share";

import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    shareModal
  },
  computed: {
    ...mapGetters({
      defaultPortfolioId: "journal/getDefaultPortfolioId",
      renderPortfolioKey: "journal/getRenderPortfolioKey",
      lightSwitch: "global/getLightSwitch"
    }),
    /**
     * returns secondary font color
     *
     * @return  {string}  returns string
     */
    fontColor() {
      return this.lightSwitch == 0 ? "#494949" : "#e5e5e5";
    },
    /**
     * returns background color
     *
     * @return  {string}  returns string
     */
    cardbackground() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    },
    /**
     * returns border value
     *
     * @return  {string}  returns string
     */
    borderColor() {
      return this.lightSwitch == 0 ? "1px solid #dadada" : "1px solid #172431";
    }
  },
  data() {
    return {
      shareLink: "",
      showShareForm: false,
      showScheduleForm: false,
      startingCapital: 0,
      yearTDPL: 0,
      portfolioTDPL: 0,
      Deposits: 0,
      Withdrawals: 0,
      Equity: 0
    };
  },
  watch: {
    /**
     * Watch defaultPortfolioId vuex if id changed perform function inside
     *
     * @return  {string}  getting the current portfolio id
     */
    defaultPortfolioId() {
      this.getSnapshot();
    },
    /**
     * Watch renderPortfolioKey vuex if key changed perform function inside
     *
     * @return  {number}  get increment key
     */
    renderPortfolioKey() {
      this.getSnapshot();
    },
    /**
     * if trade edit or remove succed renderEditKey will increment
     *
     * @return  {number}  increment key
     */
    renderEditKey() {
      this.getSnapshot();
    }
  },
  methods: {
    /**
     * Capture components then draw to canvas and share
     *
     * @return  {image}  get captured components as canvas
     */
    async showShareModal() {
      const el = this.$refs.componentWrapper;
      const options = {
        type: "dataURL"
      };
      this.shareLink = await this.$html2canvas(el, options);
      this.showShareForm = true;
    },
    /**
     * getSnapshot will work on ploting/updating table
     *
     * @return  {array}  data to update chart
     */
    getSnapshot() {
      if (this.defaultPortfolioId != null) {
        const snapshotparams = {
          fund: this.defaultPortfolioId
        };
        this.$api.journal.portfolio.snapshot(snapshotparams).then(response => {
          let snapshot = response.data.snapshot;
          this.startingCapital = snapshot.capital;
          this.yearTDPL = snapshot.PL;
          this.portfolioTDPL = snapshot.PL_percentage;
          this.Deposits = snapshot.deposits;
          this.Withdrawals = snapshot.withdraw;
        });
      }
      this.componentKeys++;
    }
  }
};
</script>
<style scoped>
.theme--dark.v-data-table thead tr:last-child th,
.theme--dark.v-data-table
  tbody
  tr:not(:last-child)
  td:not(.v-data-table__mobile-row) {
  border: none;
}
</style>
