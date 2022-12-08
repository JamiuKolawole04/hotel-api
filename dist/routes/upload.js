"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
require("dotenv").config();
const router = require("express").Router();
const cloudinary = require("cloudinary");
const fs = require("fs");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
// remove temp file function
const removeTempFile = (path) => {
    fs.unlink(path, (err) => {
        if (err)
            throw err;
    });
};
// Uploading image on cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// uploaad image only admin
router.post("/upload", auth, authAdmin, (req, res, next) => {
    try {
        // console.log(req.files);
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ msg: "No files were uploaded" });
        }
        const file = req.files.file;
        // if file size > 1mb
        if (file.size > 1024 * 1024) {
            removeTempFile(file.tempFilePath);
            return res.status(400).jsonp({ msg: "Size too large" });
        }
        if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
            removeTempFile(file.tempFilePath);
            return res.status(400).jsonp({ msg: "File format is incorrect." });
        }
        cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "test" }, (err, result) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                removeTempFile(file.tempFilePath);
                throw next(err);
            }
            res
                .status(200)
                .json({ public_id: result.public_id, url: result.secure_url });
        }));
    }
    catch (err) {
        res.status(500).json({ msg: err.message });
    }
});
// delete image
router.post("/destroy", (req, res, next) => {
    try {
        const { public_id } = req.body;
        if (!public_id)
            res.status(400).json({ msg: "No images slected." });
        cloudinary.v2.uploader.destroy(public_id, (err, result) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                next(err.message);
            res.json({ msg: "Image deleted." });
        }));
    }
    catch (err) {
        res.status(500).json({ msg: err.message });
    }
});
module.exports = router;
