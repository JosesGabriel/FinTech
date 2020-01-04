<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <LogoLoader v-if="isLoading" :status-text="statusText" />
      <div v-else>
        <GameView v-if="playerHasOngoingGame" class="gameGlobal" />
        <GameLobby v-else class="gameGlobal" />
      </div>
    </v-row>
  </v-container>
</template>
<script>
require("dotenv").config();
import { myToken } from "~/assets/client.js";
import GameLobby from "~/components/game/GameLobby";
import GameView from "~/components/game/GameView";
import LogoLoader from "~/components/LogoLoader";
import { mapActions, mapGetters } from "vuex";

export default {
  layout: "game",
  components: {
    GameLobby,
    GameView,
    LogoLoader
  },
  data() {
    return {
      isLoading: true,
      playerHasOngoingGame: false,
      statusText: ""
    };
  },
  computed: {
    ...mapGetters({
      playerData: "game/getPlayerData",
      playerCurrentChatRoom: "game/getPlayerCurrentChatRoom"
    })
  },
  beforeMount() {
    this.runChecks();
  },
  methods: {
    ...mapActions({
      setPlayerData: "game/setPlayerData",
      setPlayerCurrentChatRoom: "game/setPlayerCurrentChatRoom"
    }),
    async runChecks() {
      this.loginGameAcc()
        .catch(this.registerGameAcc)
        .then(this.hasOnGoing)
        .finally(() => {
          this.isLoading = false;
        });

      if ((await myToken) != "") {
        console.log("Player is logged in Vyndue: [true] ");
      } else {
        console.log("Player is logged in Vyndue: [false]");
      }
    },
    loginGameAcc() {
      this.statusText = "Checking User Account...";
      return this.$api.game.login.index().then(response => {
        if (response.success) {
          this.setPlayerData(response.data.player);
        }
      });
    },
    hasOnGoing() {
      this.statusText = "Checking Game Data...";
      return this.$api.game.ongoing.index().then(response => {
        if (response.success) {
          this.playerHasOngoingGame = true;
        }
      });
    },
    registerGameAcc() {
      this.statusText = "Creating User Account...";
      return this.$api.game.login
        .create()
        .then(response => {
          this.setPlayerData(response.data.player);
        })
        .catch(e => {
          this.statusText =
            "An error has occurred while creating Game Account...";
        });
    },
    checkCurrentRoom() {
      let currentChatRoom = localStorage.getItem("currentChatRoom");
      this.setPlayerCurrentChatRoom(currentChatRoom);
      return currentChatRoom;
    }
  }
};
</script>
<style>
/* Custom Scrollbar */
.gameGlobal ::-webkit-scrollbar {
  width: 5px;
}
.gameGlobal ::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 10px;
}
.gameGlobal ::-webkit-scrollbar-thumb {
  background: #03dac5;
  border-radius: 20px;
}
.gameGlobal ::-webkit-scrollbar-thumb:hover {
  background: #03dac5;
}
</style>
