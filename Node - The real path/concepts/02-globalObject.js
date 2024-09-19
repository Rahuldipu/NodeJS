// console.log("text");
// global.console.log("text");
// process.stdout.write("Hi \n");

// process.stdin.on("data", (data) => {
//     console.log(data.toString().trim());
//     process.exit();
// })

const readLine = require("readline");

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("whats your name", (answer) => {
    console.log(answer)
    process.exit()
});
