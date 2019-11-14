export default {
  async setPlayerInLobby({ commit }, data) {
    await commit("SET_PLAYERINLOBBY", data);
  },
  async setPlayerInGame({ commit }, data) {
    await commit("SET_PLAYERINGAME", data);
  },
  async setPlayerIsHost({ commit }, data) {
    await commit("SET_PLAYERISHOST", data);
  }
};
