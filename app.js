const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
const routes = require("./routes")
const logger = require("./app/middleware/logger.middleware");
const { MulterError } = require("multer");
// Database connection
const db = require("./config/db.config");

// parse application/json
app.use(express.json())
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// route mount
app.use("/api/v1", logger, routes);

// handle 404
app.use((req, res, next) => {
    next({ status: 404, msg: "Resource not found" });
})

//error handling middleware 
app.use((error, req, res, next) => {
    let status = error.status ?? 400;
    let msg = error.msg.message ? error.msg.message : error.msg ?? "Something went wrong";
    if (error instanceof MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
            msg = "File size is too large. Max limit is 1MB";
        }
    } else if (error.code === "ENOENT") {
        msg = "No such file or directory";
    }
    res.status(status).json({
        result: null,
        msg: msg,
        status: false,
        meta: null
    })
})

app.listen(process.env.SERVER_PORT, '127.0.0.1', (err) => {
    if (err) {
        console.log(`Error listening to port ${process.env.SERVER_PORT}}`)
    } else {
        console.log(`Server is listening to port ${process.env.SERVER_PORT}`)
        console.log("Press CTRL+C to disconnect Server...")
    }
})