export default {
  SET_SSE(state, data) {
    state.sse = data;
  },
  SET_SSE_INFO(state, data) {
    state.sseInfo = data;
  },
  SET_NEWCOMMENT(state, data) {
    state.newComment = data;
  },
  SET_DELETECOMMENT(state, data) {
    state.deleteComment = data;
  },
  SET_UPDATECOMMENT(state, data) {
    state.updateComment = data;
  }
};
