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
  methods: {
    ...mapActions({
      setPlayerInGame: "game/setPlayerInGame"
    })
  }
};
</script>
