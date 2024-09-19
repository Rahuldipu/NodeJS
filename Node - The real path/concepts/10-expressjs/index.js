const express = require("express");

const app = express();

app.use("/add-product", (req, res, next) => {
    console.log("first middleware");
    res.send("<h1>Response from add-product</h1>");
});

app.use((req, res, next) => {
    console.log("second middleware");
    res.send("<h1>Response from second middleware</h1>");
});

app.listen(3000, () => {
    console.log(`Server is listening on port 3000`);
});
