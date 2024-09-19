const http = require("http");

const server = http.createServer();

const products = [{ name: "Banana" }, { name: "Apple" }, { name: "Orange" }];

server.on("request", (req, res) => {
    if (req.url == "/") {
        res.setHeader("Content-Type", "text/html")
        res.end(
            `
                <form action="/products" method="POST">
                    <input type="text" name="productName" />
                    <button type="submit">POST</button>
                </form>
            `
        )
    } else if (req.url == "/products") {
        if (req.method == "POST") {
            res.end("Post request handled");
        } else if (req.method == "GET") {
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(JSON.stringify(products));
        } else {
            res.setHeader("Content-Type", "text/plain");
            res.statusCode = 405;
            res.end(`Method not allowed`);
        }
    } else {
        res.setHeader("Content-Type", "text/plain");
        res.statusCode = 404;
        res.end(`Page not found`);
    }
});

server.listen(3000, () => {
    console.log(`Server is up and running on port 3000`);
});
