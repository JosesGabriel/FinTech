export default {
  async setLoginModalState({ commit }, data) {
    await commit("SET_LOGINMODALSTATE", data);
  }
};
