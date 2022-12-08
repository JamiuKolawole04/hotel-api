"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hotel_controller_1 = require("../controllers/hotel.controller");
const validation_1 = require("../middleware/validation");
const hotel_schema_1 = require("../schemas/hotel.schema");
const router = express_1.default.Router();
router.post("/", (0, validation_1.validate)(hotel_schema_1.createHotelSchema), hotel_controller_1.createHotelHandler);
router.get("/", hotel_controller_1.getAllHotelsHandler);
router
    .route("/:id")
    .get(hotel_controller_1.getSingleHotelHandler)
    .patch(hotel_controller_1.UpdateHotelHandler)
    .delete(hotel_controller_1.deleteHotelHandler);
exports.default = router;
