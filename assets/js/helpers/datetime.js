import moment from "moment";

/**
 * Add hours, minutes, seconds to date time string.
 *
 * @param   {Date}  inputDateTime  input date time
 * @param   {Number}  added         number to be added
 * @param   {String}  unit           unit of added
 * @param   {String}  format         desired format
 *
 * @return  {String}                 returns formatted string
 */
export function AddTime(inputDateTime, added, unit, format = 'YYYY-MM-DD HH:mm:ss') {
    let time = moment.utc(inputDateTime)

    switch (unit) {
        case 'm':
            time = time.subtract(added, 'minutes')
            break;
        case 'h':
            time = time.subtract(added, 'hours')
            break;
        case 's':
            time = time.subtract(added, 'seconds')
            break;
        default:
            return null // cannot parse
    }

    return time.format(format)
}

/**
 * Get time difference of current date and posts date, format it
 * to AddTime function
 *
 * @param   {Date}  inputDateTime  posts date
 * @param   {String}  format       returns string default date format
 *
 * @return  {Date}                 returns posts date, date difference, time unit
 */
export function AddDynamicTime(inputDateTime, format = 'YYYY-MM-DD HH:mm:ss') {
    let newDate = new Date() //current date
    let md = moment.utc(newDate).format(format) //2020-01-24 HH:mm:ss

    let nd = moment.utc(md) //moment {_isAMomentObject: true, _i: "2020-01-24 07:26:54", _f: "YYYY-MM-DD HH:mm:ss"}

    let fdf = nd.diff(inputDateTime, 'years', 'days', 'hours', 'minutes', 'seconds') // get the difference of current date and posts date

    return AddTime(inputDateTime, fdf, 's') //returns functio(posts_date, difference_date, unit_time)
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
export function LocalFormat(inputDateTime, format = "YYYY-MM-DD HH:mm:ss") {
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
function formatter(datetime, format) {
    switch (format) {
        case 'fn':
            datetime = datetime.fromNow() // result will be '31 minutes ago'
            break;
        case 'fs':
            datetime = datetime.format('MMMM DD, YYYY') // result will be 'February 12, 2020'
            break;
        case 'unix':
            datetime = datetime.unix() // result will be 'February 12, 2020'
            break;
        default:
            datetime = datetime.format(format) // result will be desired format
    }

    return datetime
}