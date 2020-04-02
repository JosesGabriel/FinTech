export default {
  selectedPost: state => {
    return state.selectedPost;
  },
  sse: state => {
    return state.sse;
  },
  sseInfo: state => {
    return state.sseInfo;
  },
  reactButtons: state => {
    return state.reactButtons;
  },
  getNewComment(state) {
    return state.newComment;
  },
  getDeleteComment(state) {
    return state.deleteComment;
  },
  getUpdateComment(state) {
    return state.updateComment;
  },
  confirmDialog(state) {
    return state.confirmDialog;
  },
  deleteDialog(state) {
    return state.deleteDialog;
  }
};
