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
  SET_PLAYERDATA(state, data) {
    state.playerData = data;
  }
};
