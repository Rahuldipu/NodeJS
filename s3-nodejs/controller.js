async function uploadFile(req, res, next) {
    res.send("Successfully uploaded " + req.file.location + " location!");
}

module.exports = {uploadFile}