<template>
  <v-card
    transparent
    flat
    :dark="lightSwitch == 0 ? false : true"
    color="transparent"
  >
    <v-container class="py-0 pr-0 gameDashboard__wrapper">
      <v-row class="pl-3">
        <v-col class="pa-0" cols="5">
          <v-container class="pa-0">
            <v-row>
              <v-col cols="12 pb-0">
                <v-container class="pa-0">
                  <span class="heading font-weight-bold text-uppercase"
                    >Stock Information</span
                  >
                  <v-row>
                    <v-col cols="5">
                      <div class="gameStats__wrapper">
                        <span>Last</span>
                        <span>34.17</span>
                      </div>
                      <div class="gameStats__wrapper">
                        <span>High</span>
                        <span>44.17</span>
                      </div>
                      <div class="gameStats__wrapper">
                        <span>Low</span>
                        <span>44.17</span>
                      </div>
                    </v-col>
                    <!-- <v-col cols="1"></v-col> -->
                    <v-col cols="6 pr-6">
                      <div class="gameStats__wrapper">
                        <span>Change</span>
                        <span>22.12</span>
                      </div>
                      <div class="gameStats__wrapper">
                        <span>Open</span>
                        <span>4.17</span>
                      </div>
                      <div class="gameStats__wrapper">
                        <span>Volume</span>
                        <span>4.17</span>
                      </div>
                    </v-col>
                    <!-- <v-col cols="1"></v-col> -->
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <!-- <v-col cols="1"><v-divider dark vertical/></v-col> -->
        <v-col class="pa-0" cols="4">
          <v-container class="pa-0">
            <v-row>
              <v-col cols="12 pb-0 thisTrade__wrapper">
                <v-container class="pa-0 pl-5">
                  <span class="heading font-weight-bold text-uppercase"
                    >This Trade</span
                  >
                  <v-row>
                    <v-col cols="12">
                      <div class="gameStats__wrapper">
                        <span>No. Of Shares</span>
                        <span>400</span>
                      </div>
                      <div class="gameStats__wrapper">
                        <span>Ave. Price</span>
                        <span>216.50</span>
                      </div>
                      <div class="gameStats__wrapper">
                        <span>P/L Unrealized (%)</span>
                        <span>22.23%</span>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <!-- <v-col cols="1"></v-col> -->
        <v-col class="pa-0 controller__wrapper" cols="3">
          <Controller />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<style>
.gameStats__wrapper {
  display: flex;
  justify-content: space-between;
  padding-top: 5px;
}
.thisTrade {
  border-right: 1px solid black;
}
.controller__wrapper {
  border-left: 2px solid #0c1a2b;
}
.gameDashboard__wrapper {
  border-top: 2px solid #0c1a2b;
}
.thisTrade__wrapper {
  border-left: 2px solid #0c1a2b;
}
</style>
<script>
import { mapGetters } from "vuex";
import Controller from "~/components/game/ingame/controller/Controller";
export default {
  layout: "game",
  components: {
    Controller
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    })
  }
};
</script>
