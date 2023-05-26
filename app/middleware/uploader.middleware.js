const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadPath = path.join(process.cwd(), 'public/uploads/images');

const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const imagePath = `${uploadPath}/${file.fieldname}`;
        
        if (!fs.existsSync(imagePath)) {
            fs.mkdirSync(imagePath, { recursive: true });
        }

        cb(null, imagePath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${Math.random()}-${file.originalname}`);
    },
});

const imageFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    if (mimetype && extname) {
        return cb(null, true);
    }
    cb({
        status: 400,
        msg: "File upload only supports the following filetypes - " + filetypes,
    });
};

const uploader = multer({
    storage: myStorage,
    fileFilter: imageFilter,
    limits: {
        fileSize: 1000000,
    },
});

module.exports = uploader;
