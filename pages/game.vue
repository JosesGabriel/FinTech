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
    // this.$axios
    //   .$get("https://dev-game-api.arbitrage.ph" + "/api/series/", params)
    //   .then(response => {
    //     this.watchListObject = response.data.watchlist;
    //     this.setUserWatchedStocks(response.data.watchlist);
    //     this.loadingBar = false;
    //   });
  },
  methods: {
    ...mapActions({
      setPlayerInGame: "game/setPlayerInGame"
    }),
    checkPlayerAccount() {
      let playerHasAccount;
      const params = {
        user_id: this.$auth.loggedIn ? this.$auth.user.data.user.uuid : "000"
      };
      this.$axios
        .$get(process.env.DEV_API_URL + "/api/game/players/", params)
        .then(response => {
          if (response.success) {
            playerHasAccount = true;
            console.log(playerHasAccount);
          }
        })
        .catch(e => {
          playerHasAccount = false;
          console.log(playerHasAccount);
        });

      // if (!this.$auth.loggedIn) {
      // } else {
      //   // const params = {
      //   //   user_id: this.$auth.loggedIn ? this.$auth.user.data.user.uuid : "000"
      //   // };
      //   // this.$axios
      //   //   .$get(process.env.DEV_API_URL + "/api/game/players/", params)
      //   //   .then(response => {
      //   //     this.watchListObject = response.data.watchlist;
      //   //     this.setUserWatchedStocks(response.data.watchlist);
      //   //     this.loadingBar = false;
      //   //   });
      // }
    }
  }
};
</script>
