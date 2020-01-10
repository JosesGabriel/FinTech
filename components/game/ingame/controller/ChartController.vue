<template>
  <v-container class="pt-6">
    <v-row>
      <v-col cols="12" class="text-center py-0">
        <v-btn x-large :dark="lightSwitch" icon>
          <v-icon>mdi-stop</v-icon>
        </v-btn>
        <v-btn x-large :dark="lightSwitch" icon>
          <v-icon>mdi-play</v-icon>
        </v-btn>
        <v-btn x-large :dark="lightSwitch" icon @click="nextButton()">
          <v-icon>mdi-skip-next</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
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
