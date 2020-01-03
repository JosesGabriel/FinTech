<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <LogoLoader v-if="isLoading" />
      <div v-else>
        <!-- <GameLobby class="gameGlobal" /> -->
        <GameView class="gameGlobal" />
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
      isLoading: true
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
      let playerHasAccount, playerHasOngoing, newlyRegistered, currentChatRoom;

      playerHasAccount = this.loginGameAcc();
      playerHasOngoing = this.hasOnGoing();
      currentChatRoom = this.checkCurrentRoom();
      if ((await playerHasAccount) == false) {
        newlyRegistered = this.registerGameAcc();
        console.log("Newly Registered: [" + (await newlyRegistered) + "]");
        playerHasAccount = this.loginGameAcc();
      }

      if ((await myToken) != "") {
        console.log("Player is logged in Vyndue: [true] ");
      } else {
        console.log("Player is logged in Vyndue: [false]");
      }
      console.log(
        "Player has Game account: [" + (await playerHasAccount) + "]"
      );
      console.log("Player is in Game: [" + (await playerHasOngoing) + "]");
      console.log("Player current Vyndue Room is: [" + currentChatRoom + "]");
      this.isLoading = false;
    },
    loginGameAcc() {
      return this.$api.game.login
        .index()
        .then(response => {
          if (response.success) {
            this.setPlayerData(response.data.player);
            return true;
          }
        })
        .catch(e => {
          return false;
        });
    },
    hasOnGoing() {
      return this.$api.game.ongoing
        .index()
        .then(response => {
          if (response.success) {
            return true;
          }
        })
        .catch(e => {
          return false;
        });
    },
    registerGameAcc() {
      return this.$api.game.login
        .create()
        .then(response => {
          return true;
        })
        .catch(e => {
          return false;
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
