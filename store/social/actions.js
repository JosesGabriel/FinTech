export default {
  async setSSE({ commit }, data) {
    await commit("SET_SSE", data);
  },
  async setSSEInfo({ commit }, data) {
    await commit("SET_SSE_INFO", data);
  },
  async setNewComment({ commit }, data) {
    await commit("SET_NEWCOMMENT", data);
  },
  async setDeleteComment({ commit }, data) {
    await commit("SET_DELETECOMMENT", data);
  },
  async setUpdateComment({ commit }, data) {
    await commit("SET_UPDATECOMMENT", data);
  },
  async setConfirmDialog({ commit }, data) {
    await commit("SET_CONFIRMDIALOG", data);
  }
};
