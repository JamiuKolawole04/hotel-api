import express from "express";
import { uploadImageHandler, deleteImageHandler } from "../controllers";

const router = express.Router();

router.post("/upload", uploadImageHandler);
router.post("/destroy", deleteImageHandler);

export default router;
