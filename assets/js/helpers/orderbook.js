/**
 * Calculates orderbook board lot based in given stock price
 *
 * @param   {Number}  stockPrice  
 *
 * @return  {Number}          
 */
export function CalculateBoardLot(stockPrice) {
  let boardLot;

  if (stockPrice >= 0.0001 && stockPrice <= 0.0099) {
    boardLot = 1000000;
  } else if (stockPrice >= 0.01 && stockPrice <= 0.049) {
    boardLot = 100000;
  } else if (stockPrice >= 0.05 && stockPrice <= 0.495) {
    boardLot = 10000;
  } else if (stockPrice >= 0.5 && stockPrice <= 4.99) {
    boardLot = 1000;
  } else if (stockPrice >= 5 && stockPrice <= 49.95) {
    boardLot = 100;
  } else if (stockPrice >= 50 && stockPrice <= 999.5) {
    boardLot = 10;
  } else if (stockPrice >= 1000) {
    boardLot = 5;
  } else {
      boardLot = -1; // invalid stock price
  }

  return boardLot;
}
