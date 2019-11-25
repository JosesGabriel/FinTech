export default {
    SET_SIMULATOROPENPOSITION(state, data) {
      state.simulatorOpenPosition = data;
    },
    SET_SIMULATORBUYPRICE(state, data) {
      state.simulatorBuyPrice = data;
    },
    SET_SIMULATORBOARDLOT(state, data) {
      state.simulatorBoardLot = data;
    },
    SET_SIMULATORPORTFOLIOID(state, data) {
      state.simulatorPortfolioID = data;
    },
    SET_SIMULATORPOSITIONS(state, data) {
      state.simulatorPositions = data;
    },
    SET_SIMULATORCONFIRMEDBUYSELL(state, data) {
      state.simulatorConfirmedBuySell = data;
    }
  };