const fs = require('fs');

const functionList = {

    // delete image
    deleteImage: async (path, name) => {
        let fullpath = path + name;
        if (fs.existsSync(fullpath)) {
            return fs.unlinkSync(fullpath)
        } else {
            return null;
        }
    }
}

module.exports = functionList;