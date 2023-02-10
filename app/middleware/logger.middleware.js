const logger = (req, res, next) => {
    console.log("I am first call");
    let date = (new Date()).toLocaleDateString()
    let ip = req.socket.remoteAddress;
    // 2023-02-08 08:00:00T5+45 => 8/2/2023
    console.log("Loogger: ------ "+date+" -------- "+ip)
    // call next scope
    next();
}


module.exports = logger;