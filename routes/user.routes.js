const express = require('express');
const app = express();

app.get('/user', (req, res, next) => {
    // user list
    let users = [
        {
            _id: 1,
            name: "Sandesh Bhattarai",
            email: "sandesh.bhattarai@broadwayinfosys.com",
            role: "admin"
        }
    ];
    res.json({
        result: users,
        status: true,
        msg: "User Fetched",
        meta: {
            totalCount: 1,
            perPage: 10,
            currentPage: 1
        }
    })
})

app.post('/user/create', (req, res, next) => {
    // insert data entry
})

app.put('/user/:id', (req, res, next) => {
    // update user
    res.json({
        result: req.params.id,
        status: true,
        msg: "Id fetched",
        meta: null
    })
})

app.delete('/user/:id', (req, res, next) => {
    // delete user
})

module.exports = app;