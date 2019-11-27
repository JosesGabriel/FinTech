export default {
  SET_PLAYERINLOBBY(state, data) {
    state.playerInLobby = data;
  },
  SET_PLAYERINGAME(state, data) {
    state.playerInGame = data;
  },
  SET_PLAYERISHOST(state, data) {
    state.playerIsHost = data;
  },
  SET_PLAYERRANKING(state, data) {
    state.playerRanking = data;
  },
  SET_PLAYERCOINS(state, data) {
    state.playerCoins = data;
  },
  SET_PLAYERID(state, data) {
    state.playerID = data;
  }
};
