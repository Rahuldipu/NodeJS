const path = require("path");
const util = require("util")

console.log(__filename)
console.log(path.basename(__filename))
console.log(__dirname)
console.log(path.join(__dirname, "./path/file"))

console.log(util.log(path.basename(__filename)))
