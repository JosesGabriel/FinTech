/**
 * Calculate the Greatest Common Divisor of two numbers
 *
 * @param   {Number}  a  first number
 * @param   {Number}  b  second number
 *
 * @return  {Number}     result
 */
export function CalculateGCD(a, b) {
  return b == 0 ? a : CalculateGCD(b, a % b);
}
