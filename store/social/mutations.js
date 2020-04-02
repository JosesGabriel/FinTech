export default {
  SET_SELECTEDPOST(state, data) {
    state.selectedPost = data;
  },
  SET_SSE(state, data) {
    state.sse = data;
  },
  SET_SSE_INFO(state, data) {
    state.sseInfo = data;
  },
  SET_REACTBUTTONS(state, data) {
    state.reactButtons = data;
  },
  SET_NEWCOMMENT(state, data) {
    state.newComment = data;
  },
  SET_DELETECOMMENT(state, data) {
    state.deleteComment = data;
  },
  SET_UPDATECOMMENT(state, data) {
    state.updateComment = data;
  },
  SET_CONFIRMDIALOG(state, data) {
    state.confirmDialog = data;
  },
  SET_DELETEDIALOG(state, data) {
    state.deleteDialog = data;
  }
};
