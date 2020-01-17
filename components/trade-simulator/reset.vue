<template>
  <v-dialog
    v-model="show"
    max-width="450px"
    :dark="lightSwitch == true"
    :style="{ background: cardbackground }"
  >
    <v-card dark="lightSwitch == true" :style="{ background: cardbackground }">
      <v-card-title class="text-center justify-center px-5 pt-10">
        <h1 class="font-weight-regular body-1">
          This action is final and cannot be undone.
          <br />Give me
          <span style="color:#00FFC3;">HELL YEAH</span> to confirm.
        </h1>
      </v-card-title>
      <v-card color="transparent" class="d-flex justify-center" elevation="0"></v-card>
      <v-container class="pb-0">
        <v-row>
          <v-col class="px-8 pb-0" cols="12" sm="12" md="12">
            <v-text-field
              label="Solo"
              placeholder="HELL YEAH"
              solo
              :dark="lightSwitch == true"
              :style="{ background: cardbackground }"
              class="align-center justify-center headline font-weight-regular text-center white--text confirmation_message-reset"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-col class="pa-0 pt-3" cols="12" sm="12" md="12">
        <v-row no-gutters>
          <v-col class="pa-0" cols="5" sm="5" md="5" @click.stop="show=false">
            <v-card-title class="text-center justify-center px-5 py-3 confirmation_button-reset-ok">
              <h1 class="font-weight-regular body-1" style="color:#00080E;">I THINK NOT</h1>
            </v-card-title>
          </v-col>
          <v-col class="pa-0" cols="7" sm="7" md="7" @click.stop="show=false">
            <v-card-title
              class="text-center justify-center px-5 py-3 confirmation_button-reset-not"
            >
              <h1
                class="font-weight-regular body-1"
                @click="resetLive"
                style="color:#00FFC3;"
              >I UNDERSTAND, DO IT</h1>
            </v-card-title>
          </v-col>
        </v-row>
      </v-col>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["visible"],
  computed: {
    ...mapGetters({
      simulatorPortfolioID: "tradesimulator/getSimulatorPortfolioID",
      simulatorConfirmedBuySell: "tradesimulator/getSimulatorConfirmedBuySell",
      lightSwitch: "global/getLightSwitch"
    }),
    cardbackground: function() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    },
    show: {
      get() {
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
      setSimulatorPortfolioID: "tradesimulator/setSimulatorPortfolioID",
      setSimulatorOpenPosition: "tradesimulator/setSimulatorOpenPosition"
    }),
    resetLive() {
       this.$api.journal.portfolio.reset(this.simulatorPortfolioID).then(response => {
          if (response.success) {
            this.setSimulatorOpenPosition("");
          }
        });
    }
  }
};
</script>
<style>
.confirmation_message-reset input {
  text-align: center;
  letter-spacing: 2px;
  text-transform: uppercase;
}
.confirmation_button-reset-ok {
  background: #00ffc3;
}
.confirmation_button-reset-not {
  background: #00080e;
}
.confirmation_button-reset-ok:hover {
  background: #00ffc3;
  cursor: pointer;
}
.confirmation_button-reset-not:hover {
  background: #00ffc3;
  cursor: pointer;
}
.confirmation_button-reset-ok:hover h1,
.confirmation_button-reset-not:hover h1 {
  color: #00080e !important;
}
</style>
