export default {
  async setPlayerCurrentLobby({ commit }, data) {
    await commit("SET_PLAYERCURRENTLOBBY", data);
  },
  async setPlayerInGame({ commit }, data) {
    await commit("SET_PLAYERINGAME", data);
  },
  async setPlayerIsHost({ commit }, data) {
    await commit("SET_PLAYERISHOST", data);
  },
  async setPlayerData({ commit }, data) {
    await commit("SET_PLAYERDATA", data);
  },
  async setPlayerCurrentChatRoom({ commit }, data) {
    await commit("SET_PLAYERCURRENTCHATROOM", data);
  },
  async setPlayerLoggedInVyndue({ commit }, data) {
    await commit("SET_PLAYERLOGGEDINVYNDUE", data);
  }
};
