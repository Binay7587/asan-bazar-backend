const express = require('express');
const app = express.Router()
const authController = require("../app/controllers/auth.controllers");
const uploader = require("../app/middleware/uploader.middleware");
const authCheck = require("../app/middleware/auth.middleware");

app.post('/register', uploader.single('userImage'), authController.registerProcess);
app.post("/login", authController.loginProcess);
app.get("/me", authCheck, authController.loggedInProfile);
app.put("/change-password", authCheck, authController.changePasswordProcess);

module.exports = app;