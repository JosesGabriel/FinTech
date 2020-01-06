<template>
  <v-container class="pt-6">
    <v-row>
      <v-col cols="12" class="text-center py-0">
        <v-btn x-large dark icon>
          <v-icon>mdi-stop</v-icon>
        </v-btn>
        <v-btn x-large dark icon>
          <v-icon>mdi-play</v-icon>
        </v-btn>
        <v-btn x-large dark icon @click="nextButton()">
          <v-icon>mdi-skip-next</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <BuyAndSell />
    </v-row>
  </v-container>
</template>
<style>
.numOfShares__textfield {
  transform: scale(0.7);
}
</style>
<script>
import { mapActions, mapGetters } from "vuex";
import BuyAndSell from "./BuyAndSell";
export default {
  components: {
    BuyAndSell
  },
  computed: {
    ...mapGetters({
      playerInGame: "game/getPlayerInGame",
      lightSwitch: "global/getLightSwitch"
    })
  },
  methods: {
    ...mapActions({
      setPlayerInGame: "game/setPlayerInGame"
    }),
    leaveGame() {
      this.setPlayerInGame(false);
    },
    nextButton() {
      var audio = new Audio("sounds/ping.wav");
      audio.play();
    }
  }
};
</script>
