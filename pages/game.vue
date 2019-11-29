<template>
  <div>
    <GameLobby v-if="!playerInGame" class="gameGlobal" />
    <GameView v-if="playerInGame" class="gameGlobal" />
  </div>
</template>
<style>
.leaderBoards__column {
  /* position: relative;
  bottom: 60px; */
}
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
<script>
import GameLobby from "~/components/game/GameLobby";
import GameView from "~/components/game/GameView";
import { mapActions, mapGetters } from "vuex";

export default {
  layout: "game",
  components: {
    GameLobby,
    GameView
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      playerInGame: "game/getPlayerInGame"
    })
  },
  beforeMount: function() {
    this.checkPlayerAccount();
  },
  methods: {
    ...mapActions({
      setPlayerInGame: "game/setPlayerInGame",
      setPlayerData: "game/setPlayerData"
    }),
    async checkPlayerAccount() {
      let token = localStorage["auth._token.local"];
      this.$axios.setToken(token);
      let playerHasAccount, playerHasOngoing, newlyRegistered;

      playerHasAccount = this.loginGameAcc();
      playerHasOngoing = this.hasOnGoing();

      if ((await playerHasAccount) == false) {
        newlyRegistered = this.registerGameAcc();
        console.log("Newly Registered: [" + (await newlyRegistered) + "]");
        playerHasAccount = this.loginGameAcc();
      }

      console.log("Player has account: [" + (await playerHasAccount) + "]");
      console.log("Player is in Game: [" + (await playerHasOngoing) + "]");
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
        .$create()
        .then(response => {
          return true;
        })
        .catch(e => {
          return false;
        });
    }
  }
};
</script>
