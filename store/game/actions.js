export default {
  async setPlayerInLobby({ commit }, data) {
    await commit("SET_PLAYERINLOBBY", data);
  },
  async setPlayerInGame({ commit }, data) {
    await commit("SET_PLAYERINGAME", data);
  },
  async setPlayerIsHost({ commit }, data) {
    await commit("SET_PLAYERISHOST", data);
  },
  async setPlayerRanking({ commit }, data) {
    await commit("SET_PLAYERRANKING", data);
  },
  async setPlayerCoins({ commit }, data) {
    await commit("SET_PLAYERCOINS", data);
  },
  async setPlayerID({ commit }, data) {
    await commit("SET_PLAYERID", data);
  }
};
