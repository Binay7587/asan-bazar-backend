const fs = require('fs');
const bcrypt = require('bcryptjs');
const { SALT_ROUNDS } = require('./constants');

const functionList = {

    // delete image
    deleteImage: (path, name) => {
        let fullpath = path + name;
        if (fs.existsSync(fullpath)) {
            return fs.unlinkSync(fullpath)
        } else {
            return null;
        }
    },

    deleteImages: (path, images) => {
        if (images.length > 0) {
            images.map((item) => {
                let fullpath = path + item;
                if (fs.existsSync(fullpath)) {
                    return fs.unlinkSync(fullpath)
                } else {
                    return null;
                }
            })
        }
    },

    hashPassword: async (password) => {
        return await bcrypt.hash(password, SALT_ROUNDS);
    },
}

module.exports = functionList;