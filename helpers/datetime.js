import moment from "moment";

/**
 * functions for optional date formatter, it works globally
 * 
 * default date format is .format('LL') result will be June 9 2014
 * available date format .fromNow() result will be '31 minutes ago'
 * 
 * other date format please go to: https://devhints.io/moment
 * 
 * Usage: LocalFormat(date_here, 'fn')
 * fn -> variable method
 *
 * @param   {string}  inputDateTime  datetime
 * @param   {string}  format         datetime format style, for other format go to: https://devhints.io/moment
 *
 * @return  {string}                 returns date formatted
 */
export function LocalFormat(inputDateTime, format = "LL") {
    let time = moment.utc(inputDateTime).local()
    switch (format) {
        case 'fn':
            time = time.fromNow()
            break;
            // result will be '31 minutes ago'
        default:
            time = time.format(format)
                // result will be 'June 9 2014'
    }
    return time
}