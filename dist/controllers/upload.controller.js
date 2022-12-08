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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImageHandler = exports.uploadImageHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const cloudinary = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
const removeTempFile = (path) => {
    fs_1.default.unlink(path, (err) => {
        if (err)
            throw err;
    });
};
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadImageHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ msg: "No files were uploaded" });
        }
        const file = req.files.file;
        // if file size > 1mb
        if (file.size > 1024 * 1024) {
            removeTempFile(file.tempFilePath);
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ msg: "Size too large" });
        }
        if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
            removeTempFile(file.tempFilePath);
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ msg: "File format is incorrect." });
        }
        cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "hotels" }, (err, result) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                removeTempFile(file.tempFilePath);
                throw next(err);
            }
            res.status(200).json({
                success: true,
                status: "success",
                public_id: result.public_id,
                url: result.secure_url,
            });
        }));
    }
    catch (err) {
        next(err);
    }
});
exports.uploadImageHandler = uploadImageHandler;
const deleteImageHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.deleteImageHandler = deleteImageHandler;
