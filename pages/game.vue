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
  background: #1de9b6;
  border-radius: 20px;
}
.gameGlobal ::-webkit-scrollbar-thumb:hover {
  background: #1de9b6;
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
      setPlayerRanking: "game/setPlayerRanking",
      setPlayerCoins: "game/setPlayerCoins",
      setPlayerID: "game/setPlayerID"
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
      return this.$axios
        .$get(process.env.DEV_API_URL + "/game/players/")
        .then(response => {
          if (response.success) {
            this.setPlayerRanking(response.data.player.ranking);
            this.setPlayerCoins(response.data.player.coins);
            this.setPlayerID(response.data.player.user_id);
            return true;
          }
        })
        .catch(e => {
          return false;
        });
    },
    hasOnGoing() {
      return this.$axios
        .$get(process.env.DEV_API_URL + "/game/series/ongoing")
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
      return this.$axios
        .$post(process.env.DEV_API_URL + "/game/players/")
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
