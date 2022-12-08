import express from "express";

import {
  createHotelHandler,
  getSingleHotelHandler,
  UpdateHotelHandler,
  deleteHotelHandler,
  getAllHotelsHandler,
} from "../controllers/hotel.controller";
import { validate } from "../middleware/validation";
import { createHotelSchema } from "../schemas/hotel.schema";

const router = express.Router();

router.post("/", validate(createHotelSchema), createHotelHandler);
router.get("/", getAllHotelsHandler);
router
  .route("/:id")
  .get(getSingleHotelHandler)
  .patch(UpdateHotelHandler)
  .delete(deleteHotelHandler);

export default router;
