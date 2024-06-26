require("dotenv").config();

const express = require("express");

const app = express();

const router = express.Router();

app.listen(3001);

const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { uploadFile } = require("./controller");

aws.config.update({
    secretAccessKey: process.env.ACCESS_SECRET,
    accessKeyId: process.env.ACCESS_KEY,
    region: process.env.REGION,
});
const BUCKET = process.env.BUCKET;
const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: BUCKET,
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname);
        },
    }),
});

router.post("/upload", upload.single("file"), uploadFile);

app.use("/", router);

app.get("/list", async (req, res) => {
    let r = await s3.listObjectsV2({ Bucket: BUCKET }).promise();
    let x = r.Contents.map((item) => item.Key);
    res.send(x);
});

app.get("/download/:filename", async (req, res) => {
    const filename = req.params.filename;
    let x = await s3.getObject({ Bucket: BUCKET, Key: filename }).promise();
    res.send(x.Body);
});

app.delete("/delete/:filename", async (req, res) => {
    const filename = req.params.filename;
    await s3.deleteObject({ Bucket: BUCKET, Key: filename }).promise();
    res.send("File Deleted Successfully");
});
