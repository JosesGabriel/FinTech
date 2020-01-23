import moment from "moment";

/**
 * Add hours, minutes, seconds to date time.
 *
 * @param   {Date}  inputDateTime  input date time
 * @param   {Number}  addend         number to be added
 * @param   {String}  unit           unit of addend
 * @param   {String}  format         desired format
 *
 * @return  {String}                 formatted added date time 
 */
export function Add(inputDateTime, addend, unit, format='LL'){
    let time = moment.utc(inputDateTime).local()
    
    switch (unit) {
        case 'm':
            time = time.add(addend, 'minutes')
            break;
        case 'h':
            time = time.add(addend, 'hours')
            break;
        case 's':
            time = time.add(addend, 'seconds')
            break;
        default:
            return null // cannot parse
            break;
    }

    return formatter(time, format)
}

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

    return formatter(time, format)
}

/**
 * Returns formatted time.
 *
 * @param   {Date}  datetime  datetime variable
 * @param   {String}  format    desired format
 *
 * @return  {String}            formatted string
 */
function formatter(datetime, format){
    switch (format) {
        case 'fn':
            datetime = datetime.fromNow() // result will be '31 minutes ago'
            break;
        default:
            datetime = datetime.format(format) // result will be desired format
    }

    return datetime
}