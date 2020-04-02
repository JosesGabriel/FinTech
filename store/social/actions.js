export default {
  async setSelectedPost({ commit }, data) {
    await commit("SET_SELECTEDPOST", data);
  },
  async setSSE({ commit }, data) {
    await commit("SET_SSE", data);
  },
  async setSSEInfo({ commit }, data) {
    await commit("SET_SSE_INFO", data);
  },
  async setReactButtons({ commit }, data) {
    await commit("SET_REACTBUTTONS", data);
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
  },
  async setDeleteDialog({ commit }, data) {
    await commit("SET_DELETEDIALOG", data);
  }
};
