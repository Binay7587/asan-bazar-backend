const express = require('express');
const app = express.Router()
const authController = require("../app/controllers/auth.controllers");
const uploader = require("../app/middleware/uploader.middleware");
const authCheck = require("../app/middleware/auth.middleware");

app.post('/register', uploader.single('user_image'), authController.registerProcess);
app.post("/login", authController.loginProcess)
app.get("/me", authCheck, authController.loggedInProfile)

module.exports = app;