export default {
  SET_PLAYERCURRENTLOBBY(state, data) {
    state.playerCurrentLobby = data;
  },
  SET_PLAYERINGAME(state, data) {
    state.playerInGame = data;
  },
  SET_PLAYERISHOST(state, data) {
    state.playerIsHost = data;
  },
  SET_PLAYERDATA(state, data) {
    state.playerData = data;
  },
  SET_PLAYERCURRENTCHATROOM(state, data) {
    state.playerCurrentChatRoom = data;
  },
  SET_PLAYERLOGGEDINVYNDUE(state, data) {
    state.playerLoggedInVyndue = data;
  }
};
