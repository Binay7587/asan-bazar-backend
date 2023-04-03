const fs = require('fs');
const bcrypt = require('bcryptjs');
const { SALT_ROUNDS } = require('./constants');

const functionList = {

    // delete image
    deleteImage: async (path, name) => {
        let fullpath = path + name;
        if (fs.existsSync(fullpath)) {
            return fs.unlinkSync(fullpath)
        } else {
            return null;
        }
    },

    hashPassword: async (password) => {
        return await bcrypt.hash(password, SALT_ROUNDS);
    },
}

module.exports = functionList;