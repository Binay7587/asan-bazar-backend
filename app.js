const express = require("express");
const app = express();

const routes = require("./routes")
const logger = require("./app/middleware/logger.middleware");
const { MulterError } = require("multer");

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
    let status = error.status || 400;
    let msg = error.msg || "Something went wrong";
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

app.listen(3005, 'localhost', (err) => {
    if (err) {
        console.log("Error listening to port 3005")
    } else {
        console.log("Server is running on port 3005")
        console.log("Press CTRL+C to disconnect Server...")
    }
})