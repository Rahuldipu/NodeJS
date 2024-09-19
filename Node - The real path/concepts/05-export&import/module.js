const path = require("path");

const getFileText = () => {
    return path.extname(path.basename(__filename));
};

// module.exports = getFileText // Default Export
module.exports = {
    fileExt: getFileText,
}; // named export
