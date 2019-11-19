export default {
    async setSimulatorBuyPrice({ commit }, data) {
      await commit("SET_SIMULATORBUYPRICE", data);
    },
    async setSimulatorBoardLot({ commit }, data) {
      await commit("SET_SIMULATORBOARDLOT", data);
    },
    async setSimulatorPortfolioID({ commit }, data) {
      await commit("SET_SIMULATORPORTFOLIOID", data);
    },
    async setSimulatorPositions({ commit }, data) {
      await commit("SET_SIMULATORPOSITIONS", data);
    },
   /* async setSimulatorStockID({ commit }, data) {
      await commit("SET_SIMULATORSTOCKID", data);
    }*/
  };
  