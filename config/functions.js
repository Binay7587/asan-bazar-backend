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

    randomString: (len = 100) => {
        let result = '';
        const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charLength = char.length;
        for (let i = 0; i < len; i++) {
            result += char.charAt(Math.floor(Math.random() * charLength));
        }
        return result;
    }
}

module.exports = functionList;