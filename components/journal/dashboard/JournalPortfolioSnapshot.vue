<template>
  <v-col ref="componentWrapper" class="pa-0" cols="4" sm="4" md="4">
    <!-- Don't remove ref value. Used for sharing -->
    <v-card-title class="text-left justify-left px-0 pb-2 pt-5">
      <h6 class="font-weight-regular subtitle-2" :style="{ color: fontColor }">
        PORTFOLIO SNAPSHOT
      </h6>
      <v-spacer></v-spacer>
      <v-btn icon small @click="showShareModal()" :dark="lightSwitch == 0 ? false : true">
        <v-icon>mdi-share-variant</v-icon>
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
        <v-card-title class="text-left justify-left py-2 px-3">
          <h6 class="font-weight-regular caption text-capitalize">
            Trading Result (PHP)
          </h6>
        </v-card-title>
        <v-simple-table
          id="liveportfolio-table"
          :dense="true"
          :style="{ color: fontColor }"
          :dark="lightSwitch == true"
        >
          <template v-slot:default>
            <tbody>
              <tr id="table_tr_snap-cont">
                <td class="item_position-prop px-3 py-1 caption">
                  Starting Capital
                </td>
                <td class="item_position-prop text-right px-3 py-1 caption">
                  {{ formatPrice(parseFloat(startingCapital)) }}
                </td>
              </tr>
              <tr id="table_tr_snap-cont">
                <td class="item_position-prop px-3 py-1 caption">
                  Year to Date P/L
                </td>
                <td class="item_position-prop text-right px-3 py-1 caption">
                  {{ formatPrice(parseFloat(yearTDPL)) }}
                </td>
              </tr>
              <tr id="table_tr_snap-cont">
                <td class="item_position-prop px-3 py-1 caption">
                  Portfolio YTD %
                </td>
                <td class="item_position-prop text-right px-3 py-1 caption">
                  {{ formatPrice(parseFloat(portfolioTDPL)) }}
                </td>
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
        <v-card-title class="text-left justify-left py-2 px-3">
          <h6 class="font-weight-regular caption text-capitalize">
            Funds Transfers (PHP)
          </h6>
        </v-card-title>
        <v-simple-table
          id="liveportfolio-table"
          :dense="true"
          :style="{ color: fontColor }"
          :dark="lightSwitch == true"
        >
          <template v-slot:default>
            <tbody>
              <tr id="table_tr_snap-cont">
                <td class="item_position-prop px-3 py-1 caption">Deposits</td>
                <td class="item_position-prop text-right px-3 py-1 caption">
                  {{ formatPrice(parseFloat(Deposits)) }}
                </td>
              </tr>
              <tr id="table_tr_snap-cont">
                <td class="item_position-prop px-3 py-1 caption">
                  Withdrawals
                </td>
                <td class="item_position-prop text-right px-3 py-1 caption">
                  {{ formatPrice(parseFloat(Withdrawals)) }}
                </td>
              </tr>
              <tr id="table_tr_snap-cont">
                <td class="item_position-prop px-3 py-1 caption">Equity</td>
                <td class="item_position-prop text-right px-3 py-1 caption">
                  {{ formatPrice(parseFloat(Equity)) }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-col>
    <share-modal
      v-if="showShareForm"
      :imageid="shareLink"
      @closeModal="showShareForm = false"
    />
  </v-col>
</template>
<script>
import shareModal from "~/components/modals/share";

import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    shareModal
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
  computed: {
    ...mapGetters({
      defaultPortfolioId: "journal/getDefaultPortfolioId",
      renderPortfolioKey: "journal/getRenderPortfolioKey",
      lightSwitch: "global/getLightSwitch"
    }),
    fontColor: function() {
      return this.lightSwitch == 0 ? "#494949" : "#e5e5e5";
    },
    cardbackground: function() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    },
    borderColor: function() {
      return this.lightSwitch == 0 ? "1px solid #b6b6b6" : "1px solid #535358";
    }
  },
  watch: {
    defaultPortfolioId: function() {
      this.getSnapshot();
    },
    renderPortfolioKey: function() {
      this.getSnapshot();
    },
    renderEditKey: function() {
      this.getSnapshot();
    }
  },
  mounted() {},
  methods: {
    async showShareModal() {
      const el = this.$refs.componentWrapper;
      const options = {
        type: "dataURL"
      };
      this.shareLink = await this.$html2canvas(el, options);
      this.showShareForm = true;
    },
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
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
