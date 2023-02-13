const express = require("express");
const app = express();

const routes = require("./routes")
const logger = require("./app/middleware/logger.middleware");

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
    res.status(error.status).json({
        result: null,
        msg: error.msg,
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