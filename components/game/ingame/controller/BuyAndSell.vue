<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-btn
        small
        dense
        outlined
        color="success"
        class="mr-6"
        @click.stop="openBuySellModal('Buy')"
        >Buy</v-btn
      >
      <v-btn
        small
        dense
        outlined
        color="success"
        @click.stop="openBuySellModal('Sell')"
        >Sell</v-btn
      >
    </v-row>
    <v-dialog v-model="buySellModal" width="300">
      <v-card :dark="lightSwitch == 0 ? false : true" transparent>
        <v-card-title>
          <span class="subtitle-1 font-weight-light" style="color: #03dac5">
            <strong>{{ modalTypeText }}</strong>
          </span>
        </v-card-title>
        <v-card-text>
          <v-container class="pt-0">
            <v-row>
              <v-col cols="12 pb-0">
                <span class="subtitle-1">Portfolio Size</span>
              </v-col>
              <v-col cols="12 pt-0">
                <v-radio-group column dark>
                  <v-radio label="100% of Buying Power" value="100"></v-radio>
                  <v-radio label="50% of Buying Power" value="50"></v-radio>
                  <v-radio label="25% of Buying Power" value="25"></v-radio>
                  <v-radio label="10% of Buying Power" value="10"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12 py-0">
                <span class="subtitle-1">Custom size</span>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="No. of shares"
                  dense
                  dark
                  type="number"
                ></v-text-field>
                <v-text-field
                  label="Portfolio %"
                  dense
                  dark
                  type="number"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed color="transparent" @click="buySellModal = false">
            Close
          </v-btn>
          <v-btn color="#03dac5" light depressed @click="addWatch()">
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      buySellModal: false,
      modalTypeText: ""
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    })
  },
  methods: {
    openBuySellModal(type) {
      this.modalTypeText = type;
      this.buySellModal = true;
    }
  }
};
</script>
