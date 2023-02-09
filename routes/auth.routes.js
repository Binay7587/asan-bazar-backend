const express = require('express');
const app = express();

app.post('/register', (req, res, next) => {
    res.json({
        result: null, 
        status: true, 
        msg: "User Registered",
        meta: null
    })
});

app.post("/login", (req, res, next) => {
    res.json({
        result: {
            detail: {},
            token: "auth token"
        },
        status: true, 
        msg: "You are logged in",
        meta: null
    })
})

module.exports = app;