export default {
    async setSimulatorBuyPrice({ commit }, data) {
      await commit("SET_SIMULATORBUYPRICE", data);
    },
    async setSimulatorBoardLot({ commit }, data) {
      await commit("SET_SIMULATORBOARDLOT", data);
    }
  };
  