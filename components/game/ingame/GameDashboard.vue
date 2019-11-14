<template>
  <v-container class="py-0">
    <v-row class="pl-3">
      <v-col class="pa-0" cols="5">
        <v-container class="pa-0">
          <v-row>
            <v-col cols="12">
              <v-container class="pa-0">
                <span class="heading font-weight-bold text-uppercase"
                  >Stock Information</span
                >
                <v-row>
                  <v-col cols="5">
                    <div class="gameStats__wrapper">
                      <span>Last</span>
                      <span>4.17</span>
                    </div>
                    <div class="gameStats__wrapper">
                      <span>Last</span>
                      <span>4.17</span>
                    </div>
                    <div class="gameStats__wrapper">
                      <span>Last</span>
                      <span>4.17</span>
                    </div>
                  </v-col>
                  <v-col cols="1"></v-col>
                  <v-col cols="5">
                    <div class="gameStats__wrapper">
                      <span>Last</span>
                      <span>4.17</span>
                    </div>
                    <div class="gameStats__wrapper">
                      <span>Last</span>
                      <span>4.17</span>
                    </div>
                    <div class="gameStats__wrapper">
                      <span>Last</span>
                      <span>4.17</span>
                    </div>
                  </v-col>
                  <v-col cols="1"></v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col class="pa-0" cols="2">
        <v-container class="pa-0">
          <v-row>
            <v-col cols="12">
              <v-container class="pa-0">
                <span class="heading font-weight-bold text-uppercase"
                  >This Trade</span
                >
                <v-row>
                  <v-col cols="12">
                    <div class="gameStats__wrapper">
                      <span>Last</span>
                      <span>4.17</span>
                    </div>
                    <div class="gameStats__wrapper">
                      <span>Last</span>
                      <span>4.17</span>
                    </div>
                    <div class="gameStats__wrapper">
                      <span>Last</span>
                      <span>4.17</span>
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col cols="1"></v-col>
      <v-col class="pa-0" cols="3">
        <GameController />
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
.gameStats__wrapper {
  display: flex;
  justify-content: space-between;
}
.thisTrade {
  border-right: 1px solid black;
}
</style>
<script>
import GameController from "~/components/game/ingame/GameController";
export default {
  layout: "game",
  components: {
    GameController
  }
};
</script>
