const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const { PORT, MONGODB_URI, NODE_ENV, ORIGIN } = require("./src/config");
const { API_ENDPOINT_NOT_FOUND_ERR, SERVER_ERR } = require("./src/errors");

// routes
const authRoutes = require("./src/routes/auth.route");
const interestRoutes = require("./src/routes/interest.route");
const utilRoutes = require("./src/routes/util.route");

// init express app
const app = express();

// middlewares

app.use(express.json());
app.use(
    cors({
        credentials: true,
        origin: ORIGIN,
        optionsSuccessStatus: 200,
    })
);

// log in development environment

if (NODE_ENV === "development") {
    const morgan = require("morgan");
    app.use(morgan("dev"));
}

// index route

app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "server is up and running",
    });
});

// routes middlewares

app.use("/api/auth", authRoutes);
app.use("/api/interest", interestRoutes);
app.use("/api/utils", utilRoutes);

// page not found error handling  middleware

app.use("*", (req, res, next) => {
    const error = {
        status: 404,
        message: API_ENDPOINT_NOT_FOUND_ERR,
    };
    next(error);
});

// global error handling middleware
app.use((err, req, res, next) => {
    console.log(err);
    const status = err.status || 500;
    const message = err.message || SERVER_ERR;
    const data = err.data || null;
    res.status(status).json({
        status: "fail",
        message,
        data,
    });
});

async function main() {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("database connected");

        app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

main();
