const fs = require("fs");

// fs.writeFile("example.txt", "Some text", (err) => {
//     if (err) {
//         console.log(err);
//     }
// });

// fs.readFile("example.txt", "utf-8", (err, data) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(data)
// })

// fs.unlink("example.txt", (err, data) => {
//     if (err) {
//         console.log(err);
//     }
// })

// File management with fs module
// const files = fs.readdirSync('./')
// console.log(files);

// const text = fs.readFileSync("./text.md", { encoding: "utf-8" });
// console.log(text)

// fs.writeFile("new_file.txt", "example text1", { flag: "a+" }, (err) => { // a+ is append
//     if (err) throw err
// })

// if(fs.existsSync('new_dir')) return

// fs.mkdir("new_dir", (err) => {
//     if (err) throw err
// })

// fs.renameSync('./new_file.txt', './new_file_rename.txt')
// fs.renameSync('./new_dir/new_file_rename.txt', './new_file.txt')
// fs.unlinkSync("new_file.txt")

// Dir operations
// fs.renameSync("./images", "./image_files")
// fs.renameSync("./new_dir", "./image_files/images_list")
fs.rmdir("./image_files/images_list", (err) => {
    if (err) throw err;
});
