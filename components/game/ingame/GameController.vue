<template>
  <v-container class="pa-0">
    <v-row>
      <v-col cols="12" class="text-center py-0">
        <v-btn x-large dark icon>
          <v-icon>mdi-stop</v-icon>
        </v-btn>
        <v-btn x-large dark icon>
          <v-icon>mdi-play</v-icon>
        </v-btn>
        <v-btn x-large @click="nextButton()" dark icon>
          <v-icon>mdi-skip-next</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12 py-0">
        <v-text-field
          class="numOfShares__textfield"
          color="success"
          hide-details
          outlined
          dark
          placeholder="No. of shares"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="caption py-0 ">
        <span class="px-6">Total Cost:</span>
        <span>Portfolio%:</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="buySell__btn--wrapper">
        <v-btn
          small
          dense
          outlined
          color="success"
          class="mr-6"
          @click="leaveGame()"
          >Buy</v-btn
        >
        <v-btn small dense outlined color="success">Sell</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
.numOfShares__textfield {
  transform: scale(0.7);
}
.buySell__btn--wrapper {
  display: flex;
  justify-content: center;
}
</style>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      playerInGame: "game/getPlayerInGame"
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
