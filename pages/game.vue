<template>
  <div>
    <GameLobby v-if="!playerInGame" class="gameLobby" />
    <GameView v-if="playerInGame" />
  </div>
</template>
<style>
.leaderBoards__column {
  position: relative;
  bottom: 60px;
}
/* Custom Scrollbar */
.gameLobby ::-webkit-scrollbar {
  width: 5px;
}
.gameLobby ::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}
.gameLobby ::-webkit-scrollbar-thumb {
  background: #1de9b6;
  border-radius: 20px;
}
.gameLobby ::-webkit-scrollbar-thumb:hover {
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
  methods: {
    ...mapActions({
      setPlayerInGame: "game/setPlayerInGame"
    })
  }
};
</script>
