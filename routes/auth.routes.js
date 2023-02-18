const express = require('express');
const app = express.Router()
const authController = require("../app/controllers/auth.controllers");
const uploader = require("../app/middleware/uploader.middleware");

app.post('/register', uploader.single('user_image'), authController.registerProcess);
app.post("/login", authController.loginProcess)

module.exports = app;