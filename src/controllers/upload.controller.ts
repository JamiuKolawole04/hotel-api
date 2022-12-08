import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
const cloudinary = require("cloudinary");
import fs from "fs";

declare module "express" {
  interface Request {
    files?: any;
  }
}

interface Result {
  public_id: string;
  secure_url: string;
}

const removeTempFile = (path: any) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImageHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "No files were uploaded" });
    }

    const file = req.files.file;

    // if file size > 1mb
    if (file.size > 1024 * 1024) {
      removeTempFile(file.tempFilePath);
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Size too large" });
    }

    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      removeTempFile(file.tempFilePath);
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "File format is incorrect." });
    }

    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: "hotels" },
      async (err: any, result: Result) => {
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
      }
    );
  } catch (err) {
    next(err);
  }
};

export const deleteImageHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { public_id } = req.body;

    if (!public_id) res.status(400).json({ msg: "No images slected." });

    cloudinary.v2.uploader.destroy(public_id, async (err: any, result: any) => {
      if (err) next(err.message);

      res.json({ message: "Image deleted." });
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
