const _ = require("lodash");
const moment = require("moment");

const numbers = [3, 1, 5, 4, 8, 9, 3, 3, 7, 2, 1, 7, 3, 5, 6];

const sortedNumbers = _.sortBy(numbers);

const now = moment().format("YYYY-MM-DD");

console.log(now);

console.log(sortedNumbers);
