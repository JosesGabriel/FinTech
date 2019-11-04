export default {
  getTicker(state) {
    return state.ticker;
  },
  getTable(state) {
    return state.table;
  },
  getTableMaximize(state) {
    return state.tableMaximize;
  },
  getTableFullscreen(state) {
    return state.tableFullscreen;
  },

  getSidebar(state) {
    return state.sidebar;
  }
};
