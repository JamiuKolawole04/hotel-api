import express from "express";

import {
  createBrandHandler,
  getSingleBrandHandler,
  getAllBrandsHandler,
  updateBrandHandler,
  deleteBrandHandler,
} from "../controllers";
import { validate } from "../middleware/validation";
import { createBrandSchema } from "../schemas/brand.schema";

const router = express.Router();

router.post("/", validate(createBrandSchema), createBrandHandler);
router
  .route("/")
  .post(validate(createBrandSchema), createBrandHandler)
  .get(getAllBrandsHandler);

router
  .route("/:id")
  .get(getSingleBrandHandler)
  .patch(updateBrandHandler)
  .delete(deleteBrandHandler);

export default router;
