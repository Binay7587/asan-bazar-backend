const multer = require('multer');
const path = require('path');
const fs = require('fs');

const makeDir = (dir = null) => {
    return (req, res, next) => {
        req.dir = dir;
        next();
    }
}

const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = req.dir ?? './public/uploads';

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${Math.random()}-${file.originalname}`);
    },
});

const imageFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
        return cb(null, true);
    }
    cb({ status: 400, msg: 'File upload only supports the following filetypes - ' + filetypes });
}

const upload = multer({
    storage: myStorage,
    fileFilter: imageFilter,
    limits: {
        fileSize: 1000000
    },
});

module.exports = {
    makeDir,
    upload
};