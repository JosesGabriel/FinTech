export default {
  async setPlayerInLobby({ commit }, data) {
    await commit("SET_PLAYERINLOBBY", data);
  },
  async setPlayerIsHost({ commit }, data) {
    await commit("SET_PLAYERISHOST", data);
  }
};
