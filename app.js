const express = require("express");
const app = express();

// Create two routes, /user, /user/create
// in routes/user.routes.js 
// mount that route file to app.js of root directory and test
const routes = require("./routes/auth.routes");
const user_routes = require('./routes/user.routes');

// Inventory Management System 

const logger = (req, res, next) => {
    console.log("I am first call");
    let date = (new Date()).toLocaleDateString()
    let ip = req.socket.remoteAddress;
    // 2023-02-08 08:00:00T5+45 => 8/2/2023
    console.log("Loogger: ------ "+date+" -------- "+ip)
    // call next scope
    next();
}

// route mount
app.use(logger, routes);
app.use(user_routes);

// handle 404
app.use((req,res) => {
    res.status(404).json({
        result: "Not found",
        status: false, 
        msg: "Not found",
        meta: null
    })
})

app.listen(3005, 'localhost', (err) => {
    if(err) {
        console.log("Error listening to port 3005")
    } else {
        console.log("Server is running on port 3005")
        console.log("Press CTRL+C to disconnect Server...")
    }
})