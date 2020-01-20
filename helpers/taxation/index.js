/**
 * Buy fees taxation return the calculated fees
 *
 * @param   {number}  buyResult  number that you are going to calculate
 *
 * @return  {number}             returns the calculated fees
 */
export function Fees(buyResult) {

    let dpartcommission = buyResult * 0.0025;
    let dcommission = dpartcommission > 20 ? dpartcommission : 20;
    // TAX
    let dtax = dcommission * 0.12;
    // Transfer Fee
    let dtransferfee = buyResult * 0.00005;
    let dsell = buyResult * 0.006;
    // SCCP
    let dsccp = buyResult * 0.0001;
    let dall = dcommission + dtax + dtransferfee + dsccp + dsell;
    return buyResult - dall;

}