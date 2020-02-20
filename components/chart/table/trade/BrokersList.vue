<template>
  <v-content>
    <v-card
      class="card__container d-flex justify-space-around my-4 px-12"
      :color="lightSwitch == 0 ? 'lightchart' : 'darkchart'"
      flat
      :dark="lightSwitch == 1"
    >
      <v-card
        v-for="item in brokerItems"
        :key="item.id"
        class="card__trades pa-0"
        outlined
        tile
        flat
        :style="[
          item.show
            ? { background: tileBackground }
            : { background: cardBackground }
        ]"
        :class="[{ hide__card: item.show == false }]"
        @click="showModal(item)"
      >
        <v-card-text>
          <v-tooltip bottom :color="tooltipBackground">
            <template v-slot:activator="{ on }">
              <v-img
                :alt="item.title"
                :class="[{ fix_image: item.modal == false }]"
                class="img__trades"
                :src="item.img ? `/icon/chart/trades/${item.img}` : ''"
                v-on="on"
              ></v-img>
            </template>
            <span
              class="tooltip__brokers"
              :class="[
                { darkmode__text: lightSwitch == 1 },
                { lightmode__text: lightSwitch == 0 }
              ]"
              >{{ item.title }}</span
            >
          </v-tooltip>
        </v-card-text>
      </v-card>
    </v-card>
  </v-content>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "BrokerList",
  props: ["brokerItems"],
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch",
      tradeLogin: "chart/tradeLogin",
      showBrokers: "chart/showBrokers"
    }),
    /**
     * Toggle between dark/light
     *
     * @return
     */
    tileBackground: function() {
      return this.lightSwitch == 1 ? "#172431" : "rgb(182,182,182,.2)";
    },
    /**
     * Toggle between dark/light
     *
     * @return
     */
    cardBackground: function() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    },
    /**
     * Toogle between dark/light
     *
     * @return
     */
    tooltipBackground: function() {
      return this.lightSwitch == 0 ? "lightcard" : "darkcard";
    }
  },
  methods: {
    ...mapActions({
      setTradeLogin: "chart/setTradeLogin",
      setTradeBroker: "chart/setTradeBroker",
      setShowBrokers: "chart/setShowBrokers"
    }),
    /**
     * show modal once trigger
     *
     * @param   {Object}  item  broker info
     *
     * @return
     */
    showModal: function(item) {
      // if paper trade, no need to show login
      if (item.modal == false) {
        this.setShowBrokers(false);
        return;
      }
      this.setTradeBroker(item);
      this.setTradeLogin(!this.tradeLogin);
    }
  }
};
</script>

<style scoped>
.hide__card {
  border: none !important;
  cursor: not-allowed !important;
  pointer-events: none;
}
.card__trades {
  cursor: pointer;
  border-radius: 10px !important;
}
.img__trades {
  margin-left: auto;
  margin-right: auto;
  width: 30px;
  height: 30px;
}
.fix_image {
  height: 27px;
}
.tooltip__brokers {
  font-size: 11px !important;
  font-family: "Nunito Sans", sans-serif !important;
}
</style>
