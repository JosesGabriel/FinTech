export default {
  getPlayerInLobby(state) {
    return state.playerInLobby;
  },
  getPlayerInGame(state) {
    return state.playerInGame;
  },
  getPlayerIsHost(state) {
    return state.playerIsHost;
  },
  getPlayerData(state) {
    return state.playerData;
  },
  getPlayerCurrentChatRoom(state) {
    return state.playerCurrentChatRoom;
  }
};
