import Vue from "vue";
// import require class
const numeral = require("numeral");

// To use filter: {{ value | limitString }}

// initialise the filter
/**
 * Limit string display
 * @param {String} value
 * @param {Integer} limit count of string to display per letter
 * @param {Boolean} ellipsis show ellipsis
 */
const limitString = (value, limit = 5, ellipsis = false) => {
  if (value == undefined || value.length == 0) {
    return;
  }

  if (value.length > limit) {
    const trimmed = value.slice(0, limit).trim();
    return `${trimmed}${ellipsis == true ? "..." : ""}`;
  }

  return value;
};
Vue.filter("limitString", limitString);

/**
 * Automated format how many decimals to display
 * @param {Float} value float amount with decimal points
 * @param {Boolean} value if false = 1000.00 converts to 1k and all > 999 amount
 */
const numeralDecimal = (value, strict = true) => {
  if (value == undefined || value <= 0) {
    return;
  }

  // count how many decimal places should display
  let format = "0,0.00";
  const count = String(value)
    .split(".")
    .pop().length;

  const amount = parseInt(value);
  if (amount > 999 && strict === false) {
    format = "0.000a";
  } else if (count >= 4 && amount == 0) {
    format = "0,0.0000";
  }
  return numeral(value).format(format);
};
Vue.filter("numeralDecimal", numeralDecimal);

// Register here to access like a regular function
// Ex: this.$globalFilters.numeralDecimal(value)

const globalFilters = {
  limitString,
  numeralDecimal
};

const globalFilter = {};

globalFilter.install = Vue => {
  Vue.prototype.$globalFilters = globalFilters;
};

Vue.use(globalFilter);
