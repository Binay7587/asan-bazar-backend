const express = require('express');
const app = express.Router()
const authController = require("../app/controllers/auth.controllers");

const multer = require('multer');
const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${Math.random()}-${file.originalname}`);
    },
});
const uploader = multer({
    storage: myStorage,
    dest: './public/uploads/',
    limits: {
        fileSize: 1000000
    },
});

app.post('/register', uploader.single('image'), authController.registerProcess);
app.post("/login", authController.loginProcess)

module.exports = app;