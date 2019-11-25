export default {
    async setSimulatorOpenPosition({ commit }, data) {
      await commit("SET_SIMULATOROPENPOSITION", data);
    },
    async setSimulatorPortfolioID({ commit }, data) {
      await commit("SET_SIMULATORPORTFOLIOID", data);
    },
    async setSimulatorPositions({ commit }, data) {
      await commit("SET_SIMULATORPOSITIONS", data);
    },
    async setSimulatorConfirmedBuySell({ commit }, data) {
      await commit("SET_SIMULATORCONFIRMEDBUYSELL", data);
    },
    async setSimulatorBuyPrice({ commit }, data) {
      await commit("SET_SIMULATORBUYPRICE", data);
    },
    async setSimulatorBoardLot({ commit }, data) {
      await commit("SET_SIMULATORBOARDLOT", data);
    }
    
  };
  