export default {
  async setLoginModalState({ commit }, data) {
    await commit("SET_LOGINMODALSTATE", data);
  },
  async setEmail({ commit }, data) {
    await commit("SET_EMAIL", data);
  }
};
