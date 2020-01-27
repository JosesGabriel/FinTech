/**
 * Buy fees taxation
 *
 * @param   {number}  buyResult  number that you are going to calculate
 *
 * @return  {number}             returns the calculated fees
 */
export function BuyFees(buyResult) {

    let dpartcommission = buyResult * 0.0025;
    let dcommission = dpartcommission > 20 ? dpartcommission : 20;
    // TAX
    let dtax = dcommission * 0.12;
    // Transfer Fee
    let dtransferfee = buyResult * 0.00005;
    // SCCP
    let dsccp = buyResult * 0.0001;
    let dall = dcommission + dtax + dtransferfee + dsccp;
    return buyResult + dall;
}
/**
 * Sell fees taxation
 *
 * @param   {number}  sellResult  number that you are going to calculate
 *
 * @return  {number}             returns the calculated fees
 */
export function SellFees(sellResult) {

    let dpartcommission = sellResult * 0.0025;
    let dcommission = dpartcommission > 20 ? dpartcommission : 20;
    // TAX
    let dtax = dcommission * 0.12;
    // Transfer Fee
    let dtransferfee = sellResult * 0.00005;
    // SCCP
    let dsccp = sellResult * 0.0001;
    let dsell = sellResult * 0.006;
    let dall = dcommission + dtax + dtransferfee + dsccp + dsell;
    return sellResult - dall;
}