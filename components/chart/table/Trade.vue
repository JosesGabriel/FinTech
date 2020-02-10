<template>
  <v-content>
    <!-- select broker -->
    <v-content v-show="showBrokers" class="mx-12 text-center">
      <span
        class="subtitle-1 font-weight-bold"
        :class="[
          { darkmode__text: lightSwitch == 1 },
          { lightmode__text: lightSwitch == 0 }
        ]"
        >Start Trading</span
      >
      <br />
      <span class="caption grey--text">Connect to your broker's account</span>

      <BrokersList :broker-items="itemsTop" />

      <BrokersList :broker-items="itemsBottom" />

      <!-- Login -->
      <Login />
    </v-content>

    <!-- trade view -->
    <v-content
      v-show="!showBrokers"
      class="pt-2"
      :class="[
        { darkmode__text: lightSwitch == 1 },
        { lightmode__text: lightSwitch == 0 }
      ]"
    >
      <TradeView />
    </v-content>
  </v-content>
</template>

<script>
import { mapGetters } from "vuex";

import Login from "@/components/chart/table/trade/Login.vue";
import TradeView from "@/components/chart/table/trade/TradeView.vue";
import BrokersList from "@/components/chart/table/trade/BrokersList.vue";

export default {
  name: "Trade",
  components: {
    Login,
    TradeView,
    BrokersList
  },
  data() {
    return {
      itemsTop: [
        {
          id: 1,
          title: "Paper Trade",
          img: "paper_trade.svg",
          show: true,
          modal: false
        },
        {
          id: 3,
          title: "Col Financial",
          img: "col_financial.svg",
          show: true,
          modal: true
        },
        {
          id: 4,
          title: "AAA Equities",
          img: "aaa_equities.svg",
          show: true,
          modal: true
        },
        {
          id: 6,
          title: "My Trade",
          img: "mytrade.svg",
          show: true,
          modal: true
        }
      ],
      itemsBottom: [
        {
          id: 7,
          title: "Papa Securities",
          img: "papa_securities.svg",
          show: true
        },
        { id: 2, title: "AB Capital", img: "ab_capital.svg", show: true },
        {
          id: 5,
          title: "HDI Securities",
          img: "hdi_securities.svg",
          show: true
        },
        { id: 8, title: "", img: "", show: false }
      ]
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch",
      showBrokers: "chart/showBrokers"
    })
  }
};
</script>
<style>
.select__trade .v-text-field.v-text-field--solo .v-input__control {
  min-height: 30px;
}
.select__trade .v-text-field--filled > .v-input__control > .v-input__slot {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}
.select__trade .v-label {
  font-size: 14px;
  /* font-weight: 600; */
}
.select__trade .v-select__selection--comma {
  /* color: black; */
  font-size: 14px;
  /* font-weight: 600;*/
}
/*.select__trade .v-select__slot .v-label,
.select__trade .v-select__slot .v-icon {
  color: black !important;
}*/
.select__trade .v-input__slot {
  margin: 0;
}
.select__trade .v-input__control {
  min-height: auto !important;
  border-radius: unset;
}

.v-text-field.v-text-field--enclosed .v-text-field__details {
  margin-bottom: -7px;
}
</style>
