const express = require('express');
const app = express.Router()
const authController = require("../app/controllers/auth.controllers");


app.post('/register', authController.registerProcess);
app.post("/login", authController.loginProcess)

module.exports = app;